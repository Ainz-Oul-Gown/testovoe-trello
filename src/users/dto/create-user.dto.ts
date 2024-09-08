import {IsString, IsEmail, MinLength, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty()
    username: string;

    @IsEmail()
    @MinLength(5)
    @MaxLength(100)
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @ApiProperty()
    password: string;
}