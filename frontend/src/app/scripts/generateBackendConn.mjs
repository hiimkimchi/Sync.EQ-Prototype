import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiUrl: process.env['API_URL'],
};

fs.writeFileSync('src/assets/config.json', JSON.stringify(config, null, 2));
console.log('\n\nGenerated src/assets/config.json');
