const Mydata = require("../models/UserSchema");
const Mydatatoken = require("../models/tokenSchema");
const DataSchema = require("../models/DataSchema.jsx");
const contactSchema = require("../models/contactSchema.jsx");
const nodemailer = require("../nodemailer/nodemailer");
const nodemailercontact = require("../nodemailer/nodemailercontact.js");
const nodmailercontactforuser = require("../nodemailer/nodmailercontactforuser.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const user_signup_post = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ validatorError: objError.errors });
    }

    const isCurrentEmail = await Mydata.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ isCurrentEmail: "Email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const phachedpassword = await bcrypt.hash(req.body.password, salt);

    const data = new Mydata({ ...req.body, password: phachedpassword });
    await data.save();
    res.json({ id: data._id });

    const token = jwt.sign(
      { id: data._id, email: data.email },
      process.env.KEY_JWT,
      { expiresIn: "1d" }
    );

    const datatoken = new Mydatatoken({ stocktoken: token, iduser: data._id });
    await datatoken.save();

    const confirmationLink = `${
      process.env.production
        ? process.env.BASE_URLFRONTPRODU
        : process.env.BASE_URLFRONTLOCAL
    }confirmation?token=${token}`;
    nodemailer(data.email, confirmationLink);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const user_confirmemail_get = async (req, res) => {
  try {
    const reqID = req.id.iduser;
    const user = await Mydata.findOne({ _id: reqID });
    if (user) {
      user.isactive = true;
      await user.save();
      res.status(200).send("email confirmé.");
      await Mydatatoken.deleteOne({ iduser: reqID });

      return;
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la confirmation de l'email.");
  }
};

const user_signin_post = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ validatorError: objError.errors });
    }

    const verification = await Mydata.findOne({ email: req.body.email });
    if (!verification) {
      return res.json({ verification: "Incorrect username or password1" });
    }
    if (!verification.isactive) {
      return res.json({ emailconfirm: "Please confirm your email" });
    }

    const match = await bcrypt.compare(
      req.body.password,
      verification.password
    );
    if (match) {
      const token = jwt.sign({ id: verification._id }, process.env.KEY_TOKEN, {
        expiresIn: "12h",
      });
      // res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000,secure: true,sameSite: 'None' }); //secure: true, sameSite: 'strict' ajouter ces deux code au cookie
      res.json({
        id: verification._id,
        rating: verification.rating,
        email: verification.email,
        token,
      });
    } else {
      return res.json({ verification: "Incorrect username or password2" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const user_signout_get = async (req, res) => {
  try {
    res.cookie("jwt", "", { expires: new Date(0) }); // Définir la date d'expiration sur une date passée
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};

const user_data_get = async (req, res) => {
  try {
    const user = await DataSchema.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const user_rating_post = async (req, res) => {
  try {
    const reqID = req.id.iduser;
    const user = await Mydata.findOne({ _id: reqID });
    console.log("---------")
    console.log(user)
    if (user) {
      user.rating = req.id.newrating;
      console.log("************")
      console.log(req.id.newrating)
      await user.save();
      res.status(200).send("rating confirmé.");
      return;
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la rating de l'email.");
  }
};

const user_contact_post = async (req, res) => {
  try {
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({ validatorError: objError.errors });
    }
    if (req.body.textmessage.length < 10 || req.body.textmessage.length > 250) {
      return res.json({ validatorErrormessage: "error message lenght" });
    }
    const data = new contactSchema({
      email: req.body.email,
      textmessage: req.body.textmessage,
    });
    await data.save();
    nodemailercontact(data.email, data.textmessage);
    nodmailercontactforuser(data.email);
    res.status(200).json({ success: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  user_signup_post,
  user_confirmemail_get,
  user_signin_post,
  user_signout_get,
  user_data_get,
  user_rating_post,
  user_contact_post,
};
