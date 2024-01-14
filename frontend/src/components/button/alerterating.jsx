import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const Alerterating = ({ text, succ }) => {
  const {
    showmessageError,
    setshowmessageError,
    setshowmessagerating,
    showmessagerating,
  } = useAuth();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showmessagerating) {
        setshowmessagerating(false);
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
      <Alert className="alert2" severity={succ}>
        {text}
      </Alert>
    </motion.div>
  );
};

export default Alerterating;
