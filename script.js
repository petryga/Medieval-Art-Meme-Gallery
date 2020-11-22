// create namespace object
const myApp = {}

myApp.imagesArray = [];
myApp.jokesArray = [];
myApp.userArtSelection;

myApp.imageUrl = `https://openaccess-api.clevelandart.org/api/artworks/`;
myApp.jokesUrl = `https://icanhazdadjoke.com/search`;

// GET IMAGES AJAX CALL
myApp.getImages = function () {
  let call = $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: 'portrait',
      has_image: 1,
      // department: 'Medieval Art',
      type: 'Painting',
    }
  });
  return call;
}

myApp.getImages2 = function (style) {
  let call = $.ajax({
    url: myApp.imageUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      q: style,
      has_image: 1,
      // department: 'Medieval Art',
      type: 'Painting',
    }
  }).then(function (image) {

    // console.log(image);
    myApp.imagesArray = [];
    for (let i = 0; i < image.data.length; i++) {
      // console.log(i);
      const imagesUrl = image.data[i].images.web.url;
      myApp.imagesArray.push(imagesUrl);
      console.log(imagesUrl);
      console.log(myApp.imagesArray);
    }
    for (let i = 0; i < 5; i++) {
      // console.log(myApp.imagesArray);
      myApp.appendContent(i);
    }

    //add pseudo code here

    $('.invisible').remove();
  })
}


// .fail(function (imageError) {
//   alert(`Joke content failed: ${imageError.statusText}`);
//   console.log(imageError);
// })

// GET JOKES AJAX CALL FUNCTION
myApp.getJokes = function () {
  let call = $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      limit: 30,
      headers: { 'Accept': 'application/JSON' }
    }
  });
  return call;
}

// .fail(function (jokeError) {
//   alert(`Get joke failed: ${jokeError.statusText}`);
//   console.log(jokeError);
//   // maybe display 404 message if we have time for that feature
// })

// RANDOMIZER FUNCTION
myApp.randomizer = function (array) {
  const randomArrayIndex = Math.floor(Math.random() * array.length);
  return array[randomArrayIndex]
}

// EVENT LISTENER FUNCTION
myApp.dropDownEventListener = function () {
  $('#style').on('change', function () {
    // console.log($(this).val());
    const chosenStyle = $(this).val();
    $('.appendToHere').empty();
    myApp.getImages2(chosenStyle);


    // find how to get to the data in the return
    // clear array first
    // put these URLs into the array
    // use append content with this new array

    // Update Array with new ajax call
    // console.log(myApp.imagesArray);



    // FInd a way to make append content find the new array and then append that.
    // myApp.appendContent();
    $('.currentStyle').text(chosenStyle);
  })
}


// circular menu on/off
$('.menu-toggle').click(function () {
  $('.menu-toggle').toggleClass('open');
  $('.menu-round').toggleClass('open');
  $('.menu-line').toggleClass('open');
});



// Infinite Scroll Function

$(window).scroll(function () {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    console.log('bottom');
  }
});





//   $(window).on("scroll", function () {
//     //page height
//     let docHeight = $(document).height();
//     //scroll position
//     let windowHeightPlusDistanceToTop = $(window).height() + $(window).scrollTop();
//     // fire if the scroll position is 300 pixels above the bottom of the page
//     if (((docHeight - 300) >= windowHeightPlusDistanceToTop) / docHeight == 0) {
//       console.log('bottom');
//     }
//   });


// APPEND CONTENT FUNCTION
myApp.appendContent = function (i) {
  // check inspector - it shows as imageJokeBox imageJokeBox0
  let pairToAppend = `
    <div class = "imageJokeBox imageJokeBox${i}">
      <p>${myApp.jokesArray[i]}</p>
    </div>
  `;

  $('.appendToHere').append(pairToAppend);
  let imagesToDisplay = myApp.randomizer(myApp.imagesArray);
  // console.log(imagesToDisplay);
  $(`.imageJokeBox${i}`).css('background-image', `url(${imagesToDisplay})`);

  // $('html').delay(5000).animate({
  //   scrollTop: $(`.imageJokeBox${i}`).offset().top
  // }, 6000);
}

// INIT FUNCTION
myApp.init = function () {
  myApp.dropDownEventListener();
  $.when(myApp.getImages(), myApp.getJokes())
    .then(function (image, joke) {
      // console.log(joke);

      // Loop that appends jokes to Joke array when joke AJAX returns
      for (let i = 0; i < joke[0].results.length; i++) {
        const newJoke = joke[0].results[i].joke;
        // console.log(newJoke);
        myApp.jokesArray.push(newJoke);
      }

      // Loop that appends images to image array when image AJAX returns
      for (let i = 0; i < image[0].data.length; i++) {
        // console.log(i);
        const imagesUrl = image[0].data[i].images.web.url;
        myApp.imagesArray.push(imagesUrl);
      }
      console.log(myApp.imagesArray);

      // Call infinte scroll function here 

      // APPEND CONTENT LOOP
      // for (let i = 0; i < 30; i++) {
      //   if (i % 5 != 0) {
      //     // myApp.appendContent(i);
      //     console.log(i);
      //   } else {
      //     // console.log(i);

      //     // myApp.appendContent(i);
      //   }

      // }

      // pseudo code
      $('.invisible').remove();
    })
}

// DOC READY 
$(function () {
  myApp.init()

})
