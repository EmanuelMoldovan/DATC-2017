import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'senzorPipe'
})
export class SenzorPipe implements PipeTransform {
  transform(input: number): number {
      if (input >= 0 && input <= 10) return 1;

      if (input > 10) return 0;

      return -1;
  }
}