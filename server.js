
// init project
var express = require('express');
var app = express();
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


// set 'public' folder to send static files
app.use(express.static('public'));

// home page
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//respond to file size query
app.post('/filesize', upload.single('file'), function (request, response, next) {
  //add commas to file size
  var size = request.file.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var name =  request.file.originalname;
  var resJSON = {
    name : request.file.originalname,
    size : size + " bytes"
  };
  console.log(resJSON);
  response.setHeader('Content-Type', 'application/json');
  response.json(resJSON);
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
