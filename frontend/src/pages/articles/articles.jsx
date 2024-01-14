import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./articles.css";
import Footer from "../../components/Footer/Footer";
import Detail from "../../components/article/detail";


const Articles = () => {
    const location = useLocation();
   
  const urlapp = location.pathname;
    return (
        <div className="containerarticles">
          <Header url={urlapp} /> 
          <br />
        <br /> 
          <div className="divider" />
         
        <Detail />
        <div className="divider" />
        <Footer />
        </div>
    );
}

export default Articles;
