// В первой строке даны целое число 1≤n≤105 и массив A[1…n] из n различных натуральных чисел, не превышающих 109, в порядке возрастания, во второй — целое число 1≤k≤10^5 и k натуральных чисел b1,…,bk, не превышающих 109. Для каждого i от 1 до k необходимо вывести индекс 1≤j≤n, для которого A[j]=bi, или −1, если такого j нет.

const data = require('fs').readFileSync(0, 'utf8').trim().split('\n');

const [firstArr, secondArr] = data.map(arr => arr.split(' ').slice(1).map(Number));

const binarySearch = (arr, k) => {
  let leftPoint = 0;
  let rightPoint = arr.length - 1;

  while (leftPoint <= rightPoint) {
    let median = Math.round((leftPoint + rightPoint) / 2);

    if (arr[median] === k) {
      return median + 1;
    } else if (k < arr[median]) {
      rightPoint = median - 1;
    } else {
      leftPoint = median + 1;
    }
  }

  return -1;
};

const output = [];
for (let i = 0; i < secondArr.length; i++) {
  let num = secondArr[i];

  const index = binarySearch(firstArr, num);
  output.push(index);
}

console.log(output.join(' '));
