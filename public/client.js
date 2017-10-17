  function init(){
    $('#submit').click(submitButtonHandler);
  }

  function submitButtonHandler (e) {
     var form = document.getElementById('fileform');

      //prevent form submission
      e.preventDefault();
      e.stopPropagation();

      $('#output p').fadeOut();
      //$('#output').css('display', 'inline-block');

      var formData = new FormData(form);
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
    $.each(jsonData, function (key, val) {
      $data.text(JSON.stringify(jsonData));
    });

    $('#output').fadeIn();
    $data.fadeIn();

  };

//init on document ready
$(document).ready(init);

