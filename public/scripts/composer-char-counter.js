
$("#tweet-text").keyup(function() {
  const maxLength = 140;
  const inputCount = $("#tweet-text").val().length;
  let newCount = maxLength-inputCount
  if (newCount> 130) {
    //text turns red
  }
  $('.counterCount').text(newCount);
});
