import { Pipe, PipeTransform } from '@angular/core';
import { BigNumberUtils } from '../logic/big-number-utils';

@Pipe({
  name: 'bignumber'
})
export class BignumberPipe implements PipeTransform {
  transform(value: any, decimals = 18): string {
    return BigNumberUtils.getStringFromBN(value, decimals);
  }
}
