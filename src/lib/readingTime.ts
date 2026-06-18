export function readingTimeMinutes(text: string): number {
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wpm));
}
