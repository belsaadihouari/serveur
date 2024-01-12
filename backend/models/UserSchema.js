const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// define the Schema (the structure of the article)
const dataSchema = new Schema(
  {
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, default: "" },
    imgprecedente: { type: String, default: "" },
    isactive: { type: Boolean, default: false },
    rating:{type:Number,min:0,max:5,default: null },
  },
  { timestamps: true }
);

//hachage du mot de passe
//cette fonction oblige que avant chaque sauvegarde il gener un nouveau hachage
// dataSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// Create a model based on that schema
const Mydata = mongoose.model("user", dataSchema);

// export the model
module.exports = Mydata;
