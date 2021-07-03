import { getRandomRoute } from './route';

describe('Routes', () => {

    it('should return random route with 0 1 2 3 numbers', () => {
        const randRoute = getRandomRoute(4);

        expect(randRoute.length).toEqual(4);
        expect(randRoute).toContain(0);
        expect(randRoute).toContain(1);
        expect(randRoute).toContain(2);
        expect(randRoute).toContain(3);
        expect(randRoute).not.toContain(4);
    });

});
