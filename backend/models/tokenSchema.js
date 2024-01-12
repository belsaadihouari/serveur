const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    stocktoken: { type: String, required: true },
    iduser:{ type: String, required: true }
  },
  { timestamps: true }
);

// Create a model based on that schema
const Mydatatoken = mongoose.model("token", tokenSchema);

// export the model
module.exports = Mydatatoken;
