import { useEffect, useState } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import Alerte from "../button/alerte";
import Alerterating from "../button/alerterating";
const Header = ({ url }) => {
  const {
    isAuthenticated,
    login,
    logout,
    showmessageSignin,
    showmessageError,
    setshowmessageError,
    showmessagerating,
    rating,
  } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setmenu] = useState("none");
  const [theme, settheme] = useState("dark");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      settheme(localStorage.getItem("theme"));
    }
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await login();
        if (data) {
          return
        } else {
          return
        }
      } catch (error) {
        return
      }
    };
    fetchdata();
  }, []);

  const scrollToTop = () => {
    const projects = document.getElementById("projects");
    projects.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollTocontact = () => {
    const contact = document.getElementById("contact");
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);
  return (
    <>
     {showmessagerating && (
          <Alerterating
            text={`${t("thanksevaliation")} ${rating !== null ? rating : 0} ${t(
              "star"
            )}`}
            succ={"info"}
          />
        )}
      {showmessageSignin && (
        <Alerte text={t("Sign-inSuccessfully")} succ={"success"} />
      )}

      {showmessageError && (
        <Alerte text={t("Sign-outSuccessfully")} succ={"info"} />
      )}

      <header className="flex jcsb aic">
        <div className=" containerflag flex">
          <img
            onClick={() => {
              i18n.changeLanguage("en");
            }}
            className="flag flaguk"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kop2l0tv8mnq3ih5repl"
            alt=""
          />
          <img
            onClick={() => {
              i18n.changeLanguage("de");
            }}
            className="flag flagger"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/x3yignjsjlgziaqnnszr"
            alt=""
          />

          <img
            onClick={() => {
              i18n.changeLanguage("fr");
            }}
            className="flag flagfr"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kzmadgpehkdviojs6rty"
            alt=""
          />
        </div>

        <div className="menuhumberger flex jcsb aic">
          <div className="divvide"></div>
          <button
            className="humberger"
            onClick={() => {
              setmenu("block");
            }}
          >
            {}

            <span className="icon-menu"></span>
          </button>

          <nav className="nav1">
            <ul className="flex">
              {location.pathname == "/" && (
                <li>
                  <a
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    {t("about")}
                  </a>
                </li>
              )}
              {location.pathname == "/about" && (
                <li>
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    {t("home")}
                  </a>
                </li>
              )}

              <li>
                <a className="disabled" href="">
                  {t("articles")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    if (url == "/") {
                      scrollToTop();
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  {t("projects")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    if (url == "/") {
                      scrollTocontact();
                    } else {
                      navigate("/#projects");
                    }
                  }}
                >
                  {t("contact me")}
                </a>
              </li>
              {isAuthenticated && (
                <li>
                  <a
                    className="logina"
                    onClick={() => {
                      logout();
                      setshowmessageError(true);
                    }}
                  >
                    {t("sign-out")}
                  </a>
                </li>
              )}

              {!isAuthenticated && (
                <li
                  onClick={() => {
                    navigate("/signin", { state: { from: location.pathname } });
                  }}
                >
                  {t("sign-in")}
                </li>
              )}
            </ul>
          </nav>

          {theme === "light" && (
            <button>
              <span
                onClick={() => {
                  settheme("dark");
                  localStorage.setItem("theme", "dark");
                }}
                className="icon-moon-o"
              ></span>
            </button>
          )}
          {theme === "dark" && (
            <button>
              <span
                onClick={() => {
                  settheme("light");
                  localStorage.setItem("theme", "light");
                }}
                className="icon-sun"
              ></span>
            </button>
          )}
        </div>

        <div className="modale" style={{ display: menu }}>
          <ul>
            <li>
              <span
                className="icon-cross"
                onClick={() => {
                  setmenu("none");
                }}
              />
            </li>

            {location.pathname == "/" && (
              <li>
                <a
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  {t("about")}
                </a>
              </li>
            )}
            {location.pathname == "/about" && (
              <li>
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {t("home")}
                </a>
              </li>
            )}
            <div className="divider" />
            <li>
              <a className="disabled" href="">
                {t("articles")}
              </a>
            </li>
            <div className="divider" />
            <li>
              <a
                onClick={() => {
                  setmenu("none");
                }}
                href="/#projects"
              >
                {t("projects")}
              </a>
            </li>
            <div className="divider" />
            <li>
              <a
                onClick={() => {
                  setmenu("none");
                }}
                href="/#contact"
              >
                {t("contact me")}
              </a>
            </li>
            <div className="divider" />
            {isAuthenticated && (
              <li>
                <a
                  className="logina"
                  onClick={() => {
                    logout();
                    setmenu("none");
                    setshowmessageError(true);
                  }}
                >
                  {t("sign-out")}
                </a>
              </li>
            )}
            {!isAuthenticated && (
              <li
                className="logina"
                onClick={() => {
                  navigate("/signin", { state: { from: location.pathname } });
                }}
              >
                {t("sign-in")}
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
