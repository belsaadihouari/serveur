import "./contact.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../../context/AuthContext";
const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let g = 0;
let h = 0;

const Contact = () => {
  const { isAuthenticated, emailuser } = useAuth();
  const { t } = useTranslation();
  const [emailinput, setemailinput] = useState("");
  const [textmessage, settextmessage] = useState("");
  const [submitmessage, setsubmitmessage] = useState(false);
  const [declancheur, setdeclancheur] = useState("");
  const [recaptcha, setrecaptcha] = useState(0);
  const [formvisible, setformvisible] = useState("block");
  const [affichegif, setaffichegit] = useState("visible");
  const [ref, inView] = useInView({
    triggerOnce: true, // déclencher l'observation une seule fois
  });

  const variants = {
    hidden: { scale: 0.4, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  const variants2 = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  function onChange() {
    setrecaptcha(1);
  }
  useEffect(() => {
    if (formvisible === "none") {
      const timeoutId1 = setTimeout(() => {
        setaffichegit("hidden");
      }, 4000);
      const timeoutId2 = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 7000);
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [formvisible]);

  useEffect(() => {
    if (g === 1 && h === 1 && recaptcha === 1) {
      setsubmitmessage(true);
      if (isAuthenticated) {
        setemailinput(emailuser);
      }
    } else {
      setsubmitmessage(false);
    }
  }, [declancheur, recaptcha]);

  async function handlesignin(eo) {
    try {
      eo.preventDefault();
      const res = await fetch(
        "https://server-portfolio-hb.onrender.com/contact",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: emailinput,
            textmessage: textmessage,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (data.validatorError) {
        document.getElementById("erroremail").textContent = t("emailnotvalid");
        document.getElementById("erroremail").style.display = "block";
      }
      if (data.validatorErrormessage) {
        document.getElementById("errormessage").textContent =
          t("messagenotvalid");
        document.getElementById("errormessage").style.display = "block";
      }
      if (data.success) {
        g = 0;
        h = 0;
        setformvisible("none");
        setrecaptcha(0);
        settextmessage("");
        setemailinput("");
      }
    } catch (error) {
      document.getElementById("errorserver").textContent = error;
      document.getElementById("errorserver").style.display = "block";
    }
  }

  return (
    <div className="containercontact" id="contact">
      <div>
        <div className="flex grap jcc aic divb">
          <span style={{ fontSize: "30px" }} className="icon-envelop"></span>
          <h1 className="h1contact">{t("contact me")}</h1>
        </div>
        <p className="parag">{t("paragraphecontact")}</p>
      </div>

      <div className="form-container">
        <div style={{ display: formvisible === "block" ? "none" : "block" }}>
          <h1 style={{ color: "var(--subtitle)" }}>{t("thankformessage")} </h1>
          <br />
          <h5 style={{ color: "var(--subtitle)" }}>{t("désquepossible")}</h5>
          <br />
          <br />
          <img
            style={{
              visibility: affichegif === "visible" ? "hidden" : "visible",
            }}
            className="sendemail2"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/dhwgrkly8doxfsgmbwtk"
            alt="ssdd"
          />

          <img
            style={{ visibility: affichegif }}
            className="sendemail"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/zqjv5cug3touvnor8jij"
            alt="ssdd"
          />
          <img className="mailerMen" src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/ruoyfgwvvefpofwpsqhq" alt="sssdd" />
        </div>

        <form
          className="form"
          style={{ display: formvisible }}
          onSubmit={handlesignin}
        >
          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            {isAuthenticated && (
              <input
                // onChange={(eo) => {
                //   setemailinput(eo.target.value);
                // }}
                value={emailuser}
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                readOnly
              />
            )}

            {!isAuthenticated && (
              <input
                defaultValue={emailinput !== null ? emailinput : ""}
                onChange={(eo) => {
                  setemailinput(eo.target.value);
                }}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (eo.target.value.length !== 0) {
                    if (regEmail.test(eo.target.value)) {
                      g = 1;
                      setdeclancheur("a");
                    } else {
                      g = 0;
                      setdeclancheur("b");
                    }
                  } else {
                    g = 0;
                    setdeclancheur("");
                  }
                }}
                autoComplete="off"
                type="email"
                id="email"
                name="email"
              />
            )}
            <p
              id="erroremail"
              style={{
                marginBottom: "40px",
                color: "red",
                fontSize: "16px",
                fontWeight: "400",
                display: "none",
              }}
            ></p>
          </div>
          <div className="form-group">
            <label htmlFor="textarea">{t("message")}</label>
            {isAuthenticated && (
              <textarea
                // defaultValue={textmessage}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (
                    eo.target.value.length > 9 &&
                    eo.target.value.length < 251
                  ) {
                    h = 1;
                    g = 1;
                    setdeclancheur("d");
                  } else {
                    h = 0;
                    setdeclancheur("e");
                  }
                }}
                autoComplete="off"
                onChange={(eo) => {
                  settextmessage(eo.target.value);
                }}
                name="message"
                id="message"
                style={{ width: "100%", height: "10em" }}
                maxLength={250}
              ></textarea>
            )}

            {!isAuthenticated && (
              <textarea
                // defaultValue={textmessage}
                onKeyUp={(eo) => {
                  // @ts-ignore
                  if (
                    eo.target.value.length > 9 &&
                    eo.target.value.length < 251
                  ) {
                    h = 1;
                    setdeclancheur("d");
                  } else {
                    h = 0;
                    setdeclancheur("e");
                  }
                }}
                autoComplete="off"
                onChange={(eo) => {
                  settextmessage(eo.target.value);
                }}
                name="message"
                id="message"
                style={{ width: "100%", height: "10em" }}
                maxLength={250}
              ></textarea>
            )}
            <p
              id="errormessage"
              style={{
                marginBottom: "40px",
                color: "red",
                fontSize: "16px",
                fontWeight: "400",
                display: "none",
              }}
            ></p>

            <br />
          </div>
          {textmessage && (
            <ReCAPTCHA
              sitekey="6LfpbRopAAAAAPOQXYeqElbLSzCaNb20C9NCRYPZ"
              onChange={onChange}
              theme="dark"
            />
          )}

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants2}
            transition={{ duration: 1 }}
          >
            <button
              className={submitmessage ? "submitmessage" : "form-submit-btn"}
              type="submit"
              // disabled={state.submitting}
            >
              {t("submit")}
            </button>
          </motion.div>
          <p
            id="errorserver"
            style={{
              marginBottom: "40px",
              color: "red",
              fontSize: "16px",
              fontWeight: "400",
              marginTop: "40px",
              display: "none",
            }}
          ></p>
        </form>

        <div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1 }}
            className="imgcontact"
          >
            <img
              className="imgcontact"
              src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/vimxnb3eyoev1fesp15o"
              alt="az"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
