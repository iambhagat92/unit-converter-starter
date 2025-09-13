// converters.js - simple, extendable converters

// LENGTH
function convertLength() {
  const input = parseFloat(document.getElementById('length-input').value);
  const from = document.getElementById('length-from').value;
  const to = document.getElementById('length-to').value;
  if (isNaN(input)) {
    document.getElementById('length-result').innerText = 'Enter a number';
    return;
  }
  const toMeters = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    ft: 0.3048,
    in: 0.0254
  };
  const meters = input * toMeters[from];
  const result = meters / toMeters[to];
  document.getElementById('length-result').innerText = result.toFixed(6);
}

// WEIGHT / MASS
function convertWeight() {
  const input = parseFloat(document.getElementById('weight-input').value);
  const from = document.getElementById('weight-from').value;
  const to = document.getElementById('weight-to').value;
  if (isNaN(input)) {
    document.getElementById('weight-result').innerText = 'Enter a number';
    return;
  }
  const toKg = {
    kg: 1,
    g: 0.001,
    lb: 0.45359237,
    oz: 0.0283495231
  };
  const kg = input * toKg[from];
  const result = kg / toKg[to];
  document.getElementById('weight-result').innerText = result.toFixed(6);
}

// TEMPERATURE
function convertTemp() {
  const input = parseFloat(document.getElementById('temp-input').value);
  const from = document.getElementById('temp-from').value;
  const to = document.getElementById('temp-to').value;
  if (isNaN(input)) {
    document.getElementById('temp-result').innerText = 'Enter a number';
    return;
  }
  let c;
  if (from === 'C') c = input;
  else if (from === 'F') c = (input - 32) * 5/9;
  else if (from === 'K') c = input - 273.15;
  let result;
  if (to === 'C') result = c;
  else if (to === 'F') result = (c * 9/5) + 32;
  else if (to === 'K') result = c + 273.15;
  document.getElementById('temp-result').innerText = result.toFixed(2);
}

// SPEED
function convertSpeed() {
  const input = parseFloat(document.getElementById('speed-input').value);
  const from = document.getElementById('speed-from').value;
  const to = document.getElementById('speed-to').value;
  if (isNaN(input)) {
    document.getElementById('speed-result').innerText = 'Enter a number';
    return;
  }
  const toMS = {
    kmh: 0.2777777778,
    ms: 1,
    mph: 0.44704
  };
  const ms = input * toMS[from];
  const result = ms / toMS[to];
  document.getElementById('speed-result').innerText = result.toFixed(6);
}

// CURRENCY (live rates from exchangerate-api.com)
async function populateCurrencyDropdowns() {
  const fromSelect = document.getElementById('currency-from');
  const toSelect = document.getElementById('currency-to');
  if (!fromSelect || !toSelect) return;

  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    const codes = Object.keys(data.rates).sort();
    codes.forEach(code => {
      const o1 = document.createElement('option');
      o1.value = code;
      o1.textContent = code;
      fromSelect.appendChild(o1);
      const o2 = document.createElement('option');
      o2.value = code;
      o2.textContent = code;
      toSelect.appendChild(o2);
    });
    fromSelect.value = 'USD';
    toSelect.value = 'INR';
  } catch (err) {
    console.error('Currency dropdown error', err);
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('currency-input').value);
  const from = document.getElementById('currency-from').value;
  const to = document.getElementById('currency-to').value;
  if (isNaN(amount)) {
    document.getElementById('currency-result').innerText = 'Enter a number';
    return;
  }
  try {
    const r = await fetch('https://api.exchangerate-api.com/v4/latest/' + from);
    const j = await r.json();
    const rate = j.rates[to];
    const result = amount * rate;
    document.getElementById('currency-result').innerText = result.toFixed(2);
  } catch (err) {
    console.error('Currency conversion error', err);
    document.getElementById('currency-result').innerText = 'Error';
  }
}

// Populate currency dropdowns on load
document.addEventListener('DOMContentLoaded', () => {
  populateCurrencyDropdowns();
});

