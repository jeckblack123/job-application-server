import { ApplicationModule } from './application/application.module';
import { AuthModule } from './authentication/auth.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user-module/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user-module/user.model';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/role.model';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';

@Module({
  imports: [
    ApplicationModule,
    AuthModule,
    RolesModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'i460601',
      database: 'test3',
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
