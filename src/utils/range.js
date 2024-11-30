/*
  * range(4); // => [0, 1, 2, 3] 
  * range(-4); // => [0, -1, -2, -3]
  * range(1, 5); // => [1, 2, 3, 4]
  * range(0, 20, 5); // => [0, 5, 10, 15]
  * range(0, -4, -1); // => [0, -1, -2, -3]
  * range(1, 4, 0); // => [1, 1, 1]
  * range(0); // => []
*/

function range(start = 0, end, step = 1) {
    const array = [];
    if (arguments.length === 1) {
      end = start
      start = 0;
    }
    let item = start;
  
    if (step !== 0) {
      if (end > 0) {
  
        while (item < end) {
          array.push(item);
          item += step;
        }
      } else {
        while (item > end) {
          array.push(item);
          item -= step
        }
      }
    } else {
      let length = Math.abs(end - start)
      for (let j = 0; j < length; j++) {
        array.push(step)
      }
    }
  
    return array;
  }
  