// backend/src/shared/upload/upload.module.ts

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // ป้องกันการใช้ type ที่ไม่ใช่ string
          const rawType = req.query.type;
          const type = Array.isArray(rawType) ? rawType[0] : rawType;
          const safeType = typeof type === 'string' ? type : 'general';

          // สร้าง path สำหรับเก็บไฟล์
          const uploadPath = join(process.cwd(), 'uploads', safeType);

          // สร้างโฟลเดอร์ถ้ายังไม่มี
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
          // ตั้งชื่อไฟล์ใหม่ด้วย timestamp เพื่อป้องกันชื่อซ้ำ
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = uniqueSuffix + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
