// Первая строка содержит количество предметов 1≤n≤103 и вместимость рюкзака 0≤W≤2⋅106. Каждая из следующих n строк задаёт стоимость 0≤ci≤2⋅106 и объём 0<wi≤2⋅106 предмета (n, W, ci, wi — целые числа). Выведите максимальную стоимость частей предметов (от каждого предмета можно отделить любую часть, стоимость и объём при этом пропорционально уменьшатся), помещающихся в данный рюкзак, с точностью не менее трёх знаков после запятой.

const getMaxCost = (items, maxWeight) => {
  let maxCost = 0

  items.forEach(item => {
    let currentWeight = +item[1]
    let currentCount = +item[0]

    if (maxWeight > 0) {
      if (maxWeight < currentWeight) {
        let backpackWeight = currentWeight - maxWeight
        let partOfcurrentWeight = currentWeight - backpackWeight
        currentCount = currentCount * partOfcurrentWeight / currentWeight

        maxCost += currentCount
        maxWeight -= currentWeight
      } else {
        maxWeight -= +item[1]
        maxCost += +item[0]
      }
    }
  })
  return maxCost.toFixed(3)
}

process.stdin.on('data', data => {
  const _data = data
    .toString()
    .trim()
    .split('\n')

  const input = _data.map(x =>
    x
      .toString()
      .trim()
      .split(' ')
      .map(x => x[0] ? parseInt(x) : null)
  )

  const maxWeight = input.splice(0, 1)[0][1]
  const items = input.sort((a, b) => a[0] / a[1] - b[0] / b[1]).filter(item => item[0] !== 0).reverse()

  console.log(getMaxCost(items, maxWeight))
  process.exit()
})
