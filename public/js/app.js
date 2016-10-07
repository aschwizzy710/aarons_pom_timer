(function() {

  //initialize variables
  var startButton= $("#start");
  var seconds = $("#seconds");
  var minutes = $("#minutes");
  var stopButton = $("#stop");
  var resetButton = $("#reset");
  var breakButton = $('#break');
  var longBreakButton = $('#long_break');
  var body = $('body');
  var isOnBreak = false;
  var isOnLongBreak = false;
  var spaceBar = false;
  var timerInterval;
  var finishedSound = new Audio('https://freesound.org/data/previews/254/254316_4062622-lq.mp3');
  var counter = 0;
  //main functionality
  startButton.on("click", startTimer);
  breakButton.on("click", startBreak);
  stopButton.on("click", stopTimer);
  resetButton.on("click", resetTimer);
  longBreakButton.on("click", startLongBreak);
  body.on("keyup", keyboardStop);
  //function definition
    function startBreak(){
    count = 1 + counter;
    counter = count;
    //set that we are on a break
    isOnBreak = true;
    //set the minutes to 5 minutes
    minutes.text('00');
    // set the seconds to 0 seconds
    seconds.text('05');
    // hide the break button
    breakButton.hide();
    // start the timer
    startTimer();
  }
  function startLongBreak(){
    // set that we are on long break
    isOnLongBreak = true;
    // set the minutes to 10 minutes
    minutes.text('10');
    // set seconds to 0 seconds
    seconds.text('00');
    // hide the short break button
    longBreakButton.hide();
    // start the timer
    startTimer();
  }
  function keyboardStop(e){
    if (!spaceBar) {
      e.keyCode = 32;
      console.log('stuff!');
      e.preventDefault();
      stopTimer();
      spaceBar = true;
    } else {
      console.log('otherstuff');
      e.keyCode = 32;
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
      // ring when minutes and seconds are at 0
      finishedSound.play();

      //stop!
      clearInterval(timerInterval); //this will stop the timer
      timerInterval = null;
      if(!isOnBreak){
        //disable the start button
        startButton.attr('disabled', true);
        //unhide the break button
        breakButton.show();
      }
      if (!isOnLongBreak && count===2) {
        //disable the start button
        startButton.attr('disabled', true);
        //unhide the long break button
        longBreakButton.show();
      } else {
        minutes.text('00');
        seconds.text('06');
        startButton.attr('disabled', false);
        // breakButton.hide();
        isOnBreak = false;
        isOnLongBreak = false;
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
