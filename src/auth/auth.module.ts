import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import {JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { TokenGuard} from "./auth.guard";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        PassportModule,
    ],
    providers: [AuthService, JwtStrategy, TokenGuard, LocalStrategy],
    exports: [AuthService ],
    controllers: [AuthController],
})


export class AuthModule {}