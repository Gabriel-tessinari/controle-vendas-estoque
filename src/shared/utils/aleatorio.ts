export class Aleatorios {
  static getString(prefix = 'Item', length = 5): string {
    const random: string = Math.random().toString(36).substring(2, 2 + length);
    return `${prefix}-${random}`;
  }

  static getInt(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  static getFloat(min = 10, max = 200, decimals = 2): number {
    const num: number = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
  }
}