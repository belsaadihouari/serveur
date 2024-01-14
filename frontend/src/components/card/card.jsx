import "./card.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Card = ({ src, title, url, git }) => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="card">
      <div className="content">
        <img src={src} alt="img" />
        <p className="para">{title}</p>

        <div className="lien flex jcsb aic grap">
          <div className="flex grapp lien2">
            <span
              style={{ display: url == "" ? "none" : "block" }}
              className="icon-link activ"
              onClick={() => {
                window.open(url, "_blank", "noopener noreferrer");
              }}
            ></span>
            {isAuthenticated && (
              <span
                className="icon-github activ"
                onClick={() => {
                  window.open(git, "_blank", "noopener noreferrer");
                }}
              ></span>
            )}
            {!isAuthenticated && <Link className="icon-github" to="/signin" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
