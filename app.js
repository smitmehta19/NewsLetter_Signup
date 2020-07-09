const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));  //used to add contents in static page-public folder use karneka
app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName  = req.body.fNAME;
    const lastName  = req.body.lNAME;
    const email  = req.body.email;

    var data = {
        members : [
        {
            email_address: email,
            status: "subscribed",
            merge_feilds:{
                FNAME: firstName,
                LNAME: lastName
            }

        }

        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/449aec5ca8"

    const option = {
        method: "POST",
        auth: "wolf:a0831c8934f3de0ebbb6aebc15b3f141a-us10"
    }

    const request = https.request(url, option,  function(response) {

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");

        }else{
            res.sendFile(__dirname + "/failure.html");
        }





        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        
    })

    request.write(jsonData);
    request.end();


});

app.post("/failure", function(req, res){
    res.redirect("/")
})







app.listen(process.env.PORT || 3000, function(req,res){
    console.log("port is running at 3000")
});




//0831c8934f3de0ebbb6aebc15b3f141a-us10
//449aec5ca8