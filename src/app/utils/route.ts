export function getRandomRoute(length: number): Array<number> {
    const cities = Array.from(Array(length).keys());
    const route = [];
    while (cities.length) {
        const index = Math.floor(Math.random() * cities.length) + 0;
        route.push(cities[index]);
        cities.splice(index, 1);
    }
    return route;
}
