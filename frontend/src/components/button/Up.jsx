import "./button.css";

import { useEffect, useState } from "react";

const Up = () => {
  const [showup, setshowup] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setshowup(1);
      } else {
        setshowup(0);
      }
    });
  }, []);
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
      style={{ opacity: showup }}
      className="up icon-arrow-up"
    ></div>
  );
};

export default Up;
