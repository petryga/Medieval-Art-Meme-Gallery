const myApp = {}

myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/`

myApp.getImages = $.ajax({
    url: myApp.imagesUrl,
    method: 'GET',
    dataType: 'json'
}).fail(function (imageError) {
  alert(`Joke content failed: ${imageError.statusText}`);
  console.log(imageError);
})
// .then(function(imagesResponse){
// console.log(imagesResponse);
// })

// myApp.getImages.then(function (images) {
//     console.log(images);
// })

myApp.getJokes = $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json'
}).fail(function (jokeError) {
  alert(`Get joke failed: ${jokeError.statusText}`);
  console.log(jokeError);
})

$.when(myApp.getImages, myApp.getJokes)
    .then(function (image, joke) {
        const { url } = image[0].data[0].images.web;
        // console.log(url, joke[0].joke);
        jokesArray.push(joke[0].joke);
        imagesArray.push(image.url);
        $('.invisible').remove();
        appendContent(url);
    })
    // .fail(function (imageError, jokeError) {
    //   if (imageError) {
    //     alert(`Image content failed: ${imageError.statusText}`);
    //   } else if (jokeError) {
    //     alert(`Joke content failed: ${jokeError}`)
    //   };
    //     console.log(imageError, jokeError);
    // })
    // ----------^ tested the fail code, and the image error fail was firing when the error was actually from the joke ajax, so i moved the .fail() from the $.when to the specific $.ajax

const imagesArray = [];
const jokesArray = [];

// myApp.getJokes.then(function (jokes) {
//     jokesArray.push(jokes.joke)
// })

// ---- I turned your event listener into a function, and I call the function above in $.when (line 31)
const appendContent = function(imageLink) {
  //  ------ changed the append variable name, and now appending a div containing the image and the joke to the page on click.
  // Moved all this code outside the event listener, but inside the function so that there is a image/joke pair that comes up when the page loads
  let pairToAppend = `
  <div class = "imageJokeBox">
    <p>${jokesArray}</p>
  </div>
  `;
  $('.appendToHere').append(pairToAppend);
  // ----- took the returned image and set it as the background image of div.image-container (had to set height and width for .image-container in _main.scss)
  $('.imageJokeBox').css('background-image', `url(${imageLink})`)


  $('#btn').on('click', function () {

  })
}

