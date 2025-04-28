export {};

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function(): string {
  return this
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
