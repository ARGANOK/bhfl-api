const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http'); // 🔥 Add this

const app = express();
app.use(cors());
app.use(express.json());

// User Info
const userDetails = {
  full_name: 'john_doe',
  email: 'john@xyz.com',
  roll_number: 'ABCD123',
  dob: '17091999'
};

// Helpers
const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);
const isSpecialChar = (str) => /[^a-zA-Z0-9]/.test(str);

// Core logic
const processData = (data) => {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0,
    concat_string: ''
  };

  let alphaConcat = '';

  data.forEach(item => {
    const str = String(item);

    if (isNumber(str)) {
      const num = parseInt(str);
      result.sum += num;
      (num % 2 === 0 ? result.even_numbers : result.odd_numbers).push(str);
    } else if (isAlphabet(str)) {
      result.alphabets.push(str.toUpperCase());
      alphaConcat += str;
    } else if (isSpecialChar(str)) {
      result.special_characters.push(str);
    }
  });

  const reversed = alphaConcat.split('').reverse();
  result.concat_string = reversed.map((char, index) =>
    index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
  ).join('');

  result.sum = result.sum.toString();
  return result;
};

// API route
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' must be an array"
      });
    }

    const processedData = processData(data);

    res.status(200).json({
      is_success: true,
      user_id: `${userDetails.full_name}_${userDetails.dob}`.toLowerCase(),
      email: userDetails.email,
      roll_number: userDetails.roll_number,
      ...processedData
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "An error occurred while processing the request"
    });
  }
});

module.exports = serverless(app);
