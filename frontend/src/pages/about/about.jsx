import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import "./about.css";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {  useState } from "react";
const About = () => {
  const [heartannimarret, setheartannimarret] = useState("heartannim");
  const { t} = useTranslation();
  const locationabout = useLocation();
  const url = locationabout.pathname;
  

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("about")}</title>
        <meta
          name="description"
          content="Découvrez qui je suis et ce que je fais. En tant que professionnel passionné , je mets mon expertise au service de projets uniques. Apprenez-en plus sur mon parcours, mes compétences et ma vision créative."
        />
      </Helmet>
      <div className="contentabout">
        <Header url={url} />
        <h3 className="h3about">{t("abouttitle")} <span className={`heart ${heartannimarret}`}>&#129505;</span></h3>

        <motion.div // Utilisez motion.div pour ajouter des animations à cette page
          initial={{ opacity: 0 }} // Animation initiale
          animate={{ opacity: 1 }} // Animation lors de l'affichage de la page
          exit={{ opacity: 0 }} // Animation lors de la transition vers une autre page
          transition={{ duration: 2.5 }} // Durée de l'animation
          className="containerabout"
        >
          <div className="containerabout flex jcsb">
            <div className="about">
              <p>{t("aboutparagraphe1")}</p>
              <p>{t("aboutparagraphe2")}</p>
              <p>{t("aboutparagraphe3")}</p>
              <p>{t("aboutparagraphe4")}</p>
            </div>

            <div className="containerimg">
              <img src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/wkhbfkxjk9hemiiemmsp" className="imgabout"></img>
              
              {/* <div className="heart-container">
                {hearts.map((heart) => (
                  <div
                    key={heart.id}
                    className="falling-heart"
                    style={{
                      transform: `translate(${heart.translateX}, ${heart.translateY})`,
                      animationDuration: heart.animationDuration,
                    }}
                  >
                    &#129505;
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </motion.div>
        <div className="divider" />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default About;
