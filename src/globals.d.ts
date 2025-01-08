export {};

declare global {
  interface Window {
    userlog: (method: string, ...args: any[]) => void;
    userlogq: any[];
  }
}
