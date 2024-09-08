import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
    Put,
    ForbiddenException
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { TokenGuard} from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Columns')
@Controller('users')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @ApiOperation({ summary: 'Создание новой колонки' })
    @Post(':userId/columns')
    async create(@Request() req,
                 @Param('userId') userId: number,
                 @Body() createColumnDto: CreateColumnDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.columnsService.create(userId, createColumnDto);
    }

    @ApiOperation({ summary: 'Поиск колонок по пользователю' })
    @Get(':userId/columns')
    async findAllForUser(@Param('userId') userId: number) {
        return this.columnsService.findAllForUser(userId);
    }

    @ApiOperation({ summary: 'Поиск колонки' })
    @Get(':userId/columns/:id')
    async findOne(@Param('userId') userId: number,
                  @Param('id') id: number) {
        return this.columnsService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновление колонки' })
    @Put(':userId/columns/:id')
    async update(@Request() req,
                 @Param('userId') userId: number,
                 @Param('id') id: number,
                 @Body() updateColumnDto: UpdateColumnDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.columnsService.update(id, updateColumnDto);
    }

    @ApiOperation({ summary: 'Удаление колонки' })
    @Delete(':userId/columns/:id')
    async remove(@Request() req,
                 @Param('userId') userId: number,
                 @Param('id') id: number) {
        if (userId != req.user.sub){
            throw new ForbiddenException();
        }
        return this.columnsService.remove(id);
    }
}