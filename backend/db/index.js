const mongoose = require("mongoose");
// Define mongoose schemas

const purchasedItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemNumber: { type: String }
});

const userSchema = new mongoose.Schema({
    firstName : {type : String , require : true},
    lastName : {type : String , require : true},
    email: {type : String , require : true},
    password: {type : String , require : true},
    companyName : {type : String , require : true},
    purchasedItems: [purchasedItemSchema]
  });

  
  
const itemsSchema = new mongoose.Schema({
    productName : {type : String , require : true},
    description: {type : String , require : true},
    price: {type : String , require : true},
    imageLink : {type : String },
    publishedBy : {type : String , require : true},
  });

  

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemsSchema);
  
  module.exports = {
    User,
    Item
  }