export function removeDuplicates(population: Array<Array<number>>, minSize: number) {
    for (let i = 0; i < population.length; i++) {
      for (let j = 0; j < population.length; j++) {
        if (i !== j && isArrayEqual(population[i], population[j]) && population.length > minSize) {
          population.splice(j, 1);
          j--;
        }
      }
    }
    return population;
  }

export function isArrayEqual(a: Array<number>, b: Array<number>) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}
