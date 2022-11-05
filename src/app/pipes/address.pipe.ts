import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) {
      return "";
    }

    // 0x123...123

    return value.substring(0, 5) + "..." + value.substring(value.length - 3);
  }
}
