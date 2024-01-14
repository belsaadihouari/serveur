import React, { useEffect } from "react";
import "./Main.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "../card/card";
import axios from "axios";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
const Main = () => {
  const [selected, setselected] = useState("all");
  const [datat, setdatat] = useState([]);
  const [datatafilter, setdatatafilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setcurrent] = useState(null);
  const [hidebtnmore, sethidebtnmore] = useState(false);
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true, // déclencher l'observation une seule fois
    threshold: 0.1, // 20% de l'élément doit être visible pour que 'inView' soit 'true'
  });

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://server-portfolio-hb.onrender.com/data`;
        setLoading(true);
        const { data } = await axios.get(url);

        setLoading(false);
        setdatat(data);
        // setdatatafilter(data);
        setcurrent(0);
      } catch (error) {
        document.getElementById("more").style.display = "none";

        setLoading(false);
      }
    };
    verifyEmailUrl();
  }, []);

  useEffect(() => {
    const startindex = 0;
    const endindex = (current + 1) * 8;
    const newdata = datat.slice(startindex, endindex);
    setdatatafilter(newdata);
  }, [current]);

 
  const variants2 = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const scrollToTop = () => {
    const projects = document.getElementById("projects");
    projects.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="main1 flex" id="projects">
      <motion.div
        ref={ref}
        initial="hidden"
        // animate={inView ? "visible" : "hidden"}
        animate="visible"
        variants={variants2}
        transition={{ duration: 1 }}
        // className="left-sectionmotion"
      >
        <section className="left-section flex">
          <button
            onClick={() => {
              setdatatafilter(datat);
              setselected("all");
              scrollToTop();
              sethidebtnmore(true);
            }}
            className={selected === "all" ? "btn selected" : "btn"}
          >
            <a>{t("allprojects")}</a>
          </button>

          <button
            onClick={() => {
              const newdata = datat.filter((item) => {
                return item.genre === "vanilla";
              });
              setdatatafilter(newdata);
              setselected("vanilla");
              scrollToTop();
              sethidebtnmore(true);
            }}
            className={selected === "vanilla" ? "btn selected" : "btn"}
          >
            <a>Javascript Vanilla</a>
          </button>

          <button
            onClick={() => {
              const newdata = datat.filter((item) => {
                return item.genre === "react";
              });
              setdatatafilter(newdata);
              setselected("react");
              scrollToTop();
              sethidebtnmore(true);
            }}
            className={selected === "react" ? "btn selected" : "btn"}
          >
            <a>React Js</a>
          </button>

          <button
            onClick={() => {
              const newdata = datat.filter((item) => {
                return item.genre === "node";
              });
              setdatatafilter(newdata);
              setselected("node");
              scrollToTop();
              sethidebtnmore(true);
            }}
            className={selected === "node" ? "btn selected" : "btn"}
          >
            <a>Node Js</a>
          </button>
        </section>
      </motion.div>

      <section className="right-section flex">
        {loading && (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="secondary" size={100} />
          </Stack>
        )}
        {!loading &&
          datatafilter.map((item, index) => (
            <Card
              key={index}
              src={item.src}
              title={item.title}
              url={item.url}
              git={item.git}
            />
          ))}

        {!loading && (
          <div
            className="flex"
            style={{
              width: "100%",
              marginTop: "40px",
              justifyContent: "center",
            }}
          >
            <Button
              id="more"
              className="btncv"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#9c27b0",
                color: "white",
                width: "180px",
                display: hidebtnmore ? "none" : "block",
              }}
              onClick={() => {
                if (current <= 2) {
                  setcurrent(current + 1);
                  if (current == 2) {
                    sethidebtnmore(true);
                  }
                }
              }}
            >
              {t("more")} ...
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Main;
