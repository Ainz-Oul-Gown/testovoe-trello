import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    ForbiddenException,
    Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {TokenGuard} from "../auth/auth.guard";


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Создание нового пользователя' })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Поиск всех пользователей' })
    @ApiBearerAuth()
    @UseGuards(TokenGuard)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Поиск пользователя' })
    @ApiBearerAuth()
    @UseGuards(TokenGuard)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiBearerAuth()
    @UseGuards(TokenGuard)
    @Put(':id')
    async update(@Request() req,
                 @Param('id') id: number,
                 @Body() updateUserDto: UpdateUserDto) {
        if (id != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiBearerAuth()
    @UseGuards(TokenGuard)
    @Delete(':id')
    async remove(@Request() req,
                 @Param('id') id: number) {
        if (id != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.usersService.remove(id);
    }
}