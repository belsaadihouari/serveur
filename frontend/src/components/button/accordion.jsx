import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={10} square {...props} />
))(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "var(--blue)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "var(--ess2)" : "var(--ess2)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid var(--blue)",
}));
const CustomizedAccordions = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="divaccordion" >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ color: "var(--h1)" }}>Front-End</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span className="spanaccor">Languages:</span> HTML, CSS, JavaScript.
            <span className="spanaccor">Framework:</span> React js.
            <span className="spanaccor">Libraries:</span> helmet,i18next,
            router-dom,confetti,axios,material UI,framer-motion.
            <span className="spanaccor">Build Tools:</span> vite.
            <span className="spanaccor">Dependency Manager:</span> npm.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ color: "var(--h1)" }}>Back-End</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span className="spanaccor">Languages:</span> Node.js.
            <span className="spanaccor">Framework:</span> Express.js.
            <span className="spanaccor">Database:</span> MongoDB.
            <span className="spanaccor">API:</span> RESTful.
            <span className="spanaccor">Hosting:</span> AWS.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ color: "var(--h1)" }}>Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <span className="spanaccor">Protocols:</span>  HTTPS.
          <span className="spanaccor">Access Management:</span>  JWT
          <span className="spanaccor">Protection Against Attacks:</span> Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF)
          <span className="spanaccor">SSL/TLS Certificates:</span>  Lets Encrypt.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel4d-header">
          <Typography sx={{ color: "var(--h1)" }}>Others</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <span className="spanaccor">Version Control:</span>  Git,Github.
          <span className="spanaccor">Performance Analysis:</span> Google Lighthouse.
          <span className="spanaccor">Code Quality:</span> ESLint, Prettier.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomizedAccordions;
