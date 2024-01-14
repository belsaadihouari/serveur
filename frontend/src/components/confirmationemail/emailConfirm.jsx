import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./emailConfirm.css";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const EmailVerify = () => {
  const { t } = useTranslation();
  const [validUrl, setValidUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [afficheerreur, setafficheerreur] = useState("");
  const [theme, settheme] = useState("dark");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
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
    const verifyEmailUrl = async () => {
      try {
        const url = `https://server-portfolio-hb.onrender.com/confirmation?token=${token}`;
        setLoading(true);
        const { data } = await axios.get(url);
        setValidUrl(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response.data.error == "Token not valid") {
          setafficheerreur("tknvalid");
        } else if (error.response.data.error == "Email already verified") {
          setafficheerreur("emalreverified");
        } else if (error.response.data.error == "Token not found") {
          setafficheerreur("toknotfound");
        } else if (
          error.response.data.error ==
          "Erreur lors de la confirmation de l'email"
        ) {
          setafficheerreur("errorlors");
        }

        setValidUrl(false);
        setLoading(false);
      }
    };
    verifyEmailUrl();
  }, [token]);

  return (
    <>
      {loading && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
          className="loadingemail"
        >
          <CircularProgress color="secondary" size={60} />
        </Stack>
      )}
      {validUrl && (
        <>
          <img
            className="imgemail"
            src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/hfr73u676xl6hywrdfhv"
            alt="emailconfirmed"
          />
          <h1 className="h1img">{t("emailverified")}</h1>
          <a className="aconfirm" id="spano" href="/signin">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {t("sign-in")}
          </a>
        </>
      )}
      {validUrl === false && (
        <>
          <h1
            style={{
              color: "var(--subtitle)",
              fontSize: "25px",
              padding: "20px",
            }}
          >
            404 {t("404")}
          </h1>
          <h2 className="h1img2">{t(afficheerreur)}</h2>
        </>
      )}
    </>
  );
};

export default EmailVerify;
