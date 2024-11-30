const last = (list) => {
    if (Array.isArray(list)) {

        const array = new Array(...list)
        return array[array.length - 1];
    } else {
        return undefined
    }
}