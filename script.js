// Banner section:
var game_number = 1;
var player_one_input = document.getElementsByTagName('input')[0];
var player_two_input = document.getElementsByTagName('input')[1];
var player_one_div = document.getElementById('player_one');
var player_two_div = document.getElementById('player_two');
var player_name = document.getElementsByClassName('player_name');
var player_one_score_div = document.getElementById('player_one_score');
var player_one_score = 0;
var player_two_score_div = document.getElementById('player_two_score');
var player_two_score = 0;

player_one_input.onkeydown = function(e) {
  if (e.keyCode == 13) {
    player_name[0].innerHTML = player_one_input.value;
    player_name[0].style.color = '#2b8ff2';
    player_name[0].style.fontFamily = 'fantasy';
    player_name[0].style.fontSize = '28px';
  }
}

player_two_input.onkeydown = function(e) {
  if (e.keyCode == 13) {
    player_name[1].innerHTML = player_two_input.value;
    player_name[1].style.color = '#964242';
    player_name[1].style.fontFamily = 'fantasy';
    player_name[1].style.fontSize = '28px';
  }
}

// Game section:

var input_field = document.getElementById('input_field');
var word = document.getElementById('word');
var letters = document.getElementById('letters');
var submit_btn = document.getElementById('submit');
var form = document.getElementsByTagName('form')[0];
var the_word = document.getElementById('input');
var guess_btn = document.getElementById('guess_submit');
var guess_field = document.getElementById('letter_guess');
var body_parts = document.getElementsByClassName('body');
var body_count = 0;
var letter_array = [];

var letters = document.getElementsByClassName('letter');

function makeArray() {
  for (var i=0; i<letters.length; i++) {
    letter_array.push(letters[i].textContent);
  }
}

submit_btn.addEventListener('click', function() {
  var i = 0;
  while (i < input_field.value.length) {
    blanks.innerHTML += "<div class='letter' style='transition:all 0.1s linear; display:inline-block; width:50px; height:50px; margin-left:10px; margin-right:10px; font-size:38px; color:black; border-width:3px; border-style:solid; border-color:silver'>" + input_field.value[i].toLowerCase() + "</div>";
    i++;
  }
  the_word.style.display = 'none';
  document.getElementById('guess').style.display = 'inline';
  document.getElementById('guess_input_instruction').style.marginLeft = '10%';
  document.getElementById('guess_input_instruction').style.marginTop = '5%';
  document.getElementById('letter_guess').style.marginLeft = '10%';
  document.getElementById('letter_guess').style.marginTop = '5px';
})

var green_letter_count = 0;

function showLetter() {
  var x = 0;
  while (x < letters.length) {
    if (letters[x].textContent == guess_field.value.toLowerCase() &&
       letters[x].style.color != 'silver') {
      letters[x].style.color = 'silver';
      letters[x].style.borderColor = 'lightgreen';
      letters[x].style.borderWidth = '6px';
      green_letter_count++;
    }
    x++;
  }
}

function highlight() {
  // console.log('highlight function works');
  var x = 0;
  while (x < letters.length) {
    if (letters[x].style.color == 'silver') {
      letters[x].style.borderColor = 'silver';
      letters[x].style.borderWidth = '3px';
    }
    x++;
  }
}

function addBody() {
  for (var i=0; i<letters.length; i++) {
    letters[i].style.borderColor = 'indianred';
  }
  body_parts[body_count].style.display = 'inline';
  body_count += 1;
}

function wrongHighlight() {
  for (var i=0; i<letters.length; i++) {
    letters[i].style.borderColor = 'silver';
  }
}

var letter_guess_record = document.getElementById('letter_guess_record');
var alphas = document.getElementsByClassName('alphabet');

guess_btn.addEventListener('click', function() {
  makeArray();

  for (var i=0; i<alphas.length; i++) {
    if (alphas[i].innerText == guess_field.value.toUpperCase()) {
      alphas[i].style.color = '#595959';
    }
  }

  if (letter_array.includes(guess_field.value.toLowerCase())) {
    showLetter();
    setTimeout(highlight, 300);
  } else {
    addBody();
    setTimeout(wrongHighlight, 300);
  }
  guess_field.value = '';
  endGame();
})

// Ending the game:

function endGame() {
  if ((game_number % 2 != 0) &&
      (green_letter_count == letters.length) &&
      (body_parts[5].style.display != 'inline')) {
    player_two_score += 1;
    player_two_score_div.textContent = player_two_score;
    document.getElementsByTagName('section')[0].style.opacity = 0.2;
    document.getElementById('game_over_banner').style.display = 'inline';
  } else if ((game_number % 2 == 0) &&
             (green_letter_count == letters.length) &&
             (body_parts[5].style.display != 'inline')) {
    player_one_score += 1;
    player_one_score_div.textContent = player_one_score;
    document.getElementsByTagName('section')[0].style.opacity = 0.2;
    document.getElementById('game_over_banner').style.display = 'inline';
  } else if ((body_parts[5].style.display == 'inline') &&
             (green_letter_count < letters.length)) {
    // display 'you lost banner' div
    document.getElementsByTagName('section')[0].style.opacity = 0.2;
    document.getElementById('you_lose_banner').style.display = 'inline';
  }
}

function newGame() {
  green_letter_count = 0;
  body_count = 0;
  game_number += 1;
  document.getElementById('game_over_banner').style.display = 'none';
  document.getElementById('blanks').innerHTML = '';
  for (var x=0; x<body_parts.length; x++) {
    if (body_parts[x].style.display != 'none') {
      body_parts[x].style.display = 'none';
    }
  };
  for (var i=0; i<alphas.length; i++) {
    if (alphas[i].style.color != 'skyblue') {
      alphas[i].style.color = 'skyblue';
    }
  };
  document.getElementsByTagName('section')[0].style.opacity = '1.0';
  if (game_number % 2 == 0) {
    document.getElementById('input_instruction').textContent =
      " Player 2, enter a word:";
    document.getElementById('guess_input_instruction').textContent =
      " Player 1, guess a letter:";
  } else if (game_number % 2 != 0) {
    document.getElementById('input_instruction').textContent =
      " Player 1, enter a word:";
    document.getElementById('guess_input_instruction').textContent =
      " Player 2, guess a letter:";
  }
  document.getElementById('input').style.display = 'inline';
  if (game_number % 2 == 0) {
    document.getElementById('input_field').style.borderColor = '#964242';
    document.getElementById('letter_guess').style.borderColor = '#2b8ff2';
    document.getElementById('letter_guess').style.color = '#2b8ff2';
  } else {
    document.getElementById('input_field').style.borderColor = '#2b8ff2';
    document.getElementById('letter_guess').style.borderColor = '#964242';
    document.getElementById('letter_guess').style.color = '#964242';
  };
  document.getElementById('input_field').value = '';
  document.getElementById('guess').style.display = 'none';
}

document.getElementById('new_game_btn').addEventListener('click', newGame);

function newGameNoWin() {
  green_letter_count = 0;
  body_count = 0;
  game_number += 1;
  document.getElementById('you_lose_banner').style.display = 'none';
  document.getElementById('blanks').innerHTML = '';
  for (var i=0; i<alphas.length; i++) {
    if (alphas[i].style.color != 'skyblue') {
      alphas[i].style.color = 'skyblue';
    }
  };
  for (var x=0; x<body_parts.length; x++) {
    if (body_parts[x].style.display != 'none') {
      body_parts[x].style.display = 'none';
    }
  };
  document.getElementsByTagName('section')[0].style.opacity = '1.0';
  if (game_number % 2 == 0) {
    document.getElementById('input_instruction').textContent =
      " Player 2, enter a word:";
    document.getElementById('guess_input_instruction').textContent =
      " Player 1, guess a letter:";
  } else if (game_number % 2 != 0) {
    document.getElementById('input_instruction').textContent =
      " Player 1, enter a word:";
    document.getElementById('guess_input_instruction').textContent =
      " Player 2, guess a letter:";
  }
  document.getElementById('input').style.display = 'inline';
  if (game_number % 2 == 0) {
    document.getElementById('input_field').style.borderColor = '#964242';
    document.getElementById('letter_guess').style.borderColor = '#2b8ff2';
    document.getElementById('letter_guess').style.color = '#2b8ff2';
  } else {
    document.getElementById('input_field').style.borderColor = '#2b8ff2';
    document.getElementById('letter_guess').style.borderColor = '#964242';
    document.getElementById('letter_guess').style.color = '#964242';
  };
  document.getElementById('input_field').value = '';
  document.getElementById('guess').style.display = 'none';
}

document.getElementById('you_lose_btn').addEventListener('click', newGameNoWin);

// blue: #2b8ff2
// red: #964242 
