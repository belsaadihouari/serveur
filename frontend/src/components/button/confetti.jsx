import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [windowsize, setwindowsize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectesize = () => {
    setwindowsize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectesize);
    return () => {
      window.removeEventListener("resize", detectesize);
    };
  }, [windowsize]);

  return (
    <ReactConfetti
      width={windowsize.width}
      height={windowsize.height}
      numberOfPieces={200}
    />
  );
};

export default Confetti;
