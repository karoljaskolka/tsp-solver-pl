import { isArrayEqual, removeDuplicates } from './array';

describe('Arrays', () => {

    it('should return that arrays are equal', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 4];
        expect(isArrayEqual(a, b)).toEqual(true);
    });

    it('should return that arrays are not equal', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3, 0];
        expect(isArrayEqual(a, b)).toEqual(false);
    });

    it('should return that arrays are not equal, due to different length', () => {
        const a = [1, 2, 3, 4];
        const b = [1, 2, 3];
        expect(isArrayEqual(a, b)).toEqual(false);
    });

    it('should remove duplicates', () => {
        const population = [
            [1, 2, 3],
            [1, 2, 3], // REMOVE DUPLICATE
            [2, 3, 1],
            [3, 2, 1],
            [1, 3, 2],
            [3, 2, 1], // REMOVE DUPLICATE
        ];
        const newPopulation = removeDuplicates(population, 0);

        expect(newPopulation.length).toEqual(4);
        expect(newPopulation[0]).toEqual([1, 2, 3]);
        expect(newPopulation[1]).toEqual([2, 3, 1]);
        expect(newPopulation[2]).toEqual([3, 2, 1]);
        expect(newPopulation[3]).toEqual([1, 3, 2]);
    });

    it('should remove duplicates while size is correct', () => {
        const population = [
            [1, 2, 3],
            [1, 2, 3], // REMOVE DUPLICATE
            [2, 3, 1],
            [3, 2, 1],
            [1, 3, 2],
            [3, 2, 1], // DUPLICATE BUT LENGTH === MIN SIZE
        ];
        const newPopulation = removeDuplicates(population, 5);

        expect(newPopulation.length).toEqual(5);
        expect(newPopulation[0]).toEqual([1, 2, 3]);
        expect(newPopulation[1]).toEqual([2, 3, 1]);
        expect(newPopulation[2]).toEqual([3, 2, 1]);
        expect(newPopulation[3]).toEqual([1, 3, 2]);
        expect(newPopulation[4]).toEqual([3, 2, 1]);
    });

});
