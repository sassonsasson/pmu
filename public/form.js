  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var formSchema = new Schema({ 
  email: String,
  company: String,
  subject: String,
  text: String
  });

  var Form = mongoose.model("Form", formSchema)

  module.exports = Form;