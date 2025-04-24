const { execSync } = require("child_process");
const timestamps = String(
  execSync("grep -Eo '\\([0-9]{1,2}:[0-9]{2}:[0-9]{2}\\)' README.md")
);

const lines = timestamps.split("\n");
let totalSeconds = 0;

lines.forEach((line) => {
  const time = line.replace(/[()]/g, "");
  const parts = time.split(":");
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    totalSeconds += minutes * 60 + seconds;
  }
});

const days = Math.floor(totalSeconds / (24 * 3600));
let remainder = totalSeconds % (24 * 3600);
const hours = Math.floor(remainder / 3600);
remainder %= 3600;
const minutes = Math.floor(remainder / 60);
const seconds = remainder % 60;

console.log(`Total seconds: ${totalSeconds}`);
console.log(`Summary - ${days}:${hours}:${minutes}:${seconds}`);
