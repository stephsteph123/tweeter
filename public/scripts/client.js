/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
const createTweetElement = function (tweet) {
  return `<article class="tweetContainer">
<h2 class="articleTweetHeader">
  <img class="userIcon" src=${tweet.user.avatars}>
  <tag class ="userName">${tweet.user.name}</tag>
  <tag class ="userHandle">${tweet.user.handle}</tag>
</h2>

<tag class ="tweetBody">${tweet.content.text}</tag>
<tag class ="borderLine">borderline </tag>
<footer class="articleTweetFooter">
  <time class="tweetDate">${tweet.created_at}</time>
  <span class="rightLogos">
    <i class="fa-solid fa-flag" id="flagIMG"></i>
    <i class="fa-solid fa-recycle" id="repostIMG"></i>
    <i class="fa-solid fa-heart" id="heartIMG"></i>
  </span>
</footer>
</article>`
}

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $("#tweetContainer").prepend(createTweetElement(tweet))
  }
}

// hardcode example:

const tweetData = [
  {
    "user": {
      "name": "bye",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1670443757712
  }
]

renderTweets(tweetData);
})

//using AJAX to fetch from server
//inside (docoument.ready), create funciton > laodtweets
//fetch tweets from tweets page.
//JSON inside HTML

