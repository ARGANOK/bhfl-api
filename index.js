const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser);
app.use(cors());

const userDetails = {
  full_name: 'john_doe',
  email: 'john@xyz.com',
  roll_number: 'ABCD123',
  dob: '17091999'
};

const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);
const isSpecialChar = (str) => /[^a-zA-Z0-9]/.test(str);

const processData = (data) => {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0,
    concat_string: ''
  };

  const alphaChars = [];
  
  data.forEach(item => {
    const str = String(item);
    
    if (isNumber(str)) {
      const num = parseFloat(str);
      result.sum += num;
      if (num % 2 === 0) {
        result.even_numbers.push(str);
      } else {
        result.odd_numbers.push(str);
      }
    } else if (isAlphabet(str)) {
      const upper = str.toUpperCase();
      result.alphabets.push(upper);
      alphaChars.push(...upper.split('').reverse());
    } else if (isSpecialChar(str)) {
      result.special_characters.push(str);
    }
  });
  result.concat_string = alphaChars.map((char, index) => 
    index % 2 === 0 ? char.toLowerCase() : char
  ).join('');

  result.sum = String(result.sum);
  
  return result;
};

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
    
    res.json({
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});