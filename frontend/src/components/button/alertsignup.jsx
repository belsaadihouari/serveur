import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const Alerte = ({ text, succ }) => {
  const {
    showmessageSignin,
    setshowmessageSignin,
    showmessageError,
    setshowmessageError,
  } = useAuth();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showmessageSignin) {
        setshowmessageSignin(false);
      }
      if (showmessageError) {
        setshowmessageError(false);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  const explosionVariants = {
    initial: { x: "100%", opacity: 0, scale: 0 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: "100%", opacity: 0, scale: 0 },
  };

  return (
    <motion.div
      variants={explosionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileTap={{ scale: 1.2 }}
      transition={{ duration: 1 }}
      className="alert"
    >
      <Alert className="alertsignup" severity={succ}>
        {text}
      </Alert>
    </motion.div>
  );
};

export default Alerte;
