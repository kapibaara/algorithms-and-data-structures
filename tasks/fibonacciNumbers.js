// Дано целое число 1≤n≤40, необходимо вычислить n-е число Фибоначчи (напомним, что F0=0, F1=1 и Fn=Fn−1+Fn−2 при n≥2).

var stdin = process.openStdin()

stdin.on('data', function (data) {
  var n = data.toString().split(' ')

  const res = [0, 1]
  const fib = n => {
    if (n === 0) {
      return res[0]
    }

    if (n === 1) {
      return res[1]
    }

    if (!res[n]) {
      res[n] = fib(n - 2) + fib(n - 1)
    }

    return res[n]
  }

  console.log(fib(n))
})
