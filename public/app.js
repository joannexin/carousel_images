let animation = false;

const toggleForm = () => {
  $('#form').toggle();
}

const getPrevious = () => {
  if (animation) { return };
  if (($( ".img-container:last-child" ).offset().left - $( "#frame" ).offset().left) > 50) {
    animation = true;
    $( ".imgs" ).animate({ left: "-=100" }, 1000, function() {
      animation = false;
    });
  }
}

const getNext = () => {
  if (animation) { return };
  if (($( "#frame" ).offset().left - $( ".img-container:first-child" ).offset().left) > 50) {
    animation = true;
    $( ".imgs" ).animate({ left: "+=100" }, 1000, function() {
      animation = false;
    });
  }
}


$(document).ready(function() {

  $('#form').submit(function (e) {
    e.preventDefault();
    let newImage = { name: $('#name').val(), path: $('#path').val() };
    $.ajax({
      method: "POST",
      url: '/addImage',
      data: newImage,
      success: function(res) {
        console.log(res);
        $('#form').hide();
        const newWidth = ($('.imgs').width() + 100) + 'px';
        $('.imgs').css("width", newWidth);
        $('.imgs').append(`<div class='img-container'><img src="${res.path}" width="100px" height="100px" /><p>${res.name}</p></div>`);
      }
    });
  })

  $.ajax({
    method: "GET",
    url: '/getAll',
    success: function(res) {
      const newWidth = (res.length * 100) + 'px';
      $('.imgs').css("width", newWidth);
      for (var i = 0; i < res.length; i++) {
        let current = res[i];
        $('.imgs').append(`<div class='img-container'><img src="${current.path}" width="100px" height="100px" /><p>${current.name}</p></div>`);
      }
    }
  });

})
