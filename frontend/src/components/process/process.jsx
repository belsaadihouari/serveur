import "./process.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Process = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true, // déclencher l'observation une seule fois
  });

  const variants2 = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className="containermernprocess">
        <div className="containermernh1">
          <h1 className="h1process">{t("process")}</h1>
          
            <img
              className="mernprocess"
              src={
                "https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/fno3p91bbmsbmyqumdpp"
              }
              alt="mern"
            />
          
        </div>
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants2}
            transition={{ duration: 2 }}
            
          >
        <p className="pprocess">{t("processparagraph")}</p>
        </motion.div>
      </div>
    </>
  );
};

export default Process;
