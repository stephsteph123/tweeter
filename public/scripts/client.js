/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  const renderTweets = function (tweets) {
    $("#tweetContainer").empty();
    for (let tweet of tweets) {
      $("#tweetContainer").prepend(createTweetElement(tweet))
    }
  }

  const loadTweets = function () {
    $.ajax({  url: "http://localhost:8080/tweets", method: "GET" })
    .then(function(tweetsBody) {
      console.log("success", tweetsBody)
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

  const timeSince = function (time) {
    result = 0;
    let oneDayMs = 1000*60*60*24
    const dateTweet = new Date(time)
    const dateNow = new Date(Date.now()) 
    let diffDate = ((dateNow-dateTweet)/oneDayMs).toFixed(2)
    if (diffDate < 1) {
      result = (`${Math.round(diffDate)} hour(s) since last tweet`)
    } else {
      result = (`${Math.round(diffDate)} day(s) since last tweet`)
    }
    return result;
  };

$(document).ready(function(){

loadTweets();

$(".formContainer").submit(function(event) {
  event.preventDefault();
  const missText = $("#tweet-text").val();
  if (!missText) {
    $('#mainLabel').slideDown();
  } else if (missText >= 120) {
    $('#mainLabel').slideDown();
  } else {
    $("tweetContainer").empty()
    $.ajax({  
      url: "/tweets", 
      method: "POST", 
      data: $(".formContainer").serialize(),
    })
    .then(function(tweetsBody) {
      $('#mainLabel').hide();
      loadTweets();
    })
    .catch((err) => {
      console.log(err);
    });
  }
})

});
