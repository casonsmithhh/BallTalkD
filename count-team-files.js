const fs = require('fs');
const path = require('path');

function countTsxFiles(dir) {
  let count = 0;
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        count += countTsxFiles(fullPath);
      } else if (item.endsWith('.tsx')) {
        count++;
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    return 0;
  }
  
  return count;
}

const teamDir = path.join(__dirname, 'app', 'team');
const tsxCount = countTsxFiles(teamDir);
console.log(tsxCount);