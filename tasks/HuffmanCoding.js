// По данной непустой строке s длины не более 104, состоящей из строчных букв латинского алфавита, постройте оптимальный беспрефиксный код. В первой строке выведите количество различных букв k, встречающихся в строке, и размер получившейся закодированной строки. В следующих k строках запишите коды букв в формате "letter: code". В последней строке выведите закодированную строку.

process.stdin.on('data', data => {
  const top = 0;
  const parent = i => ((i + 1) >>> 1) - 1;
  const left = i => (i << 1) + 1;
  const right = i => (i + 1) << 1;

  class PriorityQueue {
    constructor (comparator = (a, b) => a > b) {
      this._heap = [];
      this._comparator = comparator;
    }
    size () {
      return this._heap.length;
    }
    isEmpty () {
      return this.size() === 0;
    }
    peek () {
      return this._heap[top];
    }
    push (...values) {
      values.forEach(value => {
        this._heap.push(value);
        this._siftUp();
      });
      return this.size();
    }
    pop () {
      const poppedValue = this.peek();
      const bottom = this.size() - 1;
      if (bottom > top) {
        this._swap(top, bottom);
      }
      this._heap.pop();
      this._siftDown();
      return poppedValue;
    }
    replace (value) {
      const replacedValue = this.peek();
      this._heap[top] = value;
      this._siftDown();
      return replacedValue;
    }
    _greater (i, j) {
      return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap (i, j) {
      [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp () {
      let node = this.size() - 1;
      while (node > top && this._greater(node, parent(node))) {
        this._swap(node, parent(node));
        node = parent(node);
      }
    }
    _siftDown () {
      let node = top;
      while (
        (left(node) < this.size() && this._greater(left(node), node)) ||
        (right(node) < this.size() && this._greater(right(node), node))
      ) {
        let maxChild =
          right(node) < this.size() && this._greater(right(node), left(node))
            ? right(node)
            : left(node);
        this._swap(node, maxChild);
        node = maxChild;
      }
    }
  }

  class Node {
    constructor (frequency, value) {
      this.frequency = frequency;
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  let str = data.toString().trim().split('');
  let sortedStr = [...str].sort();
  const letters = [];
  let letter = sortedStr[0];
  let count = 0;

  for (let i = 0; i <= sortedStr.length; i++) {
    if (letter === sortedStr[i]) {
      count += 1;
    } else {
      let node = new Node(count, letter);

      letters.push(node);
      count = 1;
      letter = sortedStr[i];
    }
  }

  if (letters.length === 1) {
    let codedStr = '';

    for (let i = 0; i < letters[0].frequency; i++) {
      codedStr += 0;
    }
    console.log(1, str.length);
    console.log(`${letters[0].value}: 0`);
    console.log(codedStr);
  } else {
    const queue = new PriorityQueue((a, b) => a.frequency < b.frequency);
    queue.push(...letters);

    for (let i = 0; i < str.length; i++) {
      while (queue.size() !== 1) {
        let node1 = queue.pop();
        let node2 = queue.pop();
        let frequency = +node1.frequency + +node2.frequency;
        let node = new Node(frequency, null);

        node.right = node2;
        node.left = node1;

        queue.push(node);
      }
    }

    const lettersMap = {};
    letters.forEach(letter => {
      lettersMap[letter.value] = '';
    });

    const preOrder = (node, currentCode) => {
      if (node == null) return;

      if (node.value) {
        lettersMap[node.value] = currentCode;
      }
      preOrder(node.left, currentCode + '0');
      preOrder(node.right, currentCode + '1');
    };

    preOrder(queue.peek(), '');

    let codedStr = '';

    str.forEach(letter => {
      codedStr += lettersMap[letter];
    });

    console.log(letters.length, codedStr.length);
    for (let key in lettersMap) {
      console.log(`${key}: ${lettersMap[key]}`);
    };
    console.log(codedStr);
  }
});
