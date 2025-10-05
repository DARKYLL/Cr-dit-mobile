const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const PAYDUNYA_API_URL = 'https://app.paydunya.com/api/v1/checkout-invoice/create';
const PAYDUNYA_PRIVATE_KEY = 'live_private_tluEYNuYsDTaNVAAP1LHEPyWROe'; // 🔑 ne jamais mettre dans le client
const PAYDUNYA_PUBLIC_KEY = 'live_public_tOne4v3PKUUc879gy4R014qMzB8';

app.post('/create-invoice', async (req, res) => {
  const { amount, description } = req.body;

  try {
    const response = await axios.post(PAYDUNYA_API_URL, {
      name: description,
      total_amount: amount,
      callback_url: 'https://ton-site.com/confirmation.html', // page de confirmation
      cancel_url: 'https://ton-site.com/index.html',
    }, {
      headers: {
        'Authorization': Token ${PAYDUNYA_PRIVATE_KEY},
        'Content-Type': 'application/json',
      }
    });

    res.json({ invoice_url: response.data.response.checkout_url });
  } catch (err) {
    console.error(err.response.data);
    res.status(500).send('Erreur PayDunya');
  }
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));