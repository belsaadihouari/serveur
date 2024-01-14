import React from "react";

import "./cardarticle.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Cardarticle = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 250,maxHeight:380 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            JS
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Houari Belsaadi"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/Unofficial_JavaScript_logo_2.svg.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests.
          
        </Typography>
      </CardContent>

    </Card>
  );
};

export default Cardarticle;
