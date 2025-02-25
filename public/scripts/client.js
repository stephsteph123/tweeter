/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function that houses the standard tweet structure
  const createTweetElement = function (tweet) {
    return `<article class="tweetContainer">
  <h2 class="articleTweetHeader">
    <img class="userIcon" src=${tweet.user.avatars}>
    <tag class ="userName">${tweet.user.name}</tag>
    <tag class ="userHandle">${tweet.user.handle}</tag>
  </h2>
  <textarea wrap = "soft" class ="tweetBody">${escape(tweet.content.text)}</textarea>
  <footer class="articleTweetFooter">
    <time class="tweetDate">${timeSince(tweet.created_at)}</time>
    <span class="rightLogos">
      <i class="fa-solid fa-flag" id="flagIMG"></i>
      <i class="fa-solid fa-recycle" id="repostIMG"></i>
      <i class="fa-solid fa-heart" id="heartIMG"></i>
    </span>
  </footer>
  </article>`
  }


//function allows new tweets to go to the top of the container.
  const renderTweets = function (tweets) {
    $("#tweetContainer").empty();
    for (let tweet of tweets) {
      $("#tweetContainer").prepend(createTweetElement(tweet))
    }
  }

//loads all the tweets
  const loadTweets = function () {
    $.ajax({  url: "http://localhost:8080/tweets", method: "GET" })
    .then(function(tweetsBody) {
      renderTweets(tweetsBody)
    })
    .catch((err) => {
      console.log(err);
    });
    }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//calculates the time since tweet to current time. 
  const timeSince = function(time) {
    return timeago.format(time);
  }

$(document).ready(function(){

loadTweets();

//submit event upon clicking the button.
$(".formContainer").submit(function(event) {
  event.preventDefault();
  const missText = $("#tweet-text").val();
  if (!missText) {
    $('#mainLabel').slideDown();
  } else if (missText.length > 140) {
    $('#mainLabel').slideDown();
  } else {
    $("tweetContainer").empty()
    $.ajax({  
      url: "/tweets", 
      method: "POST", 
      data: $(".formContainer").serialize(),
    })
    .then(function(tweetsBody) {
      $("#tweet-text").val('')
      $(".counterCount").val(140)
      $('#mainLabel').hide();
      loadTweets();
    })
    .catch((err) => {
      console.log(err);
    });
  }
})

});
