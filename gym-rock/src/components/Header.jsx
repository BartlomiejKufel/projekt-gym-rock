import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import ReminderBlock from "../components/ReminderBlock"
import { useState, useEffect } from "react";

const Header = ({ title, setMainNavbarVisible, userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === "/settings";
  const [showNotifications, setShowNotifications] = useState(false);
  const [reminders, setReminder] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  const fetchRegisteredEvents = () => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/users/${userId}/registered-events`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((event) => {
            const startParts = event.start_date.split(' ');
            const endParts = event.end_date.split(' ');
            const startHour = startParts[1] ? parseInt(startParts[1].split(':')[0], 10) : 10;
            const endHour = endParts[1] ? parseInt(endParts[1].split(':')[0], 10) : 11;

            const dateObj = new Date(event.start_date.replace(' ', 'T'));
            const formattedDate = dateObj.toLocaleDateString("pl-PL", {
              weekday: "short",
              day: "numeric",
              month: "long"
            });

            return {
              event_id: event.event_id,
              date: formattedDate,
              start: startHour,
              end: endHour,
              title: event.name,
              instructor: `${event.instructor.name} ${event.instructor.surname}`
            };
          });
          setReminder(mapped);
        }
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
      });
  };

  const fetchNotifications = () => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/notifications/active`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((notification) => {
            return {
              title: notification.name,
              description: notification.description,
            };
          });
          setNotifications(mapped);
        }
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  };

  useEffect(() => {
    fetchRegisteredEvents();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchRegisteredEvents();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const illegalLocations = ["/settings", "/purchase-history", "/profile-edit", "/contact"];

    if (illegalLocations.includes(location.pathname)) {
      setMainNavbarVisible(false);
    }
    else {
      setMainNavbarVisible(true);
    }
  }, [location.pathname]);


  return (
    <div className="top-banner-container">
      <img
        src="/img/main-wall.jpg"
        alt="Main Wall"
        className="top-banner-img"
      />

      <div className="top-banner-actions">
        <button className="header-icon-btn" onClick={() => setShowNotifications(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#4a4d52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        {isSettings ? (
          <button className="header-icon-btn" onClick={() => navigate("/home")}>
            <img src="/icons/home-gray.svg" alt="Home" style={{ width: "22px", height: "22px" }} />
          </button>
        ) : (
          <button className="header-icon-btn" onClick={() => navigate("/settings")} >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#4a4d52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        )}
      </div>


      <div className="top-banner-title d-flex justify-content-between align-items-center">
        <span>{!isSettings && title}</span>
        {location.pathname === "/instructors" && currentUser?.role_id === 3 && (
          <button className="add-event-btn" onClick={() => navigate("/instructors/add")}>
            Dodaj wydarzenie
          </button>
        )}
      </div>

      {showNotifications && (
        <div className="notifications-overlay">
          <div className="notifications-backdrop" onClick={() => setShowNotifications(false)}></div>
          <div className="notifications-panel pb-4">
            <div className="d-flex justify-content-between align-items-center mb-4 px-4 pt-5">
              <h3 className="fw-bold mb-0" style={{ color: "#303437" }}>Powiadomienia</h3>
              <button className="close-notifications-btn" onClick={() => setShowNotifications(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#303437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="px-4 d-flex flex-column gap-3">
              {reminders.length > 0 && (
                reminders.map((event, index) => (
                  <ReminderBlock key={event.event_id || index} event={event} />
                )))}

              {notifications.length > 0 && (
                notifications.map((notification, index) => (
                  <div key={index} className="notification-card bg-green shadow-sm">
                    <div className="notification-icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-desc mt-1">{notification.description}</div>
                    </div>
                  </div>
                )))}
            </div>

            <div className="d-flex justify-content-center mt-5 mb-2">
              <div className="bottom-handle"></div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Header;