import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ดึง token จาก header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, // ✅ เพิ่ม "!" เพื่อไม่ให้เป็น undefined
    });
  }

  async validate(payload: any) {
    // payload ที่แนบมาตอนสร้าง token ใน auth.service.ts
    // เช่น { sub: 1, role: 'admin' }
    return {
      userId: payload.sub,
      role: payload.role,
    };
  }
}
