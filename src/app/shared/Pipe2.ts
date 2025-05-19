import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(value: number, discountRate: number = 0): number {
    if (value == null || isNaN(value)) {
      return 0;
    }
    // A discountRate értékének 0 és 1 közötti számnak kell lennie (például 0.1 = 10% kedvezmény)
    if (discountRate < 0 || discountRate > 1) {
      return value;
    }
    return value * (1 - discountRate);
  }
}
