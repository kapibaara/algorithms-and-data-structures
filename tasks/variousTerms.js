
// По данному числу 1≤n≤10^9 найдите максимальное число k, для которого n можно представить как сумму k различных натуральных слагаемых. Выведите в первой строке число k, во второй — k слагаемых.

process.stdin.on('data', data => {
  let n = +data.toString().trim().split(' ')

  let count = 1
  const terms = []

  while (n > 0) {
    n -= count
    if (!terms.includes(n) && n !== count) {
      terms.push(count)
      count += 1
    } else {
      n += count
      count += 1
    }
  }

  console.log(terms.length)
  console.log(terms.join(' '))
})
