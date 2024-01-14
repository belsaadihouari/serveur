import { useEffect, useState } from "react";
import "./signin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import Alertesignup from "../button/alertsignup";
import ReactLoading from "react-loading";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
let x = 0;
let y = 0;
const Signin = () => {
  const {
    showmessageSignin,
    setemailuser,
    setshowmessageSignin,
    setrating,
    setIsAuthenticated,
    
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const patch = location.state;
  const { t } = useTranslation();
  const [email, setemail] = useState("");
  const [passwordstate, setpasswordstate] = useState("");
  const [submit, setsubmit] = useState("");
  const [verificolor, setverificolor] = useState("");
  const [verificolor2, setverificolor2] = useState("");
  const [theme, settheme] = useState("dark");
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      settheme(localStorage.getItem("theme"));
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const emailvalue = document.getElementById("email").value;
    const passwordvalue = document.getElementById("password").value;
    if (emailvalue.length !== 0 && passwordvalue.length !== 0) {
      if (regEmail.test(emailvalue) && regPassword.test(passwordvalue)) {
        setsubmit("true");
      }
    }
  }, []);

  useEffect(() => {
    if (x === 1 && y === 1) {
      setsubmit("true");
    } else {
      setsubmit("");
    }
  }, [verificolor, verificolor2]);

  async function handlesignin() {
    try {
      setloading(true);
      const res = await fetch(
        "https://server-portfolio-hb.onrender.com/signin",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: passwordstate,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      setloading(false);

      const data = await res.json();

      if (data.validatorError) {
        data.validatorError.forEach((item) => {
          if (item.path == "email") {
            setverificolor("borderRed");
          }
          if (item.path == "password") {
            setverificolor2("borderRed");
          }
        });
      }
      if (data.verification) {
        document.getElementById("errormess").textContent = t("emaintnon");
      }
      if (data.emailconfirm) {
        document.getElementById("errormess").textContent = t("emailnotconfirm");
      }
      if (data.id) {
        const setCookieHeader = data.token;
        localStorage.setItem("jwt", setCookieHeader);
        setrating(data.rating);
        setemailuser(data.email);
        setIsAuthenticated(true);
        navigate("/");
        setshowmessageSignin(true);

        x = 0;
        y = 0;
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("login")}</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte pour accéder à nos services. Profitez d'une expérience sécurisée et personnelle."
        />
      </Helmet>
      <motion.div // Utilisez motion.div pour ajouter des animations à cette page
        initial={{ opacity: 0 }} // Animation initiale
        animate={{ opacity: 1 }} // Animation lors de l'affichage de la page
        exit={{ opacity: 0 }} // Animation lors de la transition vers une autre page
        transition={{ duration: 2.5 }} // Durée de l'animation
        className="globalcontainersignin"
      >
        <div className="globalcontainersignin">
          <div className="login-box">
            <p className="title">{t("login")}</p>

            <form>
              <div className="user-box">
                <input
                  id="email"
                  className={verificolor}
                  autoComplete="off"
                  onKeyUp={(eo) => {
                    // @ts-ignore
                    if (eo.target.value.length !== 0) {
                      if (regEmail.test(eo.target.value)) {
                        x = 1;
                        setverificolor("borderGren");
                      } else {
                        x = 0;
                        setverificolor("borderRed");
                      }
                    } else {
                      x = 0;
                      setverificolor("");
                    }
                  }}
                  value={email}
                  required
                  name=""
                  type="text"
                  onChange={(eo) => {
                    setemail(eo.target.value);
                  }}
                />
                <label>{t("email")}</label>
              </div>
              <div className="user-box">
                <input
                  id="password"
                  className={verificolor2}
                  value={passwordstate}
                  onKeyUp={(eo) => {
                    // @ts-ignore
                    if (eo.target.value.length !== 0) {
                      if (regPassword.test(eo.target.value)) {
                        y = 1;
                        setverificolor2("borderGren");
                      } else {
                        y = 0;
                        setverificolor2("borderRed");
                      }
                    } else {
                      y = 0;
                      setverificolor2("");
                    }
                  }}
                  onChange={(eo) => {
                    setpasswordstate(eo.target.value);
                  }}
                  autoComplete="off"
                  required
                  maxLength={20}
                  minLength={8}
                  name=""
                  type={visible ? "password" : "text"}
                />

                <p
                  id="errormess"
                  style={{
                    color: "red",
                    fontSize: "16px",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                ></p>
                {visible ? (
                  <div
                    onClick={() => {
                      setvisible(false);
                    }}
                  >
                    <Visibility fontSize="small" className="visiblepassword" />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setvisible(true);
                    }}
                  >
                    <VisibilityOff
                      fontSize="small"
                      className="visiblepassword"
                    />
                  </div>
                )}

                <label>{t("password")}</label>
              </div>
              <a
                onClick={handlesignin}
                className={submit}
                // href="#"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {loading ? (
                  <div className="divloader">
                    {" "}
                    <ReactLoading
                      className="loaderconfi"
                      type={"spin"}
                      color={"black"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </div>
                ) : (
                  t("submit")
                )}
              </a>
            </form>
            <p>
              {t("subtitlesignin")}{" "}
              <Link to="/signup" className="a2">
                {t("signup")}!
              </Link>
            </p>
          </div>
        </div>
        {showmessageSignin && (
          <Alertesignup text={t("checkemail")} succ={"info"} />
        )}
      </motion.div>
      {/* <h3 className="h1authent">{t("connecting")}:</h3> */}
    </HelmetProvider>
  );
};

// if (patch.from == "/signup") {
//   navigate("/");
// } else {
//   navigate(patch.from);
// }

export default Signin;
