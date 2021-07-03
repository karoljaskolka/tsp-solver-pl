export function orderedCrossover(individualA: Array<number>, individualB: Array<number>, k1: number, k2: number) {
    if (k1 > k2) {
        const temp = k1;
        k1 = k2;
        k2 = temp;
    }

    const offspringA = Array.from(Array(individualA.length).fill(-1));
    const offspringB = Array.from(Array(individualB.length).fill(-1));

    let individualAT = [...individualA.slice(k2, individualA.length), ...individualA.slice(0, k1), ...individualA.slice(k1, k2)];
    let individualBT = [...individualB.slice(k2, individualB.length), ...individualB.slice(0, k1), ...individualB.slice(k1, k2)];

    offspringA.splice(k1, (k2 - k1), ...individualA.slice(k1, k2));
    offspringB.splice(k1, (k2 - k1), ...individualB.slice(k1, k2));

    const leftA = [...individualA.slice(k2, individualA.length), ...individualA.slice(0, k1)];
    const leftB = [...individualB.slice(k2, individualA.length), ...individualB.slice(0, k1)];

    individualBT.forEach((city, i) => {
        if (!leftA.includes(city)) {
            individualBT = individualBT.filter(c => c !== city);
            i--;
        }
    });

    individualAT.forEach((city, i) => {
        if (!leftB.includes(city)) {
            individualAT = individualAT.filter(c => c !== city);
            i--;
        }
    });

    individualAT.forEach((city, i) => {
        offspringB[(k2 + i) % individualB.length] = city;
    });

    individualBT.forEach((city, i) => {
        offspringA[(k2 + i) % individualA.length] = city;
    });

    return { offspringA, offspringB };
}
