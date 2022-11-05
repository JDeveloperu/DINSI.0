import { BignumberPipe } from './bignumber.pipe';

describe('BignumberPipe', () => {
  it('create an instance', () => {
    const pipe = new BignumberPipe();
    expect(pipe).toBeTruthy();
  });
});
