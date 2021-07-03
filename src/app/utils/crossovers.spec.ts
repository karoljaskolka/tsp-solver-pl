import { orderedCrossover } from './crossovers';

describe('Crossovers', () => {
    it('OX - should return correct offsprings for k1=3, k2=7', () => {
        const individualA = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]; // IA [ 1 2 3 | 4 5 6 7 | 8 9 ]
        const individualB = [ 4, 5, 2, 1, 8, 7, 6, 9, 3]; // IB [ 4 5 2 | 1 8 7 6 | 9 3 ]

        const { offspringA, offspringB } = orderedCrossover(individualA, individualB, 3, 7);

        expect(offspringA).toEqual([2, 1, 8, 4, 5, 6, 7, 9, 3]); // OA [ 2 1 8 | 4 5 6 7 | 9 3 ]
        expect(offspringB).toEqual([3, 4, 5, 1, 8, 7, 6, 9, 2]); // OB [ 3 4 5 | 1 8 7 6 | 9 2 ]
      });

    it('OX - should return correct offsprings for k1=7, k2=3', () => {
        const individualA = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]; // IA [ 1 2 3 | 4 5 6 7 | 8 9 ]
        const individualB = [ 4, 5, 2, 1, 8, 7, 6, 9, 3]; // IB [ 4 5 2 | 1 8 7 6 | 9 3 ]

        const { offspringA, offspringB } = orderedCrossover(individualA, individualB, 7, 3);

        expect(offspringA).toEqual([2, 1, 8, 4, 5, 6, 7, 9, 3]); // OA [ 2 1 8 | 4 5 6 7 | 9 3 ]
        expect(offspringB).toEqual([3, 4, 5, 1, 8, 7, 6, 9, 2]); // OB [ 3 4 5 | 1 8 7 6 | 9 2 ]
      });
});
