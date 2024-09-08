import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Вход' })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.signIn(req.body.email, req.body.password);
    }
}