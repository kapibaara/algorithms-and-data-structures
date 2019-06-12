// По данным двум числам 1≤a,b≤2⋅109 найдите их наибольший общий делитель.

var stdin = process.openStdin()
stdin.on('data', function (data) {
  var a = data.toString().split(' ')[0]
  var b = data.toString().split(' ')[1]

  const findNOD = (a, b) => {
    if (!a) {
      return b
    } else if (!b) {
      return a
    } else if (a >= b) {
      return findNOD(a % b, b)
    } else if (b >= a) {
      return findNOD(b % a, a)
    }
  }

  console.log(findNOD(a, b))
})
