
$("#tweet-text").keyup(function() {
  const maxLength = 140;
  let colour;
  const inputCount = $("#tweet-text").val().length;
  let newCount = maxLength-inputCount
  if (newCount <= 20) {
    $('.counterCount').css({
      'color': 'red'
  })
} else {
  $('.counterCount').css({
    'color': 'black'
  })
}
  $('.counterCount').text(newCount);
});
