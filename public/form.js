  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var formSchema = new Schema({ 
  name: String,
  nick: String,
  password: String,
  pushUp: Number
  });

  var Form = mongoose.model("Form", formSchema)

  // Form.findOneAndUpdate({"nick": "lemon"}, {$inc:{"pushUp":3}}, {new: true}, function(err, doc){
  //     if(err){
  //         console.log("Something wrong when updating data!");
  //     }

  //     console.log(doc);
  // });

  module.exports = Form;