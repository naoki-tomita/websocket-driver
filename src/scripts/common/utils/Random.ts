const MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function createRandomString(size: number) {
  return Array(size).fill(null).map(() => MAP[Math.floor(Math.random() * MAP.length)]).join("");
}