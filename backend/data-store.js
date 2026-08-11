const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile(filename, fallback) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Failed to read ${filename}:`, e.message);
  }
  return fallback;
}

function writeJsonFile(filename, data) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error(`Failed to write ${filename}:`, e.message);
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};
