export function getRandomRoute(length: number) {
    const cities = Array.from(Array(18).keys());
    const route = [];
    while(cities.length) {
        const index = Math.floor(Math.random() * cities.length) + 0;
        route.push(cities[index]);
        cities.splice(index, 1);
    }
    return route;
}
