import { CityDto } from "../core/dto/city";

export function calcDistance(from: CityDto, to: CityDto): number {
    const R = 6371;
    const fromLat = from.lat * Math.PI/180;
    const toLat = to.lat * Math.PI/180;
    const distanceLat = (to.lat - from.lat) * Math.PI/180;
    const distanceLong = (to.long - from.long) * Math.PI/180;
    
    const a = Math.sin(distanceLat/2) * Math.sin(distanceLat/2) +
              Math.cos(fromLat) * Math.cos(toLat) *
              Math.sin(distanceLong/2) * Math.sin(distanceLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const distance = R * c; 
    return Number(distance.toFixed(0));
}

export function getRouteDistance(route: Array<number>, cities: Array<CityDto>) {
    let distance = 0;
    route.forEach((city, i) => {
      if (i !== route.length - 1) {
        distance += calcDistance(cities[route[i]], cities[route[i + 1]])
      } else {
        distance += calcDistance(cities[route[route.length - 1]], cities[route[0]])
      }
    })
    return distance;
}
