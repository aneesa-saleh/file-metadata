//ref: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
window.onload = function() {
  var form = document.getElementById("fileform");
  form.addEventListener('submit', function(e) {
    console.log("submitting form");

    var output = document.querySelector("#output"),
        formData = new FormData(form);

    var request = new XMLHttpRequest();
    request.open("POST", "/filesize", true);
    
    request.send(formData);
    e.preventDefault();
  }, false);
};

