import "./Header.css";

const Header = ({title}) => {

  return (
    <div className="top-banner-container">
      <img 
        src="/img/main-wall.jpg" 
        alt="Main Wall" 
        className="top-banner-img" 
      />
      <div className="top-banner-title">
            {title}
      </div>
    </div>
  );
};

export default Header;