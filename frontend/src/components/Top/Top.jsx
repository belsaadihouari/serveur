import "./Top.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "../button/confetti";

const Top = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    rating,
    setrating,
    setLoading,
    showmessagerating,
    setshowmessagerating,
  } = useAuth();
  const [clicked, setclicked] = useState(false);
  const [deuxiemerendu, setdeuxiemerendu] = useState(0);
  const [icon3dface, seticon3dface] = useState(true);
  const [icon3dlink, seticon3dlink] = useState(true);
  const [icon3dx, seticon3dx] = useState(true);
  const [icon3dgit, seticon3dgit] = useState(true);
  const [imageface, setImageface] = useState(null);
  const [imagegit, setImagegit] = useState(null);
  const [imagex, setImagex] = useState(null);
  const [imagelink, setImagelink] = useState(null);
  const [declancherapresauth, setdeclancherapresauth] = useState(false);
  const [ratingfive, setratingfive] = useState(false);
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const variants2 = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  //cette useeffect pour declancher les telechargement des images apres authentification
  useEffect(() => {
    if (isAuthenticated) {
      setdeclancherapresauth(true);
    }
  }, [isAuthenticated]);

  //cette useeffect pour  telecharger les images apres ale chargement de la page

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response1 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kiz69k4tkwa7teiktdyv"
        );
        const dataURL1 = await response1.blob();

        const response2 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/vgt3c3dtxbdnhrsm55as"
        );
        const dataURL2 = await response2.blob();

        const response3 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kc2chdwwwen2x2hmygb0"
        );
        const dataURL3 = await response3.blob();

        const response4 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/xdd1qjb0dn3mq6z2e5cr"
        );
        const dataURL4 = await response4.blob();

        setImageface(URL.createObjectURL(dataURL1));
        setImagegit(URL.createObjectURL(dataURL2));
        setImagex(URL.createObjectURL(dataURL3));
        setImagelink(URL.createObjectURL(dataURL4));
      } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
      }
    };
    const handleLoad = () => {
      fetchImages();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  //cette useeffect pour telecharger les image declanché pas la premiere useeffect
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response1 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kiz69k4tkwa7teiktdyv"
        );
        const dataURL1 = await response1.blob();

        const response2 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/vgt3c3dtxbdnhrsm55as"
        );
        const dataURL2 = await response2.blob();

        const response3 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/kc2chdwwwen2x2hmygb0"
        );
        const dataURL3 = await response3.blob();

        const response4 = await fetch(
          "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/xdd1qjb0dn3mq6z2e5cr"
        );
        const dataURL4 = await response4.blob();

        setImageface(URL.createObjectURL(dataURL1));
        setImagegit(URL.createObjectURL(dataURL2));
        setImagex(URL.createObjectURL(dataURL3));
        setImagelink(URL.createObjectURL(dataURL4));
      } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
      }
    };

    fetchImages();
  }, [declancherapresauth]);
  //cette useeffect pour desactiver confetti
  useEffect(() => {
    let timeoutId;
    if (ratingfive) {
      timeoutId = setTimeout(() => {
        const containerconfetti = document.getElementById("containerconfetti");
        if (containerconfetti) {
          containerconfetti.style.opacity = "0";
        }

        setTimeout(() => {
          setratingfive(false);
        }, 1000);
      }, 6000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [ratingfive]);

  async function handleRating(props) {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      const res = await fetch("https://server-portfolio-hb.onrender.com/rating", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          rating: props,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setshowmessagerating(true);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setdeuxiemerendu((prevCount) => prevCount + 1);
    if (deuxiemerendu > 1) {
      handleRating(rating);
    }
  }, [clicked]);

  function handleMouseEnter(props) {
    if (props == 1) {
      seticon3dface(false);
    }
    if (props == 2) {
      seticon3dx(false);
    }
    if (props == 3) {
      seticon3dlink(false);
    }
    if (props == 4) {
      seticon3dgit(false);
    }
  }
  function handleMouseLeave(props) {
    if (props == 1) {
      seticon3dface(true);
    }
    if (props == 2) {
      seticon3dx(true);
    }
    if (props == 3) {
      seticon3dlink(true);
    }
    if (props == 4) {
      seticon3dgit(true);
    }
  }

  return (
    <>
      {ratingfive && (
        <div style={{ transition: "2s" }} id="containerconfetti">
          <Confetti />
        </div>
      )}

      <section className="section flex jcsb">
        <div className="containertop">
          <div>
            <img
              className="imge"
              src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/fpbrjoby42e3ud8vgznt"
              alt="img"
            />
            <span className="icon-verified"></span>
            <h1>
              {t("title1")} <span className="fullstack"> {t("title2")}</span>{" "}
              {t("title3")}
            </h1>
            <div className="paragraphe">{t("paragraphe-top")}</div>
          </div>
          <Typography className="rating" sx={{ mt: "20px" }} component="legend">
            Portfolio Rating
          </Typography>

          {isAuthenticated && (
            <Rating
              name="simple-controlled"
              value={rating == null ? 0 : rating}
              onChange={(event, newValue) => {
                setrating(newValue);
                setclicked(clicked ? false : true);
                if (newValue == 5) {
                  setratingfive(true);
                }
              }}
              emptyIcon={
                <StarBorderIcon style={{ color: "rgb(249, 174, 0)" }} />
              }
            />
          )}
          {!isAuthenticated && (
            <Rating
              name="simple-controlled"
              value={0}
              onChange={() => {
                navigate("/signin");
              }}
              emptyIcon={
                <StarBorderIcon style={{ color: "rgb(249, 174, 0)" }} />
              }
            />
          )}
        </div>
       
        <div className="containeranni flex jcsb">
          <div className="reseaux flex aic">
            <div>
              <img
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/trocadero.solferino",
                    "_blank",
                    "noopener noreferrer"
                  );
                }}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                src={
                  icon3dface
                    ? "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/wx0tdwbooavcaoxb5svl"
                    : imageface
                }
                alt="fcb"
                onMouseEnter={() => {
                  handleMouseEnter(1);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(1);
                }}
              />
            </div>

            <div>
              <img
                onClick={() => {
                  window.open(
                    "https://github.com/belsaadihouari",
                    "_blank",
                    "noopener noreferrer"
                  );
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  scale: "1.3",
                }}
                src={
                  icon3dgit
                    ? "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/ycpzojbw7nf1ssjwwwnc"
                    : imagegit
                }
                alt="github"
                onMouseEnter={() => {
                  handleMouseEnter(4);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(4);
                }}
              />
            </div>

            <div>
              <img
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/houari-belsaadi-1b6a75282",
                    "_blank",
                    "noopener noreferrer"
                  );
                }}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                src={
                  icon3dlink
                    ? "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/gq3f2pqzcsfrpypjyqn2"
                    : imagelink
                }
                alt="linkdin"
                onMouseEnter={() => {
                  handleMouseEnter(3);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(3);
                }}
              />
            </div>

            <div>
              <img
                onClick={() => {
                  window.open(
                    "https://www.twitter.com/belsaadihouari",
                    "_blank",
                    "noopener noreferrer"
                  );
                }}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                src={
                  icon3dx
                    ? "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/iz9edjm5xxxv6ubdmiim"
                    : imagex
                }
                alt="x"
                onMouseEnter={() => {
                  handleMouseEnter(2);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(2);
                }}
              />
            </div>

            <div
              className="containerbtncvpc"
              onClick={() => {
                if (isAuthenticated) {
                  window.open(
                    "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/cv/mtb8vqe87lihl4jowlla",
                    "_blank",
                    "noopener noreferrer"
                  );
                } else {
                  navigate("/signin");
                }
              }}
            >
              <Button
                disabled={!isAuthenticated}
                className="btncv"
                sx={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  padding: "8px 22px",
                }}
                variant="contained"
                endIcon={<CloudDownloadIcon />}
              >
                {t("upload")} CV
              </Button>
            </div>
          </div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants2}
            transition={{ duration: 2 }}
            className="animation"
          >
            <div className="animation">
              <img
                src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/f4y71hypgp7ahnemzhxp"
                alt=""
              />
            </div>
          </motion.div>
        </div>
        <div
          className="containerbtncvmobile"
          onClick={() => {
            if (isAuthenticated) {
              window.open(
                "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/cv/fqys7c6fau8o0hjgzfjk",
                "_blank",
                "noopener noreferrer"
              );
            } else {
              navigate("/signin");
            }
          }}
        >
          <Button
            disabled={!isAuthenticated}
            className="btncv"
            sx={{
              backgroundColor: "#9c27b0",
              color: "white",
              padding: "8px 22px",
            }}
            variant="contained"
            endIcon={<CloudDownloadIcon />}
          >
            {t("upload")} CV
          </Button>
        </div>
      </section>
    </>
  );
};

export default Top;
