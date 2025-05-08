// prisma/prisma.config.ts
import * as fs from 'fs';
import * as path from 'path'; // ✅ สำคัญมาก

const modelDir = path.join(__dirname, 'models');
const outputFile = path.join(__dirname, 'schema.prisma');

const header = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

const modelFiles = fs
  .readdirSync(modelDir)
  .filter((file) => file.endsWith('.prisma'))
  .map((file) => fs.readFileSync(path.join(modelDir, file), 'utf-8'))
  .join('\n\n');

fs.writeFileSync(outputFile, header + '\n\n' + modelFiles);

console.log('✅ schema.prisma generated successfully from models/');