// Восстановите строку по её коду и беспрефиксному коду символов.
// В первой строке входного файла заданы два целых числа k и l через пробел — количество различных букв, встречающихся в строке, и размер получившейся закодированной строки, соответственно. В следующих k строках записаны коды букв в формате "letter: code". Ни один код не является префиксом другого. Буквы могут быть перечислены в любом порядке. В качестве букв могут встречаться лишь строчные буквы латинского алфавита; каждая из этих букв встречается в строке хотя бы один раз. Наконец, в последней строке записана закодированная строка. Исходная строка и коды всех букв непусты. Заданный код таков, что закодированная строка имеет минимальный возможный размер.

// В первой строке выходного файла выведите строку s. Она должна состоять из строчных букв латинского алфавита. Гарантируется, что длина правильного ответа не превосходит 104 символов.

process.stdin.on('data', data => {
  const _data = data
    .toString()
    .trim()
    .split('\n')
    .slice(1);

  let lettersMap = {};
  let coddedStr = _data.splice(-1).toString();
  const lettersCode = _data.map(x => x.split(' '));

  lettersCode.forEach(letterCode => {
    let letter = letterCode[0].slice(0, 1);
    let value = letterCode[1];

    lettersMap[value] = letter;
  });

  let decodedStr = '';
  let letter = coddedStr[0];

  for (let i = 1; i <= coddedStr.length; i++) {
    if (lettersMap[letter]) {
      decodedStr += lettersMap[letter];
      letter = '';
    }
    letter += coddedStr[i];
  }

  console.log(decodedStr);
});
