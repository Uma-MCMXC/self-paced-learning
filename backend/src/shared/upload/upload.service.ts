import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  getFileUrl(file: Express.Multer.File, type?: string): string {
    const folder = type || 'general';
    return `/uploads/${folder}/${file.filename}`;
  }
}
