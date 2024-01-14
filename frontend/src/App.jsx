import Contact from "./components/contact/contact";
import Up from "./components/button/Up";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Top from "./components/Top/Top";
import Pageaccordion from "./components/pageaccordion/pageaccordion";
import { useLocation } from "react-router-dom";
import "./i18n";
import Process from "./components/process/process";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
function App() {
  const { t } = useTranslation();
  const locationabout = useLocation();
  const urlapp = locationabout.pathname;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t("home")}</title>
        <meta
          name="description"
          content="Découvrez le portfolio de houari belsaadi, un professionnel passionné du developpement web et React js et Node js. Explorez ses projets innovants et son expertise dans developpement web full stack. Obtenez un aperçu de ses compétences créatives et techniques, démontrées à travers une collection variée de réalisations impressionnantes."
        />
      </Helmet>
      <div className="container">
        <Up />
        <Header url={urlapp} />
        <br />
        <br />
        <div className="divider" />
        <Top />
        <br />
        <div className="divider" />
        <Main />
        <br />
        <div className="divider" />
        
        <Process />
        <div className="divider" />
        <Pageaccordion />
        <div className="divider" />
        <Contact />
        <div className="divider" />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
