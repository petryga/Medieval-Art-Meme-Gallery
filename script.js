const myApp = {}

myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/`

myApp.init = function() {

myApp.getImages = $.ajax({
  url: myApp.imagesUrl,
  method: 'GET',
  dataType: 'json',
  data: {
    q: 'portrait',
    // q: style,
    has_image: 1,
    // department: 'Medieval Art',
    type: 'Painting',
  }
});

// .fail(function (imageError) {
//   alert(`Joke content failed: ${imageError.statusText}`);
//   console.log(imageError);
// })

myApp.getJokes = $.ajax({
  url: myApp.jokesUrl,
  method: 'GET',
  dataType: 'json'
})
// .fail(function (jokeError) {
//   alert(`Get joke failed: ${jokeError.statusText}`);
//   console.log(jokeError);
//   // maybe display 404 message if we have time for that feature
// })

const imagesArray = [];
const jokesArray = [];

let imagesToDisplay;

$.when(myApp.getImages, myApp.getJokes)
  .then(function (image, joke) {
    for (let i = 0; i < image[0].data.length; i++) {
      const imagesUrl = image[0].data[i].images.web.url;
      imagesArray.push(imagesUrl);


      const appendContent = function (imageLink) {
        // check inspector - it shows as imageJokeBox imageJokeBox0
        let pairToAppend = `
        <div class = "imageJokeBox imageJokeBox${i}">
          <p>${jokesArray}</p>
        </div>
        `;
      
        //when the user scrolls down to a certain height, append new image joke
        $(window).on("scroll", function() {
          //page height
          let scrollHeight = $(document).height();
          //scroll position
          let scrollPos = $(window).height() + $(window).scrollTop();
          // fire if the scroll position is 300 pixels above the bottom of the page
          if(((scrollHeight - 300) >= scrollPos) / scrollHeight == 0){
            $('.appendToHere').append(pairToAppend)
            console.log('bottom');
           }
         });
         imagesToDisplay = myApp.randomizer(imagesArray);
      
        $('.appendToHere').append(pairToAppend);
        $(`.imageJokeBox${i}`).css('background-image', `url(${imagesToDisplay})`)
        jokesArray.push(joke[0].joke);
      }
      appendContent(imagesToDisplay);
    }

    //add pseudo code here
    $('.invisible').remove();
  })

myApp.randomizer = function (array) {
  const randomArrayIndex = Math.floor(Math.random() * array.length);
  return array[randomArrayIndex]
}

// myApp.dropDownEventListener = function(){
//   ('#style').on('change', function(){
//     const chosenStyle = $(this).val();
//     $('.imageJokeBox').empty();
//     myApp.getImages(chosenStyle);
//     $('.currentStyle').text(chosenStyle);
//   })
// }
//circular menu on/off
// $('.menu-toggle').click(function () {
//   $('.menu-toggle').toggleClass('open');
//   $('.menu-round').toggleClass('open');
//   $('.menu-line').toggleClass('open');
// });
}

$(function(){
    myApp.init()
})