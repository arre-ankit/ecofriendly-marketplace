const express = require('express');
const { User, Item } = require("../db");
const router = express.Router();
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');
const { authenticateJwt } = require('../middleware/auth.js');

//Signup User
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, companyName} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ firstName, lastName, email, password, companyName});
      await newUser.save();
      const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });

  //Login User
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ user : user.email}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid email or password' });
    }
  });


  //Add Items
  router.post('/addItems', authenticateJwt, async (req, res) => {
    try {
      const item = new Item(req.body);
      await item.save();
      res.json({ 
        message: 'Item created successfully',
        item : item,});
  } catch (error) {
      res.json({message : error.message});
  }
  });


  //Purchase Items
  router.post('/purchaseItem/:itemId', authenticateJwt, async (req, res) => {
    const { itemNumber } = req.body;
    const item = await Item.findById(req.params.itemId);
    console.log(item);
    if (item) {
      const user = await User.findOne({ email: req.body.publishedBy });
      if (user) {
        user.purchasedItems.push({ item: item._id ,  itemNumber });
        await user.save();
        res.json({ message: 'Item purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });


  //Update ItemsInformation
  router.put('/items/:itemId', authenticateJwt, async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
    if (item) {
      res.json({ message: 'Item updated successfully' , item});
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });


  //Get your Items
  router.get('/yourItems',authenticateJwt,async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, SECRET , async (err,decode)=>{
        try {
            let data = await Item.find({publishedBy:decode.user});
            res.status(200).json({
                message : "Success",
                data : data,
            })
        } catch (error) {
            res.json({message : error.message})
        }
    })
  });


  //Get all Items
  router.get('/items', authenticateJwt, async (req, res) => {
    const item = await Item.find({});
    res.json({ item });
  });


  //Delete Item
  router.delete('/items/:itemId' , authenticateJwt , async (req,res)=>{
    try {
        await Item.findByIdAndDelete(req.params.itemId);
        res.json({message : "Item Deleted"});
    } catch (error) {
        res.json({message : error.message})
    }
})

  module.exports = router