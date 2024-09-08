import {IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @ApiProperty()
    title: string;
}