import "./message.css";
import { motion } from "framer-motion";


const Message = ({ title, messageText, successor,setshowmessageError }) => {
 
  return (
    <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}  
          className="signoutmessage"
        >
          <div className="signoutmessage">
            <div className={`toast ${successor}`}>
              <div className="container-1">
                <span
                  className="icon-cross"
                  onClick={() => {
                    setshowmessageError(false);
                  }}
                />
                <i className={"icon-check-circle"} />
              </div>
              <div className="container-2">
                <p>{title}</p>
                <p>{messageText}</p>
              </div>
            </div>
          </div>
        </motion.div>
  );
};

export default Message;
