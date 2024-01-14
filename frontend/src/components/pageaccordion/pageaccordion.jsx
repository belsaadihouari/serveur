import "./pageaccordion.css";
import CustomizedAccordions from "../button/accordion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const Pageaccordion = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const variants2 = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <>
      <h3 className="h3accordion">
        {t("titlecoulisse")}{" "}
        <span className="spancoulisse">{t("coulisses")}</span>{" "}
        {t("title2coulisse")}
      </h3>
      <div className="containeraccordion flex">
        <div className="rightsection">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants2}
            transition={{ duration: 2 }}
          >
            <p id="paccordion">{t("paragrapheaccordion")}</p>
          </motion.div>
        </div>
        <img
          className="clap"
          src="https://res.cloudinary.com/dtjpxlbkn/image/upload/f_auto,q_auto/v1/imgportfolio/auxf9mt3tsvy9dp3wh9e"
          alt="clap"
        />
        <div className="leftsection">
          <CustomizedAccordions />
        </div>
      </div>
    </>
  );
};

export default Pageaccordion;
