

(function ($) {

  $(".nav-item").on('mouseenter', '.nav-link', function(e) {

    $('.nav-item').removeClass('to-left-underline');
    $('.nav-item').removeClass('to-right-underline');

    var w = $(this).width();
    var x = e.offsetX;
    var direction = x<w/2 ? 'right' : 'left';
    $(this).parent().addClass('to-'+direction+'-underline');

  });

  $(".nav-item").on('mouseleave', '.nav-link', function(e) {

    $('.nav-item').removeClass('leaving-right');
    $('.nav-item').removeClass('leaving-left');

    var w = $(this).width();
    var x = e.offsetX;
    var direction = x<w/2 ? 'left' : 'right';
    $(this).parent().addClass('leaving-'+direction);

  });


}(jQuery));
