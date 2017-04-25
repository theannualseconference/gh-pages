console.log('hello world')
/* globals $ */

function loadTab(el) {
  let $el = $(el);
  let tabId = $el.attr('data-tab');
  $el
    .parents('section')
    .find('.active')
    .removeClass('active');
  
  console.log($el, tabId)

  $el.addClass('active');
  $(`#${tabId}`).addClass('active'); 

  return tabId;
}

function scrollTo(hash) {
  $('html, body').animate({
    scrollTop: $(`#${hash}`).offset().top
  }, 0);
}

$(document).ready(function() {  
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

})
