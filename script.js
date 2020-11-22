// namespace
const myApp = {}

let selectedArray;

myApp.imageUrl = `https://openaccess-api.clevelandart.org/api/artworks/`;
myApp.jokesUrl = `https://icanhazdadjoke.com/search`;

myApp.imagesPortraitsArray = [];
myApp.imagesWomanArray = [];
myApp.imagesPeopleArray = [];
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
    .then(function (image) {
      for (let i = 0; i < myApp.limit; i++) {
        myApp.imagesWomanArray.push(image.data[i].images.web.url);
      }
    })
}

myApp.getPeopleImages = function () {
  return $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'people',
      has_image: 1,
      type: 'Painting',
    }
  }).then(function (image) {
    for (let i = 0; i < myApp.limit; i++) {
      myApp.imagesPeopleArray.push(image.data[i].images.web.url);
    }
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
    .then(function (jokeReturn) {
      for (let i = 0; i < jokeReturn.results.length; i++) {
        myApp.jokesArray.push(jokeReturn.results[i].joke);
      }
    })
}

myApp.randomizer = function (array) {
  for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr;
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
    } else if ($(this).val() == 'people') {
      selectedArray = myApp.imagesPeopleArray;
    }
    console.log(selectedArray[1]);
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
    // console.log(chosenArray);
    $(`.image-joke-box${myApp.counter}`).css('background-image', `url('${chosenArray[myApp.counter]}')`);
    myApp.counter++;
  }
  while (myApp.counter < myApp.increment);
  myApp.scrollFunction(chosenArray, jokesArray);
}

console.log("scroll to Top is : ", $(window).scrollTop());
console.log("the window height is: ", $(window).height());
console.log("scroll and window = ", ($(window).scrollTop() + $(window).height()));
console.log("the document height is: ", $(document).height());

myApp.scrollFunction = function (imageArray, jokeArray) {
  $(window).on('scroll', function () {
    if (Math.round(($(window).scrollTop() + $(window).height()) === $(document).height())) {
      if (myApp.counter < myApp.limit) {
        myApp.increment + 5;
        myApp.appendContent(imageArray, jokeArray);
      }
      else {
        alert('We gona send you allllll the way back');
      }
    }
  })
}


// INIT
myApp.init = function () {
  myApp.dropDownEventListener();
  $.when(
    myApp.getPortraitImages(),
    myApp.getWomanImages(),
    myApp.getPeopleImages(),
    myApp.getJokes())
    .done(function (a1, a2, a3, a4) {
      $('.loader').css('display', 'none')
      $('.after-ajax').css('opacity', '100');
      // the code here will be executed when all four ajax requests resolve.
      // a1, a2, a3 and a4 are lists of length 3 containing the response text,
      // status, and jqXHR object for each of the four ajax calls respectively.
    });
}

// DOC READY 
$(function () {
  myApp.init();
})