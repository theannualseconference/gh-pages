console.log('hello world');
/* globals jQuery $ scrollMonitor */


// Monkey patching jquery scroll event
(function ($) {
  var wnd = $(window);
  var lastScrollTop = wnd.scrollTop();
  var lastScrollLeft = wnd.scrollLeft();

  wnd.on("scroll", function (event) {
      var scrollTop = wnd.scrollTop();
      var scrollLeft = wnd.scrollLeft();

      event.direction = scrollTop > lastScrollTop ? 'down' :
        scrollTop < lastScrollTop ? 'up' : 
        scrollLeft > lastScrollLeft ? 'right' : 
        scrollLeft < lastScrollLeft ? 'left' : 
        undefined;


      lastScrollTop = scrollTop;
      lastScrollLeft = scrollLeft;
    });
}(jQuery));


function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn.apply(fn ,arguments);
      time = Date.now();
    }
  }
}



function loadTab(el) {
  let $el = $(el);
  let tabId = $el.attr('data-tab');
  $el
    .parents('section, article')
    .find('.active')
    .removeClass('active');
  
  console.log($el, tabId)

  $el.addClass('active');
  $(`#${tabId}`).addClass('active'); 

  return tabId;
}

function scrollTo(hash) {
  // $('html, body').animate({
  //   scrollTop: $(`#${hash}`).offset().top
  // }, 0);
}

$(function() {  
  let hash = location.hash.slice(2);
  let hashActive = $(`[data-tab='${hash}']`)[0]

  // Load a tab from hash
  if(hash && hashActive) loadTab(hashActive);
  
  // Scroll to whatever hash we're on
  if(hash && hashActive) scrollTo(hash);

  
  $('[data-tab]').click(e => {
    console.log(e)
    let id = loadTab(e.currentTarget);
    window.location.hash = '/' + id;
  })


  /* Setting up the modal */
  $('.modal').click((e) => {
    if (
      $('.modal').is(event.target) || 
      $('.close').is(event.target)
    ) $('.modal').css('display', 'none');
  })

  $('.registration-link__open').click(() => {
    $('.modal').css('display', 'block');
  })



// transform:translateY(-600px);

  /* Scroll stuff */

  $(window).scroll(throttle(function(e) {
    // console.log(e.direction);




  }, 100))

  // $('.tab-titles__speaker').scrollToFixed();

  $('.tab-titles__speaker').toArray().forEach(el => {
    var $el = $(el);
    var bottomMargin = $el.height() + 22;
    var $nextPanel = $el.parents('.panel').next();

    $el.scrollToFixed({ 
      marginTop: 22, 
      // postFixed() { $(this).addClass('top-2'); },

      limit: () => $nextPanel.offset().top - bottomMargin
    });


  })




  // $('.masonry').masonry({
  //   // options
  //   itemSelector: '.brick',
  //   columnWidth: '.brick',
  //   percentPosition: true
  // });

  // $('.cover__masonry').hide();

  // var speakerMonitors = $('.section-flex-container__speaker').parents('.panel').toArray().map(el => scrollMonitor.create(el));

  // speakerMonitors.forEach(elw => {

  //   elw.enterViewport(function() {
  //     $(elw.watchItem).find('.tab-titles__speaker')
  //       .addClass('entering')

  //     console.log('Entering')
  //   })

  //   elw.fullyEnterViewport(function() {
  //     $(elw.watchItem).find('.tab-titles__speaker')
  //       .removeClass('entering')
  //       .addClass('fixed top-2')

  //     console.log('Entered');
  //   });

  //   elw.partiallyExitViewport(function() {
  //     $(elw.watchItem).find('.tab-titles__speaker')
  //       .addClass('leaving')

  //     // elw.on('scroll', function(ee) {
  //     //   console.log('wowza', ee)
  //     // })

  //     console.log('Leaving');
  //   });

  //     elw.exitViewport(function() {
  //     $(elw.watchItem).find('.tab-titles__speaker')
  //       .removeClass('fixed')

  //     console.log('Left');
  //   });
  // });




})
