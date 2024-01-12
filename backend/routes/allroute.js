const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const { check } = require("express-validator");
const { verifiToken,checkIfUser,ratingcheck,pingro} = require("../middelware/middelware");


router.get("/ping", pingro);
router.get("/check", checkIfUser);
router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  controller.user_signup_post
);

router.get("/confirmation", verifiToken, controller.user_confirmemail_get);

router.post(
  "/signin",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  controller.user_signin_post
);
router.get("/signout", controller.user_signout_get);
router.get("/data", controller.user_data_get);

router.post("/rating",ratingcheck,controller.user_rating_post)

router.post(
  "/contact",
  [
    check("email", "Please provide a valid email").isEmail()],
  controller.user_contact_post
);







module.exports = router;
