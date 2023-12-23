function generateString(params) {
    const {
      length = 10,
      numbers = false,
      uppercase = false,
      lowercase = true,
      symbols = false,
      delimiter = false,
      delimiter_value = 1
    } = params;

    let charset = '';

    if (lowercase) {
      charset += 'a';
    }
  
    if (uppercase) {
      charset += 'A';
    }

    if (numbers) {
      charset += '7';
    }

    if (symbols) {
      charset += '$';
    }
  
    let result = '';
    
    if (delimiter) {
      const tabl = {
        4: {4:1, 9:2, 14:3, 19:4},
        5: {5:1, 11:2, 17:3, 23:4},
        6: {6:1, 13:2, 20:3, 27:4},
      }
      const part = tabl[delimiter_value][length]
      result = charset.repeat(100);
      result = result.substring(0, delimiter_value)
      result += '-'
      result = result.repeat(part);
      result = result.substring(0, length)

      return result;
    }
    
    result = charset.repeat(100);
    result = result.substring(0, length)
  
    return result;
  }
export default generateString