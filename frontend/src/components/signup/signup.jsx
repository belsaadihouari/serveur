import { useLocation } from "react-router-dom";
import "./signup.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";
import ReactLoading from "react-loading";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
let a = 0;
let b = 0;
let c = 0;
const Signup = () => {
  const { setshowmessageSignin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [emailup, setemailup] = useState("");
  const [passwordup, setpasswordup] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [submitup, setsubmitup] = useState("");
  const [verificolorup, setverificolorup] = useState("");
  const [verificolor2up, setverificolor2up] = useState("");
  const [verificolor3up, setverificolor3up] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setvisible] = useState(true);
  const [visible2, setvisible2] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (a === 1 && b === 1 && c === 1) {
      setsubmitup("true");
    } else {
      setsubmitup("");
    }
  }, [verificolorup, verificolor2up, verificolor3up]);

  async function submitform() {
    try {
      setLoading(true);
      const res = await fetch(
        "https://server-portfolio-hb.onrender.com/signup",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailup,
            password: passwordup,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false);
      const data = await res.json();
      if (data.validatorError) {
        data.validatorError.forEach((item) => {
          if (item.path == "email") {
            setverificolorup("borderRed");
          }
          if (item.path == "password") {
            setverificolor2up("borderRed");
          }
        });
      }
      if (data.isCurrentEmail) {
        document.getElementById("errormess").textContent = t("emailexist");
        setverificolorup("borderRed");
      }
      if (data.id) {
        navigate("/signin");
        setshowmessageSignin(true);
        a = 0;
        b = 0;
        c = 0;
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("signup")}</title>
        <meta
          name="description"
          content="Inscrivez-vous dès maintenant pour rejoindre notre communauté. Créez un compte et explorez une expérience personnalisée. Profitez des avantages exclusifs réservés aux membres."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
        className="login-box2"
      >
        <div className="login-box2">
          <p className="title">{t("signup")}</p>

          <form id="formsignup">
            <div className="user-box">
              <input
                value={emailup}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (eo.target.value.length !== 0) {
                    // @ts-ignore
                    if (regEmail.test(eo.target.value)) {
                      a = 1;
                      setverificolorup("borderGren");
                    } else {
                      a = 0;
                      setverificolorup("borderRed");
                    }
                  } else {
                    a = 0;
                    setverificolorup("");
                  }
                }}
                className={verificolorup}
                autoComplete="off"
                onChange={(eo) => {
                  setemailup(eo.target.value);
                }}
                required
                name=""
                type="text"
                id="emailid"
              />

              <label>{t("email")}</label>
            </div>
            <div className="user-box">
              <input
                value={passwordup}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (eo.target.value.length !== 0) {
                    // @ts-ignore
                    if (regPassword.test(eo.target.value)) {
                      b = 1;
                      setverificolor2up("borderGren");
                    } else {
                      b = 0;
                      setverificolor2up("borderRed");
                    }
                  } else {
                    b = 0;
                    setverificolor2up("");
                  }
                }}
                className={verificolor2up}
                autoComplete="off"
                onChange={(eo) => {
                  setpasswordup(eo.target.value);
                }}
                required
                maxLength={20}
                minLength={8}
                name=""
                type={visible ? "password" : "text"}
                id="passwordid"
              />
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
                  <VisibilityOff fontSize="small" className="visiblepassword" />
                </div>
              )}
              <p
                id="errorpass"
                style={{
                  color: "red",
                  fontSize: "16px",
                  fontWeight: "400",
                  textAlign: "left",
                }}
              ></p>

              <label>{t("password")}</label>
            </div>

            <div className="user-box">
              <input
                value={confirmpass}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (eo.target.value.length !== 0) {
                    if (confirmpass == passwordup) {
                      c = 1;
                      setverificolor3up("borderGren");
                    } else {
                      c = 0;
                      setverificolor3up("borderRed");
                    }
                  } else {
                    c = 0;
                    setverificolor3up("");
                  }
                }}
                className={verificolor3up}
                autoComplete="off"
                onChange={(eo) => {
                  setconfirmpass(eo.target.value);
                }}
                required
                maxLength={20}
                minLength={8}
                name=""
                type={visible2 ? "password" : "text"}
              />
              {visible2 ? (
                <div
                  onClick={() => {
                    setvisible2(false);
                  }}
                >
                  <Visibility fontSize="small" className="visiblepassword" />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setvisible2(true);
                  }}
                >
                  <VisibilityOff fontSize="small" className="visiblepassword" />
                </div>
              )}
              <p
                id="errormess"
                style={{
                  color: "red",
                  fontSize: "16px",
                  fontWeight: "400",
                  textAlign: "left",
                }}
              ></p>

              <label>{t("confirmpassword")}</label>
            </div>
            <a
              className={submitup}
              onClick={submitform}
              id="spano"
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

          <p
            onClick={() => {
              navigate("/signin", { state: { from: location.pathname } });
            }}
          >
            {t("titlebuttonsignup")} ?{" "}
            <span className="a2">{t("sign-in")}</span>
          </p>
        </div>
      </motion.div>
    </HelmetProvider>
  );
};

export default Signup;
