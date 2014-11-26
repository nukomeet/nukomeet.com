/* debouncedresize */
(function(e){var t=e.event,n,r;n=t.special.debouncedresize={setup:function(){e(this).on("resize",n.handler);},teardown:function(){e(this).off("resize",n.handler);},handler:function(e,i){var s=this,o=arguments,u=function(){e.type="debouncedresize";t.dispatch.apply(s,o);};if(r){clearTimeout(r);}i?u():r=setTimeout(u,n.threshold);},threshold:150};})(jQuery);
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100);}; return c;}

var Nukomeet = {  window: $(window),   ready: function(){        // Replace img.svg with inline SVG    $('img.svg').each(function(){      var $img = $(this),          imgID = $img.attr('id'),          imgClass = $img.attr('class'),          imgURL = $img.attr('src');        $.get(imgURL, function(data){        var $svg = $(data).find('svg');                if (typeof imgID !== 'undefined') $svg = $svg.attr('id', imgID);        if (typeof imgClass !== 'undefined') $svg = $svg.attr('class', imgClass+' replaced-svg');                $svg = $svg.removeAttr('xmlns:a');        $img.replaceWith($svg);      }, 'xml');    });        // Page COMPANY:    if ($('.company-nav').length){      var $headerTitle = $('.header-title');      $('a[data-toggle="tab"]').on('show.bs.tab', function(e){        var html = $(this).find('.sr-only').html();        $headerTitle.html(html);      })    }  },  resize: {    init: function(){      Nukomeet.resize.windowHeight();      Nukomeet.resize.alignMiddle();    },    windowHeight: function(){        var $el = $('[data-height="window"]');      if ($el.length){        $el.height(Nukomeet.window.height());      }    },    alignMiddle: function(){      var $el = $('[data-align="middle"]');      if ($el.length){        $el.each(function(){          var $this = $(this);          if ($this.parent().height() > $this.height()){                        var newTop = ($this.parent().height() - $this.height())/2;            $this.css('top',newTop);          }        });      }    }  }};window.sr = new scrollReveal();

on_resize(function(){
  Nukomeet.resize.init();
})();

$(document).ready(function(){
	Nukomeet.ready();

  $('#search').on('change keyup', function() {
    console.log($(this));
    $('.article-item').search($(this).val());
  })
});