// namespace
const myApp = {}

let selectedArray;

myApp.imageUrl = `https://openaccess-api.clevelandart.org/api/artworks/`;
myApp.jokesUrl = `https://icanhazdadjoke.com/search`;

myApp.imagesPortraitsArray = [];
myApp.imagesWomanArray = [];
myApp.imagesAnimalArray = [];
myApp.jokesArray = [];

myApp.limit = 30; //current limit of jokes on the API
myApp.counter = 0;
myApp.increment = 5;

// AJAX CALLS
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
    .then(function (returnObject) {
      for (let i = 0; i < myApp.limit; i++) {
        myApp.imagesPortraitsArray.push(returnObject.data[i].images.web.url);
      }
    }).fail(function () {
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
    }).fail(function () {
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
  }).fail(function () {
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
    }).fail(function () {
      alert('Sorry no jokes, BYE')
    })
}

// select image array
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

myApp.appendContent = function (chosenArray, jokesArray) {
  do {
    let imageJokeBox = `
    <div class = "image-joke-box image-joke-box${myApp.counter}">
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

myApp.scrollButton = function () {
  $('.menu-toggle').on('click', function () {
    $('html, body').animate({ scrollTop: '0px' }, 300);
  })
}

// INIT
myApp.init = function () {
  myApp.dropDownEventListener();
  myApp.scrollButton();
  $.when(
    myApp.getPortraitImages(),
    myApp.getWomanImages(),
    myApp.getAnimalImages(),
    myApp.getJokes())
    .done(function () {
      $('.loader').addClass('none')
      $('.after-ajax').css('opacity', '100');
    });
}

// DOC READY 
$(function () {
  myApp.init();
})