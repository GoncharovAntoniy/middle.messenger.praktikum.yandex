function first(list) {
    if (Array.isArray(list)) {
        const array = new Array(...list)
        return array[0];
    } else {
        return undefined
    }
}