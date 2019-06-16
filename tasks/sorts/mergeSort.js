// Первая строка содержит число 1≤n≤105, вторая — массив A[1…n], содержащий натуральные числа,
// не превосходящие 109. Необходимо посчитать число пар индексов 1≤i<j≤n, для которых A[i]>A[j].
// (Такая пара элементов называется инверсией массива. Количество инверсий в массиве является в некотором смысле его мерой неупорядоченности:
// например, в упорядоченном по неубыванию массиве инверсий нет вообще, а в массиве, упорядоченном по убыванию, инверсию образуют каждые два элемента.)

// чтение инпута
// const data = require('fs').readFileSync(0, 'utf8').trim().split('\n'); -
// const arr = data[1].split(' ').map(Number);

const merge = (firstArr, secondArr) => {
  const sortArr = [];
  let i = 0;
  let j = 0;
  let count = 0;

  while (i < firstArr.length && j < secondArr.length) {
    if (firstArr[i] <= secondArr[j]) {
      sortArr.push(firstArr[i]);
      i = i + 1;
    } else {
      sortArr.push(secondArr[j]);
      j = j + 1;
      count += firstArr.length - i;
    }
  }

  const mergedArr = [
    ...sortArr,
    ...firstArr.slice(i),
    ...secondArr.slice(j)
  ];
  return [
    count,
    mergedArr
  ];
};

const mergeSort = (arr) => {
  const medium = Math.floor(arr.length / 2);

  if (arr.length < 2) {
    return [0, arr];
  }

  const firstArr = arr.slice(0, medium);
  const secondArr = arr.slice(medium);

  const [ leftCount, leftArr ] = mergeSort(firstArr);
  const [ rightCount, rightArr ] = mergeSort(secondArr);
  const [ mergeCount, mergedArr ] = merge(leftArr, rightArr);
  const inversionsCount = leftCount + rightCount + mergeCount;
  return [ inversionsCount, mergedArr ];
};

const arr = [2, 3, 9, 2, 9];

console.log(mergeSort(arr));
