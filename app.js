const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//mongoose for online server MongoDB
mongoose.connect("mongodb://localhost:27017/storeDB");

const itemSchema = new mongoose.Schema({
    category: String,
    product:[
        {
            name: String,
            desc: String,
            URLimg: String,
            price: Number,
            stock: Number,
            seller: String
        }
    ]
})

const Item = mongoose.model('Item', itemSchema);


app.get('/', (req, res) => {
    Item.find({}, (err, items)=>{
        res.render('index', {items: items})
    })
})

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/addProduct', (req, res)=>{
    res.render('productInput');
})

app.get('/categories', (req, res) =>{
    res.render('categories');
})

app.get('/category/:type', (req, res) => {
    const type = req.params.type;
    const categoriesArray = ['Herbs', 'Shrubs', 'Trees', 'Climbers', 'Creepers']
    
    if(type === categoriesArray[0]){
        Item.find({category: categoriesArray[0]}, (err, items)=>{
            res.render('index', {items: items});
        })
    }else if(type === categoriesArray[1]){
        Item.find({category: categoriesArray[1]}, (err, items)=>{
            res.render('index', {items: items});
        })
    }else if(type === categoriesArray[2]){
        Item.find({category: categoriesArray[2]}, (err, items)=>{
            res.render('index', {items: items});
        })
    }else if(type === categoriesArray[3]){
        Item.find({category: categoriesArray[3]}, (err, items)=>{
            res.render('index', {items: items});
        })
    }else if(type === categoriesArray[4]){
        Item.find({category: categoriesArray[4]}, (err, items)=>{
            res.render('index', {items: items});
        })
    }
    else{
        res.send("Ops Something Wrong");
    }
    
    
})

app.post('/addProduct', (req, res) => {
    const item = new Item({
        category: req.body.categories,
        product:[
            {
                name: req.body.productName,
                desc: req.body.productDesc,
                URLimg: req.body.productImg,
                price: req.body.productPrice,
                stock: req.body.productStock,
                seller: req.body.productSeller
            }
    ]
    });
    item.save();
    res.redirect('/');
})




app.listen(process.env.PORT ||'5000', ()=> {console.log("The server is running in port 5000")});