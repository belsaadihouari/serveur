const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    title:{type:String,required:true},
    url:{type:String,default:""},
    git:{type:String,required:true},
    genre:{type:String,required:true},
    src:{type:String,default:""},
  },
  { timestamps: true }
);

// Create a model based on that schema
const MydataTop = mongoose.model("data", DataSchema);

// export the model
module.exports = MydataTop;
