  function init(){
    $('#submit').click(submitButtonHandler);
    
    //disable button initially (no file selected)
    $('#submit').prop('disabled', true);
    
    //when a change happends on form i.e. file selector opened
    $('#fileform').change(function() {
        //disable submit button if file input value is empty
        $('#submit').prop('disabled', $('#file-input').val().toString() == "");
    });
  }

  function submitButtonHandler (e) {
     var form = document.getElementById('fileform');
     var formData = new FormData(form);

      //prevent default form action
      e.preventDefault();
      e.stopPropagation();

      $('#loading').css("visibility","visible");

      //make the AJAX call
      $.ajax({
        url: '/filesize',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    var $data = $('#output p');

    //update the UI with the data returned from the AJAX call 
      var displayJSON = '{<br/>&nbsp;"File" : "' + jsonData.name + '",<br/>&nbsp;"Size" : "' + jsonData.size + '"<br/>}'
      $data.html(displayJSON + ($data.html() ? '<br/>' + $data.html() : ''));


    $('#output').fadeIn(1000);
    $('#loading').css("visibility","hidden");

  };

//init on document ready
$(document).ready(init);

