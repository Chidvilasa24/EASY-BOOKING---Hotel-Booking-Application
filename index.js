var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var nodemailer = require('nodemailer');
const app = express()
require("dotenv").config();
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/myhotelsdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/add_booking",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var city = req.body.city;
    var hotelName = req.body.selectHotel;
    var roomType = req.body.roomType;
    var roomNo = req.body.selectRoom;
    var checkin = req.body.indate;
    var checkout = req.body.outdate;
    var noOfDays = req.body.noDays;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "city": city,
        "hotelName": hotelName,
        "roomType": roomType,
        "roomNo": roomNo,
        "checkin": checkin,
        "checkout": checkout,
        "noOfDays": noOfDays 
    }

    db.collection('bookings').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        
    });

    res.send('<p>Booking successful</p><br><p>Name: '+name+'</p><p>Hotel Name: '+hotelName+'</p><p>Room Number: '+roomNo+'</p><p>Room Type: '+roomType+'</p><p>Check-in Date:'+checkin+'</p><p>Check-out Date: '+checkout+'</p>');
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");