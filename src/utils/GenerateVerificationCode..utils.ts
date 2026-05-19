export function generateVerificationCode(): string {
  const timestampSegment = Number(String(Date.now()).slice(-4));
  const randomSegment = Math.floor(Math.random() * 10000);
  const codeNumber = (timestampSegment * 10000 + randomSegment) % 100000000;
  return String(codeNumber).padStart(8, '0');
}
