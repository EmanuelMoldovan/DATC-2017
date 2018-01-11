import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusParcarePipe'
})
export class StatusParcarePipe implements PipeTransform {
  transform(input: number): string {
      switch (input) {
        case -1: return "yellow";
        case 0: return "green";
        case 1: return "red";
        case undefined: return "black";
      }
  }
}