// src/config/database-config/database-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUri(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getDatabaseOptions() {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
