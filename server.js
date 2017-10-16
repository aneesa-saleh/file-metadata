
// init project
var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/filesize', upload.single('file'), function (request, response, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("got a file");
  var size = request.file.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var resJSON = {
    "File name": request.file.originalname, 
    "Size": size + " bytes"
  };
  console.log(resJSON);
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  //response.redirect("https://google.com");
  response.status(200).json({status:"ok"})
});


//handle 404 (page not found)
app.get('*', function(request, response){
  response.status(404);
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
