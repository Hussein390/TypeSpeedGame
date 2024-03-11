const URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
const author = document.querySelector('.author span');
const puplished = document.querySelector('.puplished span');
let typos = document.getElementById('typos');
quoteInputElement.addEventListener('input', letter => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value;
  let correct = true;
  

  arrayQuote.forEach((letterSpan, index) => {
    const letters = arrayValue[index];
    if (letters == null) {
      letterSpan.classList.remove('wrong');
      letterSpan.classList.remove('correct');
      correct = false;
    } else if (letters === letterSpan.innerHTML) {
      letterSpan.classList.add('correct');
      letterSpan.classList.remove('wrong');
    }
    else {
      letterSpan.classList.remove('correct');
      letterSpan.classList.add('wrong');
      correct = false;
    }
  })   
  if (correct && arrayValue.length === arrayQuote.length) {
    // Only call getNextQuote() if the user has typed the entire quote correctly
    getNextQuote();
  }
  })

function getRandomQuote() {
  return fetch(URL).then(res => res.json())
    .then(data => {
      author.innerHTML = data.author;
      puplished.innerHTML = data.dateAdded;
      return data.content
    })
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = quote;
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(letter => {
    const letterSpan = document.createElement('span');
    letterSpan.innerHTML = letter;

    quoteDisplayElement.appendChild(letterSpan)
  });
  startTimer();
  quoteInputElement.value = null;
}
const count = 1100;
const time = 30;

let intervalId; // Variable to store the interval ID

function startTimer() {
  timer.innerHTML = time;
  clearInterval(intervalId); // Clear previous timer
  intervalId = setInterval(() => {
    timer.innerHTML--;
    if (timer.innerHTML <= '0') {
      clearInterval(intervalId);
      getNextQuote();
    }
  }, count);
}

getNextQuote()