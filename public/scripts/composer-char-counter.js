// $('.formContainer').submit((event) => {
//   event.preventDefault();
//   $("#tweet-text").keyup(); 
//   myFunction();
// });

// const myFunction = function() {
//   console.log("let maxLength= 120");
// }
//   // .keyup(function() {
//   //   let length = val().length;
//   //   length = maxLength-length;
//   // })


$("#tweet-text").keyup(function() {
  const maxLength = 140;
  const inputCount = $("#tweet-text").val().length;
  let newCount = maxLength-inputCount
  console.log(newCount)
  $('.counterCount').text(newCount);
});
