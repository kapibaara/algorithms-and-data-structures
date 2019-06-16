// По данным n отрезкам необходимо найти множество точек минимального размера, для которого каждый из отрезков содержит хотя бы одну из точек.
// В первой строке дано число 1≤n≤100 отрезков. Каждая из последующих n строк содержит по два числа 0≤l≤r≤109, задающих начало и конец отрезка. Выведите оптимальное число m точек и сами m точек. Если таких множеств точек несколько, выведите любое из них.

const dotOnLine = (line, dot) => line[0] <= dot && line[1] >= dot;

const getDots = lines => {
  const dots = [];
  const soretedLines = lines.sort((a, b) => a[1] - b[1]);

  dots.push(soretedLines[0][1]);

  soretedLines.forEach(line => {
    const lastDot = dots[dots.length - 1];
    if (!dotOnLine(line, lastDot)) {
      dots.push(line[1]);
    }
  });

  return dots;
};

process.stdin.on('data', data => {
  const _data = data
    .toString()
    .trim()
    .split('\n');

  const input = _data.slice(1).map(x =>
    x
      .toString()
      .trim()
      .split(' ')
      .map(x => parseInt(x))
  );
  const dots = getDots(input);

  console.log(dots.length);
  console.log(dots.join(' '));
  process.exit();
});
