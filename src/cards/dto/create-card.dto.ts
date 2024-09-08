import {IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    description: string;
}