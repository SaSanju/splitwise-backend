// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/database-config/database-config.module';
import { DatabaseConfigService } from './config/database-config/database-config.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Specifies the .env file location
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (configService: DatabaseConfigService) => ({
        uri: configService.getDatabaseUri(),
      }),
      inject: [DatabaseConfigService],
    }),
    UsersModule,
    AuthModule,
    GroupsModule,
    // other modules go here
  ],
})
export class AppModule {}
