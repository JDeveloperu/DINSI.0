import BigNumber from "bignumber.js";

export class BigNumberUtils {
  static getBigNumberFromDecimal(value: number, decimals = 18) {
    while (value < 1 && value > 0) {
      value *= 10;
      decimals -= 1;
    }

    while (decimals > 0 && `${value}`.includes('.')) {
      value *= 10;
      decimals -= 1;
    }

    const pow = new BigNumber(10).pow(decimals);
    return new BigNumber(value).multipliedBy(pow).toString();
  }

  static getStringFromBN(value: any, decimals: number) {
    return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals)).toString();
  }

  static getDecimalFromBN(value: any, decimals: number) {
    return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
  }
}
