const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timer = document.getElementById('timer');
const author = document.querySelector('.author span');
const puplished = document.querySelector('.puplished span');

quoteInputElement.addEventListener('input', letter => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value;
  let correct = true;
  arrayQuote.forEach((letterSpan, index) => {
    const letter = arrayValue[index];

    if (letter == null) {
      letterSpan.classList.remove('wrong');
      letterSpan.classList.remove('correct');
      correct = false;
    } else if (letter === letterSpan.innerHTML) {
      letterSpan.classList.add('correct');
      letterSpan.classList.remove('wrong');
    } else {
      letterSpan.classList.remove('correct');
      letterSpan.classList.add('wrong');
      correct = false;
    }
  })
  if (correct) getNextQuote();
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL).then(res => res.json())
    .then(data => {
      author.innerHTML = data.author;
      puplished.innerHTML = data.dateAdded;
      console.log(data)
      return data.content
    })
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = quote;
  quoteDisplayElement.innerHTML = '';
  if (quote.length >= 60) timer.innerHTML = 30;
  else timer.innerHTML = 20;
  quote.split('').forEach(letter => {
    const letterSpan = document.createElement('span');
    letterSpan.innerHTML = letter;

    quoteDisplayElement.appendChild(letterSpan)
  });
  quoteInputElement.value = null;
  startTimer();
}

let starttime;
function startTimer() {
  
  starttime = new Date();
  let timeInter = setInterval(() => {
    timer.innerHTML -= 1;
    if (timer.innerHTML == 0) {
      clearInterval(timeInter)
      getNextQuote();
    }
  }, 1090)
}


getNextQuote()