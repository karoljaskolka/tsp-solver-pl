import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { removeDuplicates } from 'src/app/utils/array';
import { orderedCrossover } from 'src/app/utils/crossovers';
import { getRouteDistance } from 'src/app/utils/distance';
import { swap } from 'src/app/utils/operations';
import { getRandomRoute } from 'src/app/utils/route';

@Component({
  selector: 'tsp-genetic-algorithm-solver',
  templateUrl: './genetic-algorithm-solver.component.html',
  styleUrls: ['./genetic-algorithm-solver.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneticAlgorithmSolverComponent implements OnInit {
  bestRoute: Array<number> = [];
  bestScore: number;
  generationNumber: number;

  cities: CityDto[];
  isRunning: boolean = false;
  delayTime: number = 250;

  form: FormGroup = new FormGroup({
    populationSize: new FormControl(75),
    generations: new FormControl(50),
    selection: new FormControl('rank'),
    crossover: new FormControl('OX'),
    mutation: new FormControl('swap'),
    mutationRate: new FormControl(5),
  });

  constructor(private citiesService: CitiesService, private cdRef: ChangeDetectorRef) { }

  get populationList(): Array<number> {
    return [10, 25, 50, 75, 100];
  }

  get generationsList(): Array<number> {
    return [10, 25, 50, 75, 100];
  }

  get mutationRateList(): Array<number> {
    return [1, 5, 10];
  }

  get selectionList(): Array<string> {
    return ['rank'];
  }

  get mutationList(): Array<string> {
    return ['swap', 'insert', 'invert'];
  }

  get crossoverList(): Array<string> {
    return ['OX'];
  }

  get populationSize(): number {
    return this.form.value.populationSize;
  }

  get generations(): number {
    return this.form.value.generations;
  }

  get mutationRate(): number {
    return this.form.value.mutationRate;
  }

  get selection(): string {
    return this.form.value.selection;
  }

  get mutation(): string {
    return this.form.value.mutation;
  }

  get crossover(): string {
    return this.form.value.crossover;
  }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cdRef.markForCheck();
    });
  }

  async solve(): Promise<void> {
    this.isRunning = true;
    this.generationNumber = 0;
    let population: Array<Array<number>> = [];
    for (let i = 0; i < this.populationSize; i++) {
      population.push(getRandomRoute(this.cities.length));
    }
    this.bestRoute = population[0];
    this.bestScore = getRouteDistance(population[0], this.cities);
    this.setBestRouteAndScore(population);
    for (let i = 0; i < this.generations; i++) {
      this.generationNumber++;
      // selection
      if (population.length > this.populationSize) {
        if (this.selection === 'rank') { population = this.sortPopulation(population).slice(0, this.populationSize); }
      }

      // crossover
      for (let j = 0; j < this.populationSize; j++) {
        const x = Math.floor(Math.random() * this.populationSize);
        const y = Math.floor(Math.random() * this.populationSize);
        const k1 = Math.floor(Math.random() * this.cities.length);
        const k2 = Math.floor(Math.random() * this.cities.length);
        switch (this.crossover) {
          case 'OX':
            const { offspringA, offspringB } = orderedCrossover(population[x], population[y], k1, k2);
            population.push(offspringA, offspringB);
            break;
        }
      }

      // mutation
      for (let j = 0; j < population.length; j++) {
        const rand = Math.floor(Math.random() * 100);
        if (rand < this.mutationRate) {
          const x = Math.floor(Math.random() * this.cities.length);
          const y = Math.floor(Math.random() * this.cities.length);
          switch (this.mutation) {
            case 'swap':
              population[j] = swap(population[j], x, y);
              break;
            case 'insert':
              population[j] = swap(population[j], x, y);
              break;
            case 'invert':
              population[j] = swap(population[j], x, y);
              break;
          }
        }
      }

      population = removeDuplicates(population, this.populationSize);

      this.setBestRouteAndScore(population);
      await this.delay();
      this.cdRef.markForCheck();
    }
    this.isRunning = false;
  }

  clear(): void {
    this.bestRoute = [];
    this.generationNumber = 0;
  }

  setBestRouteAndScore(population: Array<Array<number>>) {
    for (let i = 0; i < population.length; i++) {
      const distance = getRouteDistance(population[i], this.cities);
      if (distance < this.bestScore) {
        this.bestRoute = population[i];
        this.bestScore = distance;
      }
    }
  }

  sortPopulation(population: Array<Array<number>>) {
    return population.sort((a, b) => getRouteDistance(a, this.cities) - getRouteDistance(b, this.cities));
  }

  async delay() {
    return new Promise((res) => setTimeout(res, this.delayTime));
  }

}
