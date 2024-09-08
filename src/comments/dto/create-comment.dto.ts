import {IsString, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    @ApiProperty()
    text: string;
}