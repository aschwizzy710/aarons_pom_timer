(function() {

  //initialize variables
  var startButton= $("#start");
  var seconds = $("#seconds");
  var minutes = $("#minutes");
  var stopButton = $("#stop");
  var resetButton = $("#reset");
  var breakButton = $('#break');
  var body = $('body');
  var isOnBreak = false;
  var spaceBar = false;
  var timerInterval;
  //main functionality
  startButton.on("click", startTimer);
  breakButton.on("click", startBreak);
  stopButton.on("click", stopTimer);
  resetButton.on("click", resetTimer);
  body.on("keyup", keyboardStop);
  //function definition
    function startBreak(){
    //set that we are on a break
    isOnBreak = true;
    //set the minutes to 5 minutes
    minutes.text('00');
    // set the seconds to 0 seconds
    seconds.text('03');
    // hide the break button
    breakButton.hide();
    // start the timer
    startTimer();
  }

  function keyboardStop(e){
    if (e.keyCode == 32){

    if (!spaceBar) {
      console.log('stuff!');
      e.preventDefault();
      stopTimer();
    }
  } else {

      console.log('otherstuff');
      e.preventDefault();
      startTimer();
      spaceBar = false;
    }
  }
  function startTimer(){
      console.log(timerInterval);
      if(!timerInterval){
          timerInterval = setInterval(countdown, 1000);
      }
  }
  function stopTimer(){
    // stop the timer
    console.log(timerInterval);
    clearInterval(timerInterval);
    timerInterval = null;
}

  function resetTimer(){
    // reset the timer
    console.log(timerInterval);
    if(isOnBreak){
      //reset to 5:00
      clearInterval(timerInterval);
      timerInterval = null;
      minutes.text('05');
      seconds.text('00');
      //reenable start button
      startButton.attr('disabled', false);
      //unhide the break button
      breakButton.hide();
    } else {
      // reset to 25:00
      clearInterval(timerInterval);
      timerInterval = null;
      minutes.text('25');
      seconds.text('00');
      // disable start button
      startButton.attr('disabled', false);
      // hide the break button
      breakButton.hide();
      isOnBreak = false;
    }
  }
  function countdown(){
    var secondsText = seconds.text ();
    var secondsTextAsNumber = parseInt(secondsText);
    var minutesText = minutes.text();
    var minutesTextAsNumber = parseInt(minutesText);

    //console.log(typeof secondsText);
    //console.log(typeof secondsTextAsNumber);
    if (minutesTextAsNumber === 0 && secondsTextAsNumber === 0){
      //stop!
      clearInterval(timerInterval); //this will stop the timer
      timerInterval = null;
      if(!isOnBreak){
        //disable the start button
        startButton.attr('disabled', true);
        //unhide the break button
        breakButton.show();
    } else {
        minutes.text('25');
        seconds.text('00');
        startButton.attr('disabled', false);
        isOnBreak = false;
      }
        return;
    }
    if (secondsTextAsNumber === 0) {
      if (minutesTextAsNumber !== 0){
      var decreaseMinutesAsNumberByOne = minutesTextAsNumber -1;
      var padminutesTextAsNumber = pad(decreaseMinutesAsNumberByOne);
      minutes.text(padminutesTextAsNumber);
  }
      seconds.text ("59");
      //then change seconds text to 59
  } else {

    var decreasedSecondsAsNumberByOne = secondsTextAsNumber - 1;
    var padSecondsTextAsNumber = pad(decreasedSecondsAsNumberByOne);
    seconds.text(padSecondsTextAsNumber);
  }
    // var secondsValue = parseInt(seconds.text());
    // console.log(secondsValue);
    // seconds.text(pad(secondsValue - 1));
    //transforms letter to text
  }

    function pad (num){
        if(num < 10){
          //spit out number with a leading 0
          return "0" + num;

      } else {
        //spit out the original number
        return num;
      }
    }
}());
