const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = model("contact", contactSchema);
