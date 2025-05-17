import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'priceWithTax', standalone: true })
export class PriceWithTaxPipe implements PipeTransform {
  transform(price: number, taxRate: number = 0.27): string {
    return (price * (1 + taxRate)).toFixed(2) + 'USD';
  }
}