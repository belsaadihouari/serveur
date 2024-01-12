const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    email: { type: String, required: true },
    textmessage: {
      type: String,
      required: true,
      minlength: 10,
      maxlenght: 250,
    },
  },
  { timestamps: true }
);

// Create a model based on that schema
const contactTop = mongoose.model("contact", contactSchema);

// export the model
module.exports = contactTop;
