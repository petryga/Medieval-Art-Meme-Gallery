// namespace
const myApp = {}
// variable to store chosen art array
let selectedArray;
// endpoints
myApp.imageUrl = `https://openaccess-api.clevelandart.org/api/artworks/`;
myApp.jokesUrl = `https://icanhazdadjoke.com/search`;
// empty arrays to hold ajax returns
myApp.imagesPortraitsArray = [];
myApp.imagesWomanArray = [];
myApp.imagesAnimalArray = [];
myApp.jokesArray = [];
myApp.limit = 30; //current limit of jokes on the API
myApp.counter = 0; // current iteration of loop
myApp.increment = 5; // number of appends to run when user reaches bottom of screen
// ajax calls
myApp.getPortraitImages = function () {
  return $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'portrait',
      has_image: 1,
      type: 'Painting',
    }
  })
  // push return to array variable called above
    .then(function (returnObject) {
      for (let i = 0; i < myApp.limit; i++) {
        myApp.imagesPortraitsArray.push(returnObject.data[i].images.web.url);
      }
    })
    .fail(function () {
      alert('Sorry no images, BYE')
    })
}
myApp.getWomanImages = function () {
  return $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'woman',
      has_image: 1,
      type: 'Painting',
    }
  })
    .then(function (returnObject) {
      for (let i = 0; i < myApp.limit; i++) {
        myApp.imagesWomanArray.push(returnObject.data[i].images.web.url);
      }
    })
    .fail(function () {
      alert('Sorry no images, BYE')
    })
}
myApp.getAnimalImages = function () {
  return $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'animal',
      has_image: 1,
      type: 'Painting',
    }
  }).then(function (returnObject) {
    for (let i = 0; i < myApp.limit; i++) {
      myApp.imagesAnimalArray.push(returnObject.data[i].images.web.url);
    }
  })
  .fail(function () {
    alert('Sorry no images, BYE')
  })
}
myApp.getJokes = function () {
  return $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      limit: 30,
      headers: { 'Accept': 'application/JSON' }
    }
  })
    .then(function (returnObject) {
      for (let i = 0; i < returnObject.results.length; i++) {
        myApp.jokesArray.push(returnObject.results[i].joke);
      }
    })
    .fail(function () {
      alert('Sorry no jokes, BYE')
    })
}
// event listener finds the value of select. 
// this works in conjunction with a loop in the myApp.appendContent function. 
// this function assigns the user selected value to the selectedArray variable, and passes selectedArray to the append and scroll functions along with the joke array
// this function also clears the div where content is appended
myApp.dropDownEventListener = function () {
  $('#drop-down').on('change', function () {
    myApp.counter = 0;
    myApp.increment = 5;
    $('.append-to-here').empty();
    if ($(this).val() == 'portrait') {
      selectedArray = myApp.imagesPortraitsArray;
    } else if ($(this).val() == 'woman') {
      selectedArray = myApp.imagesWomanArray;
    } else if ($(this).val() == 'animal') {
      selectedArray = myApp.imagesAnimalArray;
    }
    myApp.appendContent(selectedArray, myApp.jokesArray);
    myApp.scrollFunction(selectedArray, myApp.jokesArray);
  })
}
// create a variable that stores the material to be appended that can be looped over
// append div, change background image to the image url in the image array, and add to the counter. Do while loop
myApp.appendContent = function (chosenArray, jokesArray) {
  do {
    let imageJokeBox = `
    <div class = "image-joke-box image-joke-box${myApp.counter} flex">
      <p>${jokesArray[myApp.counter]}</p>
    </div>
    `;
    $('.append-to-here').append(imageJokeBox);
    $(`.image-joke-box${myApp.counter}`).css('background-image', `url('${chosenArray[myApp.counter]}')`);
    myApp.counter++;
  }
  while (myApp.counter < myApp.increment);
  myApp.scrollFunction(chosenArray, jokesArray);
}
// takes the value of the document and compares it against scroll to top and window height. there is sometimes a small discrepancy of 1-3 pixels, so we factor that into the conditional
// since the joke API only returns 30, we set that as the limit and use that variable here so that the loop does not break
myApp.scrollFunction = function (imageArray, jokeArray) {
  $(window).on('scroll', function () {
    if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - 3)) {
      if (myApp.counter < myApp.limit) {
        myApp.increment + 5;
        myApp.appendContent(imageArray, jokeArray);
      }
    }
  })
}
// button to bring user back to the top of the page
myApp.scrollButton = function () {
  $('.menu-toggle').on('click', function () {
    $('html, body').animate({ scrollTop: '0px' }, 300);
  })
}
// init
myApp.init = function () {
  myApp.dropDownEventListener();
  myApp.scrollButton();
  $.when(
    myApp.getPortraitImages(),
    myApp.getWomanImages(),
    myApp.getAnimalImages(),
    myApp.getJokes())
    .done(function () {
      $('.loading').addClass('none')
      $('.after-loading').css('opacity', '100');
    });
}
// doc ready
$(function () {
  myApp.init();
})