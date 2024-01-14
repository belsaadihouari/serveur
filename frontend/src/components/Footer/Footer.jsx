import "./Footer.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  const location = useLocation();
  return (
    <div className="foot">
      <nav className="nav1">
        <ul className="flex">
          <li>
            {location.pathname == "/about" && <a href="/">{t("home")}</a>}
            {location.pathname == "/" && <a href="/about">{t("about")}</a>}
            {location.pathname == "/articles" && <a href="/">{t("home")}</a>}
          </li>
          <li>
            <a className="disabled" href="#">
              {t("articles")}
            </a>
          </li>
          <li>
            {location.pathname == "/about" && <a href="/">{t("projects")}</a>}
            {location.pathname == "/" && (
              <a href="#projects">{t("projects")}</a>
            )}
            {location.pathname == "/articles" && <a href="/">{t("projects")}</a>}

          </li>
          <li>
            {location.pathname == "/about" && <a href="/">{t("contact me")}</a>}
            {location.pathname == "/" && (
              <a href="#contact">{t("contact me")}</a>
            )}
            {location.pathname == "/articles" && <a href="/">{t("contact me")}</a>}
          </li>
        </ul>
      </nav>
      <p>© 2024 {t("rightreserved")}</p>
    </div>
  );
};

export default Footer;
