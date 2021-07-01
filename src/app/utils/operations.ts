export function swap(array: Array<number>, i, j): Array<number> {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}

export function insert(array: Array<number>, i, j): Array<number> {
    const temp = array[i];
    array = array.filter(e => e !== temp);
    array.splice(j, 0, temp);
    return array;
}

export function invert(array: Array<number>, i, j): Array<number> {
    let invertPart: number[];
    if (i > j) {
        invertPart = array.slice(j, i).reverse();
        array.splice(j, i - j);
        array.splice(j, 0, ...invertPart);
    } else {
        invertPart = array.slice(i, j).reverse();
        array.splice(i, j - i);
        array.splice(i, 0, ...invertPart);
    }
    return array;
}
