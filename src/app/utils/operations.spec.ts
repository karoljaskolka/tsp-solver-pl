import { insert, invert, swap } from './operations';

describe('Operations', () => {
    it('should swap array[1] with array[3]', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = swap(array, 1, 3);
        expect(newArray).toEqual([0, 3, 2, 1, 4, 5]);
    });

    it('should swap array[3] with array[1]', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = swap(array, 3, 1);
        expect(newArray).toEqual([0, 3, 2, 1, 4, 5]);
    });

    it('should insert array[1] before array[4]', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = insert(array, 1, 4);
        expect(newArray).toEqual([0, 2, 3, 1, 4, 5]);
    });

    it('should insert array[4] before array[1]', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = insert(array, 4, 1);
        expect(newArray).toEqual([0, 4, 1, 2, 3, 5]);
    });

    it('should invert elements from 1 before 4', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = invert(array, 1, 4);
        expect(newArray).toEqual([0, 3, 2, 1, 4, 5]);
    });

    it('should invert elements from 1 before 4 when arguments are in different order', () => {
        const array = [0, 1, 2, 3, 4, 5];
        const newArray = invert(array, 4, 1);
        expect(newArray).toEqual([0, 3, 2, 1, 4, 5]);
    });

});
