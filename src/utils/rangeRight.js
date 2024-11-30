const rangeRight = (start, end, step, isRight = false) => {
    const array = [];
    if (end === undefined) {
        end = start
        start = 0;
    }
    if (step === undefined) {
        step = 1
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

    return isRight ? array.reverse() : array;
}
