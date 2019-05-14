import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: string[] =  ['Sushi', 'Ramen', 'Italia', 'Europa', 'Burger', 'Healthy', 'Street food'];

  constructor() { }

  getConfig(): string[] {
    return this.config;
  }

  setConfig(config: string[]) {
    this.config = config;
  }
}
