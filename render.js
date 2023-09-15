const fetch = require('node-fetch');

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const resultElement = document.getElementById('result');

// Replace 'YOUR_API_KEY' with your actual API key from ExchangeRate-API
const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.apilayer.com/exchangerates_data/${apiKey}/latest`;

// Fetch and populate currency dropdowns
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);

    currencies.forEach((currency) => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');

      option1.text = currency;
      option1.value = currency;
      option2.text = currency;
      option2.value = currency;

      fromCurrencySelect.appendChild(option1);
      toCurrencySelect.appendChild(option2);
    });
  });

// Event listener for conversion
convertButton.addEventListener('click', () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = amountInput.value;

  if (!fromCurrency || !toCurrency || !amount) {
    alert('Please fill in all fields');
    return;
  }

  // Calculate the conversion
  const conversionRate = data.rates[toCurrency] / data.rates[fromCurrency];
  const convertedAmount = (amount * conversionRate).toFixed(2);

  // Display the result
  resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
});
