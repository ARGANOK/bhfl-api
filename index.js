const processData = (data) => {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0,
    concat_string: ''
  };

  let alphaChars = '';

  data.forEach(item => {
    const str = String(item);

    if (isNumber(str)) {
      const num = parseInt(str);
      result.sum += num;
      (num % 2 === 0 ? result.even_numbers : result.odd_numbers).push(str);
    } else if (isAlphabet(str)) {
      const upper = str.toUpperCase();
      result.alphabets.push(upper);
      alphaChars += str;
    } else if (isSpecialChar(str)) {
      result.special_characters.push(str);
    }
  });

  const reversed = alphaChars.split('').reverse();
  result.concat_string = reversed.map((c, i) =>
    i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()
  ).join('');

  result.sum = result.sum.toString();
  return result;
};
