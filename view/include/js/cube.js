var precube = (function() {
  init = function() {
    var
      fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() { return false; },
        requestFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;

                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }

    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {

            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
  
    /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
    **/
    (function(a){jQuery.browser.mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

    if (Modernizr.csstransforms3d && !jQuery.browser.mobile) {
      if (fullScreenApi.supportsFullScreen && !((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height))) {
        var first_resize = false;
        $('#CubeStart').show();
        $('#CubeStart').find('a').click(function(e) {
          e.preventDefault();
          first_resize = true;
          $('#CubeStart').hide();
          cube.init();
          fullScreenApi.requestFullScreen(document.getElementById('fullscreen'));
        });
        if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) first_resize = true;
        $(window).resize(function() {
          if (!first_resize && ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height))) { 
            first_resize = true;
            $('#CubeStart').hide();
            cube.init();
          }
        });
      } else 
        cube.init();
    // EasyCube
    } else {
      var
        $obj = $('#EasyMain'),
        path_photo = base_url + 'view/images/',
        gallery = {
          page: 0,
          photo: ''
        },
        name_gallery = '',
        $loading =  $('<div></div>').addClass('EasyCubeLoading').activity({segments: 8, steps: 3, opacity: 0.3, width: 3, space: 0, length: 5, color: '#fff', speed: 1.5})


      get_photo = function(name) {
        window.location.hash = 'photo=' + name;
        $('.jThumbnailScroller').find('.jTscrollerContainer').remove();
        $('.jThumbnailScroller').prepend('<div class=\'jTscrollerContainer\'><div class=\'jTscroller\'></div></div>');
        $obj.hide();
        $('#BGLoading').show();
        $('#BG').find('.jTscroller').empty().append(
          $('<img />')
          .error(function() {
            $('#BGLoading').hide();
            $obj.show();
          })
          .load(function() {
            $('#BG').find('.BGNoScroll').empty().append(
              $('<img />')
              .load(function() {
                $('#BG').show().thumbnailScroller({scrollerOrientation: 'vertical'});
                $('#BGLoading').hide();
              })
              .attr('src', path_photo + name + '/0/' + (($(document).height() < $(window).height()) ? $(document).height() : $(window).height()) + '/')
            );
          })
          .attr('src', path_photo + name + '/' + $(document).width() + '/')
        );
      },

      get_gallery = function(id_gallery) {
        name_gallery = id_gallery;

        $('#EasyMainPhoto').animate({
          height: ['toggle', 'swing'],
          opacity: 'toggle'
        }, 500);

        $.ajax({
          type: 'POST',
          url: base_url + 'ajax/get_list_photo/',
          data: {'gallery_id': id_gallery},
          dataType: 'json',
          success: function(data) {
            gallery.page = 0;
            gallery.photo = data;
            $('#EasyMainPhoto').empty();
            for (i in data) {
              $('#EasyMainPhoto').append(
                $('<li />').append(
                  $('<a />')
                    .append($('<img />').attr('src', path_photo + data[i] + '/90/90/').data('pic', data[i]))
                    .append($loading.clone().append($('<p>терпение</p>')))
                  .attr('href', '#photo='+data[i])
                )
              );
            }
            $('#EasyMainPhoto').animate({
              height: ['toggle', 'swing'],
              opacity: 'toggle'
            }, 500);
          },
          error: function() {
            alert('error');
          }
        });
      }

      $('body').css({'overflow-y': 'auto', 'overflow-x': 'hidden'});
      $obj.show();
      // animated
      $('#BGLoading').activity({segments: 3, steps: 3, opacity: 0.3, width: 15, space: 4, length: 10, color: '#fff', speed: 1.5});
      // action
      $('#EasyMainGalleryList li a').live('click', function(e) {
        get_gallery($(this).data('id_gallery'));
        move_on_main();
      });
      $('#EasyMainPhoto li a').live('click', function(e) {
        get_photo($(this).find('img').data('pic'));
      });
      $('.BGButtonZoom').live('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('BGButtonZoomFull')) {
          $(this).removeClass('BGButtonZoomFull').addClass('BGButtonZoomNoFull');
          $('.jTscrollerContainer').hide();
          $('.BGNoScroll').stop().animate({opacity: 'toggle'}, 2000).show();
        } else {
          $(this).removeClass('BGButtonZoomNoFull').addClass('BGButtonZoomFull');
          $('.jTscrollerContainer').stop().animate({opacity: 'toggle'}, 2000).show();
          $('.BGNoScroll').hide();
        }
      });
      $('.BGFilter').live('click', function(e) {
        e.preventDefault();
        window.location.hash = (name_gallery != '') ? 'gallery='+name_gallery : '';
        $('#BG').hide();
        $obj.show();
        $('.BGButtonZoom').removeClass('BGButtonZoomNoFull').addClass('BGButtonZoomFull');
        $('.jTscrollerContainer').stop().show();
        $('.BGNoScroll').stop().hide();
      });
      // Strat
      (function() {
        if ($.url().fparam('photo') != undefined && $.url().fparam('photo') != '') {
          get_photo($.url().fparam('photo'));
          get_gallery($('#ListGallerys li a:first').data('id_gallery'));
          return;
        }
        if ($.url().fparam('gallery') != undefined && $.url().fparam('gallery') != '')
          if ($('#ListGallerys li a[data-id_gallery=' + $.url().fparam('gallery') + ']') != undefined) {
            get_gallery($.url().fparam('gallery'));
            return;
          }
        get_gallery($('#EasyMainGalleryList li a:first').data('id_gallery'));
      }());
    }
  }
  return { init : init };
})();

var cube = (function() {
  var
    hard = false,
    path_photo = base_url + 'view/images/',
    $cube = $('#AreaCube'),
    el = $('<div></div>'),
    transformProps = '-ms-transform -moz-transform -webkit-transform -khtml-transform -o-transform transform'.split(' '),
    transformProp = (function() {
      for(var i = 0, l = transformProps.length; i < l; ++i)
        if(el.css(transformProps[i]) !== undefined) return transformProps[i];
    })(),
    nextpageactive = false,
    nextgalleryactive = false,
    position_cursor = {
      x: 0,
      y: 0
    },
    angle = {
      x: 0,
      y: 0
    },
    settings_animated  = {
      maxScale  : 1.7,
      minScale: 1,
      maxOpacity  : 1,
      minOpacity  : 0.4
    },
    gallery = {
      inew: true,
      page: 0,
      photo: []
    },
    $replace_box = $('<div></div>')
                     .addClass('BoxTransitionCard')
                     .append($('<div></div>').addClass('BoxTransitionCardFront'))
                     .append($('<div></div>').addClass('BoxTransitionCardBack')),
    $loading =  $('<div></div>').addClass('ListPhoto3DButtonLoad').activity({segments: 8, steps: 3, opacity: 0.3, width: 3, space: 0, length: 5, color: '#fff', speed: 1.5}),
    name_gallery = '',
    timerslideshow = false,
    timerslideshowactive = false;

  init = function() {
    if ($.browser.chrome) hard = true;

    $('body').css({'overflow': 'hidden'});
    $('#Main').show();

    $(window).resize(function() {
      resize();
    });
    resize();

    $('#BGLoading').activity({segments: 3, steps: 3, opacity: 0.3, width: 15, space: 4, length: 10, color: '#fff', speed: 1.5});

    $(document).mousemove(
      function (e) {
        position_cursor.x = e.pageX ;
        position_cursor.y = e.pageY ;
        return true;
      }
    );

    setInterval(function () {
      vibration_x_deg = 40;
      vibration_y_deg = 10;
      pos_x = -1 * ( ( ( (position_cursor.y / $(window).height()) - 0.5 ) * vibration_y_deg ) + angle.y );
      pos_y = ( ( (position_cursor.x / $(window).width()) - 0.5 ) * vibration_x_deg ) + angle.x;
      $cube.css(transformProp, 'rotateX(' + pos_x + 'deg) rotateY(' + pos_y + 'deg)')
    }, 200);

    $('.MoveOnMain').click(function(e) {
      e.preventDefault();
      move_on_main();
    });

    $('#MoveOnAlbum').click(function(e) {
      e.preventDefault();
      //if (nextgalleryactive) return;
      move_on_album();
    });

    $('#MoveOnAbout').click(function(e) {
      e.preventDefault();
      move_on_about();
    });

    $('#NextPage').live('click', function(e) {
      e.preventDefault();
      if (!nextpageactive) next_page();
    });

    $('#ListGallerys li a').live('click', function(e) {
      e.preventDefault();
      //if (!nextgalleryactive) 
      get_gallery($(this).data('id_gallery'));
      move_on_main();
    });

    $('.ListPhoto3D li:not(.ListPhoto3DButton) a').live('click', function(e) {
      e.preventDefault();
      get_photo($(this).find('img').data('pic'));
    });

    $('.BGButtonZoom').live('click', function(e) {
      e.preventDefault();
      if ($(this).hasClass('BGButtonZoomFull')) {
        $(this).removeClass('BGButtonZoomFull').addClass('BGButtonZoomNoFull');
        $('.jTscrollerContainer').hide();
        $('.BGNoScroll').stop().animate({opacity: 'toggle'}, 2000).show();
      } else {
        $(this).removeClass('BGButtonZoomNoFull').addClass('BGButtonZoomFull');
        $('.jTscrollerContainer').stop().animate({opacity: 'toggle'}, 2000).show();
        $('.BGNoScroll').hide();
      }
    });

    $('.BGFilter').live('click', function(e) {
      e.preventDefault();
      window.location.hash = (name_gallery != '') ? 'gallery='+name_gallery : '';
      $('#BG').hide();
      $('#Main').show();

      $('.BGButtonZoom').removeClass('BGButtonZoomNoFull').addClass('BGButtonZoomFull');
      $('.jTscrollerContainer').stop().show();
      $('.BGNoScroll').stop().hide();
    });

    $('.ListPhoto3D li:not(.ListPhoto3DButton)').each(function() {
      $(this)
        .append(
          $('<a href=\'#\'></a>').data('minTranslate', Math.floor(Math.random( ) * (101))*-1).addClass('invisible')
        );
    });
    
    /* New Buttons */
    $('.BGPrev, .BGNext').on('proximity.Buttons', { max: 300, throttle: 100, fireOutOfBounds : true }, function( event, proximity, distance ) {
      $(this).css({'opacity': ( proximity * 0.6 )});
    });
    $('.BGPrev').click(function(e) {
      e.preventDefault();  
      $('.BGFilter').click();
      if ($.inArray($('.jThumbnailScroller').data('pic'), gallery.photo) > 0)     
        get_photo( gallery.photo[$.inArray($('.jThumbnailScroller').data('pic'), gallery.photo) - 1] ); 
      else 
        get_photo( gallery.photo[gallery.photo.length - 1] ); 
    });
    $('.BGNext').click(function(e) {
      e.preventDefault();  
      $('.BGFilter').click();
      if ($.inArray($('.jThumbnailScroller').data('pic'), gallery.photo) < gallery.photo.length - 1 || $.inArray($('.jThumbnailScroller').data('pic'), gallery.photo) < 0)     
        get_photo( gallery.photo[$.inArray($('.jThumbnailScroller').data('pic'), gallery.photo) + 1] ); 
      else 
        get_photo( gallery.photo[0] ); 
    });
    $('.BGButtonPlay').show().click(function(e) {
      e.preventDefault();
      if ($(this).hasClass('BGButtonPlayStop')) {
        $(this).removeClass('BGButtonPlayStop'); 
        timerslideshow = false;
      } else {
        $(this).addClass('BGButtonPlayStop');
        timerslideshow = true;
        $('.BGNext').click();
      }
    });
    /* New Buttons End*/

    ///// Hard test
    if (hard)
      setInterval(function () {
        $('.ListPhoto3D li:not(.ListPhoto3DButton)').each(function() {
          max = 10;
          min = -10;
          var rand = Math.floor((max - min + 1) * Math.random() + min);
          translate = $(this).find('a').data('minTranslate');
          if (translate - rand > 0) rand = rand * -1;
          else if (translate - rand < -100) rand = rand * -1;
          $(this).find('a').data('minTranslate',  translate - rand);

          if ($(this).find('a').find('.ListPhoto3DItem').data('translateval') != undefined) {
            $el = $(this).find('a').find('.ListPhoto3DItem');
            scaleVal = $el.data('scaleval');
            translateVal = $el.data('translateval') - rand;
            $el.data('translateval', translateVal);
            css = {};
            css[transformProp] = 'scale(' + scaleVal + ') translateZ(' + translateVal + 'px)';
            $el.css(css);
          }

        });
      }, 200);
    ///// Hard test end


    $('.ListPhoto3D li.ListPhoto3DButton a').each(function() {
      $(this).data('minTranslate', Math.floor(Math.random( ) * (101))*-1)
    });

    $('#CubeAlbum').sbscroller();
    $('#CubeAbout').sbscroller();

    // Strat
    (function() {
      if ($.url().fparam('photo') != undefined && $.url().fparam('photo') != '') {
        get_photo($.url().fparam('photo'));
        get_gallery($('#ListGallerys li a:first').data('id_gallery'));
        $('.BGButtonPlay, .BGPrev, .BGNext').hide();
        return;
      }
      if ($.url().fparam('gallery') != undefined && $.url().fparam('gallery') != '')
        if ($('#ListGallerys li a[data-id_gallery=' + $.url().fparam('gallery') + ']') != undefined) {
          get_gallery($.url().fparam('gallery'));
          return;
        }
      if ($.url().data.attr.fragment == 'about') move_on_about();
      if ($.url().data.attr.fragment == 'album') move_on_album();
      get_gallery($('#ListGallerys li a:first').data('id_gallery'));
    }());
  },

  get_photo = function(name) {
    $('.BGButtonPlay, .BGPrev, .BGNext').show();
    window.location.hash = 'photo=' + name;
    $('.jThumbnailScroller').find('.jTscrollerContainer').remove();
    $('.jThumbnailScroller').prepend('<div class=\'jTscrollerContainer\'><div class=\'jTscroller\'></div></div>').data('pic', name);
    $('#Main').hide();
    $('#BGLoading').show();
    $('#BG').find('.jTscroller').empty().append(
      $('<img />')
      .error(function() {
        $('#BGLoading').hide();
        $('#Main').show();
      })
      .load(function() {
        $('#BG').find('.BGNoScroll').empty().append(
          $('<img />')
          .load(function() {
            $('#BG').show().thumbnailScroller({scrollerOrientation: 'vertical'});
            $('#BGLoading').hide();
            if (timerslideshow) {
              $('.BGButtonZoom').click();
              if (!timerslideshowactive) {
                timerslideshowactive = true;
                setTimeout(function() {
                  if (timerslideshow && $('#BG').is(':visible')) $('.BGNext').click();
                  timerslideshowactive = false;
                }, 5000);
              }
            }
          })
          .attr('src', path_photo + name + '/0/' + (($(document).height() < $(window).height()) ? $(document).height() : $(window).height()) + '/')
        );
      })
      .attr('src', path_photo + name + '/' + $(document).width() + '/')
    );
  },

  resize = function() {
    css = {};
    scale = (Math.min($(window).height(), $(document).height(), $(window).width(), $(document).width())/9/100).toFixed(2);
    css[transformProp] = 'scale(' + scale + ', ' + scale + ')';
    $('#Main').css(css);
  },

  definition = function(props) {
    for(var i = 0, l = props.length; i < l; ++i)
      if(el.css(props[i]) !== undefined) return props[i];
  },

  move_on_main = function() {
    $('#CubeAbout').animate({opacity: 0.1}, 300);
    $('#CubeAlbum').animate({opacity: 0.1}, 300);
    window.location.hash = (name_gallery != '') ? 'gallery='+name_gallery : '';
    angle.x = 0;
    angle.y = 0;
  },

  move_on_album = function() {
    $('#CubeAbout').animate({opacity: 0.1}, 300);
    $('#CubeAlbum').animate({opacity: 1}, 300);
    window.location.hash = 'album';
    angle.x = -90;
    angle.y = 0;
  },

  move_on_about = function() {
    $('#CubeAbout').animate({opacity: 0.7}, 300);
    $('#CubeAlbum').animate({opacity: 0.1}, 300);
    window.location.hash = 'about';
    angle.x = 90;
    angle.y = 0;
  },


  get_gallery = function(id_gallery) {
    name_gallery = id_gallery;
    nextgalleryactive = true;
    //
    //$cube.$('#MoveOnAlbum').find('.CubeZoom').hide();
    //$('#MoveOnAlbum').append($loading);
    //
    $.ajax({
      type: 'POST',
      url: base_url + 'ajax/get_list_photo/',
      data: {'gallery_id': id_gallery},
      dataType: 'json',
      success: function(data) {
        gallery.page = 0;
        gallery.photo = data; 
        if (gallery.photo.length <= 34) {  
          if ($('.ListPhoto3D li:nth-child(35)').hasClass('ListPhoto3DButton')) 
            $('.ListPhoto3D li:nth-child(35)')
              .removeClass()
              .empty()
              .append($('<a href=\'#\'></a>').data('minTranslate', Math.floor(Math.random( ) * (101))*-1));
        } else
          $('.ListPhoto3D li:nth-child(35)')
            .removeClass()
            .addClass('ListPhoto3DButton')
            .empty()
            .append(
              $('<a href=\'#\' id=\'NextPage\'><p class=\'CubeZoom\'>далее</p></a>')
                .data('minTranslate', Math.floor(Math.random( ) * (101))*-1)
            );
        next_page();
      },
      error: function() {
        alert('error');
      }
    });
  }


  handle_next_page_animated = function(n_el, i, _that, _new_replace_box) {
    var
      that = _that,
      $new_replace_box = _new_replace_box,
      start_next = false;

      $new_replace_box.animate(
        {borderSpacing: 180},
        {
          step: function(now, fx) {
            _css = {};
            _css[transformProp] = 'rotateX(' + now + 'deg) rotateY(' + now + 'deg) translateZ(' + $(this).parent().data('minTranslate') + 'px)';
            $(this).css(_css);
            $(this).find('.BoxTransitionCardBack').css({'opacity': (1/180)*now});
            $(this).find('.BoxTransitionCardFront').css({'opacity': 1-((1/180)*now)});

            if (now > 60 && !start_next) {
              start_next = true;
              handle_next_page(++n_el, ++i);
            }
          },
          duration: 1000,
          complete: function() {
            $(this).closest('a').append(
              $(this).find('.BoxTransitionCardBack').find('img')
                .removeClass()
                .addClass('ListPhoto3DItem')
                .css(_css)
                .data('scaleval', 1)
                .data('translateval', $(this).closest('a').data('minTranslate'))
            )
            .find('img:not(:last)').remove();
            $new_replace_box.remove();
            on_animated();
          }
        });
  }

  handle_next_page = function(n_el, i) {
    $list = $('.ListPhoto3D').find('li:not(.ListPhoto3DButton)');
    if ($('.ListPhoto3D li:nth-child(35)').hasClass('ListPhoto3DButton')) $('.ListPhoto3D li:nth-child(35) #NextPage p').text('далее');
    
    if (n_el+1 > $list.length ) {
      ++gallery.page;
      nextpageactive = false;
      nextgalleryactive = false;
      $('#NextPage').css({'visibility': 'visible'});
      //
      //$('#MoveOnAlbum').find('.CubeZoom').show();
      //$loading.detach();
      //
      if ($list.length * gallery.page > gallery.photo.length) {
        gallery.page = 0;
        if ($('.ListPhoto3D li:nth-child(35)').hasClass('ListPhoto3DButton')) $('.ListPhoto3D li:nth-child(35) #NextPage p').text('в начало');
      }
      return
    };

    var $_el = $($list[n_el]).find('a');

    if (gallery.photo.length > i) {
      $('<img />').load(function () {
        var
          that = this,
          $new_replace_box = $replace_box.clone(),
          _css = {};

        $new_replace_box.data('number_i', i);
        _css['opacity'] = $_el.find('.ListPhoto3DItem').css('opacity');
        _css[transformProp] = 'translateZ(' + $_el.find('.ListPhoto3DItem').parent().data('minTranslate') + 'px)';
        $new_replace_box.css(_css);

        if ($_el.find('.ListPhoto3DItem').attr('src') != undefined) {
          $new_replace_box.find('.BoxTransitionCardFront').append(
            $('<img />').load(function () {
              $new_replace_box.find('.BoxTransitionCardBack').append($(that));
              $_el.removeClass('invisible').append($new_replace_box);

              handle_next_page_animated(n_el, i, that, $new_replace_box);
              $_el.find('.ListPhoto3DItem').hide().remove();
            }).attr('src', $_el.find('.ListPhoto3DItem').attr('src'))
          );
        } else {
          $new_replace_box.find('.BoxTransitionCardBack').append($(that));
          $_el.removeClass('invisible').append($new_replace_box);
          handle_next_page_animated(n_el, i, that, $new_replace_box);
        }
      })
      .data('pic', gallery.photo[i])
      .attr('src', path_photo + gallery.photo[i] + '/100/100/');
    } else {
      if ($_el.find('.ListPhoto3DItem').length != 0) {
        $_el.find('.ListPhoto3DItem').fadeOut(100, function () {
          $(this).parent().addClass('invisible');
          $(this).remove();
          handle_next_page(++n_el, ++i);
        });
      }
      else handle_next_page(++n_el, ++i);

    }
  }

  next_page = function() {
    nextpageactive = true;
    $('#NextPage').css({'visibility': 'hidden'}); 
    i = $('.ListPhoto3D').find('li:not(.ListPhoto3DButton)').length * gallery.page;
    handle_next_page(0, i);
  }

  clear_area = function () {
    $('.ListPhoto3D li:not(.ListPhoto3DButton)').find('a').empty();
  }

  on_animated = function() {
    var
      $elems = $('.ListPhoto3D').find('.ListPhoto3DItem:not(.ProximityY), .CubeZoom:not(.ProximityY)');

    $elems.each(function() {
      _css = {};
      _css[transformProp] = 'translateZ(' + $(this).parent().data('minTranslate') + 'px)';
      $(this).css(_css);
    });

    $elems.on('proximity.Photo', { max: 70, throttle: 100, fireOutOfBounds : true }, function( event, proximity, distance ) {
      var
        $el = $(this),
        $li = $el.closest('li'),
        scaleVal  = proximity * ( settings_animated.maxScale - settings_animated.minScale ) + settings_animated.minScale,
        translateVal  = proximity * ( 100 - $el.parent().data('minTranslate') ) + $el.parent().data('minTranslate');

      //( scaleVal === settings_animated.maxScale ) ? $li.css( 'z-index', 1000 ) : $li.css( 'z-index', 20 );
      $li.css( 'z-index', Math.round(1000 * proximity) + 20 );
      _obj = {};
      _obj[transformProp] = 'scale(' + scaleVal + ') translateZ(' + translateVal + 'px)';
      _obj['opacity'] = ( proximity * ( settings_animated.maxOpacity - settings_animated.minOpacity ) + settings_animated.minOpacity );
      $el.css(_obj);
      $el.data('scaleval', scaleVal);
      $el.data('translateval', translateVal);
    })
    .addClass('ProximityY');
  };

  off_animated = function() {
    $('.ListPhoto3D').find('.ListPhoto3DItem, .CubeZoom').off('.Photo').removeClass('ProximityY');
  }

  return { init : init };
})();