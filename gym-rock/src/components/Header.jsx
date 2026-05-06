import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === "/settings";
  const [showNotifications, setShowNotifications] = useState(false);

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


      <div className="top-banner-title">
        {!isSettings && title}
      </div>

      {showNotifications && (
        <div className="notifications-overlay">
          <div className="notifications-backdrop" onClick={() => setShowNotifications(false)}></div>
          <div className="notifications-panel pb-4">
            <div className="d-flex justify-content-between align-items-center mb-4 px-4 pt-5">
              <h3 className="fw-bold mb-0" style={{ color: "#303437" }}>Notifications</h3>
              <button className="close-notifications-btn" onClick={() => setShowNotifications(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#303437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="px-4 d-flex flex-column gap-3">
              <div className="notification-card bg-purple shadow-sm">
                <div className="notification-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                </div>
                <div>
                  <div className="notification-title">Training Advance</div>
                  <div className="notification-desc d-flex align-items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                    8.00 - 10.00
                  </div>
                </div>
              </div>

              <div className="notification-card bg-green shadow-sm">
                <div className="notification-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div>
                  <div className="notification-title">Discount</div>
                  <div className="notification-desc mt-1">Discounts for children -15%</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-2">
              <div className="bottom-handle"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;