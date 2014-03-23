$(document).ready(function () {
  /* For Scroll to top */
  $('.up-arrow').click(function(event) {
    event.preventDefault();
    var liIndex = $(this).index();
    var contentPosTop = $('body').eq(liIndex).position().top;

    $('html, body').stop().animate({
      scrollTop : contentPosTop
    }, 1000);
  });

  $('form').on('submit', function (event) {
    event.preventDefault();

    var form = $(this),
        name = form.find('input[name=name]').val(),
        email = form.find('input[name=email]').val(),
        company = form.find('input[name=company]').val(),
        phone = form.find('input[name=phone]').val(),
        projectType = form.find('select[name=project_type]').val(),
        description = form.find('textarea[name=description]').val();

    var data = {
      key: 'rTubFCRldKSrxeVDK_95hA',
      message: {
        html: '' +
          '<h1>Details about the request</h1>'+
          '<div>'+
          '<p><label>Name:</label> '+ name +'</p>'+
          '<p><label>Email:</label> '+ email +'</p>'+
          '<p><label>Company:</label> '+ company +'</p>'+
          '<p><label>Phone number:</label> '+ phone +'</p>'+
          '<p><label>Project type:</label> '+ projectType +'</p>'+
          '<p><label>Description:</label> '+ description +'</p>'+
          '</div>',
        subject: '[NLS] New request',
        from_email: email,
        from_name: name,
        to: [{email: 'bonjour@nukomeet.com'}],
        important: true
      },
      async: false
    };

    $.ajax({
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: data,
      success: function (data) {
        $('#quote').addClass('done');
      }
    });
  });
});
