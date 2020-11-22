// namespace
const myApp = {}

myApp.imagesPortraitsArray = [];
myApp.imagesWomanArray = [];
myApp.imagesPeopleArray = [];

let selectedArray;

myApp.jokesArray = [];


myApp.imageUrl = `https://openaccess-api.clevelandart.org/api/artworks/`;
myApp.jokesUrl = `https://icanhazdadjoke.com/search`;


// AJAX CALLS
myApp.getPortraitImages = function () {
  $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'portrait',
      has_image: 1,
      type: 'Painting',
    }
  })
    .then(function (image) {
      console.log('portraits returned')
      // console.log(image.data[0].images.web.url);
      // console.log(i);
      for (let i = 0; i < 100; i++) {
        const imagesPortraitUrl = image.data[i].images.web.url;
        myApp.imagesPortraitsArray.push(imagesPortraitUrl);
      }
      // console.log(myApp.imagesPortraitsArray);
    })
    .then(() => {
      if ($('#dropDown').val() == 'portrait') {
        selectedArray = myApp.imagesPortraitArray;
      }
      // console.log(selectedArray);
    })
}

myApp.getWomanImages = function () {
  $.ajax({
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
      console.log('women returned');
      // console.log(image.data[0].images.web.url);
      // console.log(i);
      for (let i = 0; i < 100; i++) {
        const imagesWomanUrl = image.data[i].images.web.url;
        myApp.imagesWomanArray.push(imagesWomanUrl);
      }
      // console.log(myApp.imagesWomanArray);
    })
    .then(() => {
      if ($('#drop-down').val() == 'woman') {
        selectedArray = myApp.imagesWomanArray;
      }
      // console.log(selectedArray);
    })
}

myApp.getPeopleImages = function () {
  $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'people',
      has_image: 1,
      type: 'Painting',
    }
  }).then(function (image) {
    console.log('people returned');
    // console.log(i);
    // console.log(image.data);
    for (let i = 0; i < image.data.length; i++) {
      const imagesPeopleUrl = image.data[i].images.web.url;
      // console.log(image.data[0].images.web.url);
      myApp.imagesPeopleArray.push(imagesPeopleUrl);
    }
    // console.log(myApp.imagesPeopleArray);
  })
    .then(() => {
      if ($('#drop-down').val() == 'people') {
        selectedArray = myApp.imagesPeopleArray;
      }
      // console.log(selectedArray);
    })
}

myApp.getJokes = function () {
  $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      limit: 30,
      headers: { 'Accept': 'application/JSON' }
    }
  }).then(function (jokeReturn) {
    console.log('jokes returned');
    for (let i = 0; i <= jokeReturn.results.length; i++) {
      const jokes = jokeReturn.results[i].joke;
      myApp.jokesArray.push(jokes);
    }
    // console.log(myApp.jokesArray);
  })
}







// select image array
myApp.dropDownEventListener = function () {
  $('#drop-down').on('change', function () {
    if ($(this).val() == 'portrait') {
      selectedArray = myApp.imagesPortraitsArray;
    } else if ($(this).val() == 'woman') {
      selectedArray = myApp.imagesWomanArray;
    } else if ($(this).val() == 'people') {
      selectedArray = myApp.imagesPeopleArray;
    }
    // console.log(selectedArray);
    myApp.appendContent(selectedArray, myApp.jokesArray);
    myApp.scrollFunction(selectedArray, myApp.jokesArray);
  })
}
// .then(() => {

// })


myApp.counter = 0;
myApp.increment = 5;

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

myApp.scrollFunction= function(imageArray, jokeArray) {
  $(window).on('scroll', function() {
    if (Math.round($(window).scrollTop() + $(window).height()) === $(document).height()) {
      myApp.increment + 5;
      myApp.appendContent(imageArray, jokeArray);
    }
  })
}


// INIT
myApp.init = function () {
  myApp.dropDownEventListener();

  myApp.getPortraitImages();
  myApp.getWomanImages();
  myApp.getPeopleImages();
  myApp.getJokes();

  // $('.after-ajax').removeClass('.none'),
  // myApp.appendContent()
}
// DOC READY 
$(function () {
  myApp.init()

})