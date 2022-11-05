export interface IOwnable {
  owner(): Promise<string>;
}
