// В первой строке задано два целых числа 1≤n≤50000 и 1≤m≤50000 — количество отрезков и точек на прямой,
// соответственно. Следующие n строк содержат по два целых числа ai и bi (ai≤bi) — координаты концов отрезков.
// Последняя строка содержит m целых чисел — координаты точек.
// Все координаты не превышают 108 по модулю.
// Точка считается принадлежащей отрезку, если она находится внутри него или на границе.
// Для каждой точки в порядке появления во вводе выведите, скольким отрезкам она принадлежит.

const input = `
2 2
1 4
1 2
1 1
0 1`;

const data = input.trim().split('\n').map(el => el.split(' ').map(Number));
const [segmentsNumber, pointsNumber] = data[0];
const segments = data.slice(1, segmentsNumber + 1);
const points = data[data.length - 1];

const LEFT = -1;
const POINT = 0;
const RIGHT = 1;

class Point {
  constructor (cord, type, index) {
    this.cord = cord;
    this.type = type;
    this.index = index;
  }
}

const allPoints = [];

for (let i = 0; i < segmentsNumber; i++) {
  let rightPoint = new Point(segments[i][1], RIGHT, -1);
  let leftPoint = new Point(segments[i][0], LEFT, -1);

  allPoints.push(leftPoint);
  allPoints.push(rightPoint);
}

for (let i = 0; i < pointsNumber; i++) {
  let point = new Point(points[i], POINT, i);

  allPoints.push(point);
}

const answer = new Array(pointsNumber);

allPoints.sort((a, b) => {
  if (a.cord !== b.cord) {
    return a.cord - b.cord;
  } else {
    return a.type - b.type;
  }
});

let count = 0;

console.log(allPoints);
for (let i = 0; i < allPoints.length; i++) {
  if (allPoints[i].type === LEFT) {
    count = count + 1;
  } else if (allPoints[i].type === RIGHT) {
    count = count - 1;
  } else {
    answer[allPoints[i].index] = count;
  }
}

console.log(answer.join(' '));
