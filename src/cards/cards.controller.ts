import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
    ForbiddenException, Put
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { TokenGuard} from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('users')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class CardsController {

    constructor(private readonly cardsService: CardsService) {}

    @ApiOperation({ summary: 'Создание новой карты' })
    @Post(':userId/columns/:columnId/cards') // Изменен путь
    async create(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Body() createCardDto: CreateCardDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.cardsService.create(columnId, userId, createCardDto); // Передаем userId
    }

    @ApiOperation({ summary: 'Поиск карты' })
    @Get(':userId/columns/:columnId/cards/:id')
    async findOne(@Param('userId') userId: number,
                  @Param('columnId') columnId: number,
                  @Param('id') id: number) {
        return this.cardsService.findOne(id);
    }

    @ApiOperation({ summary: 'Поиск карт в колонке' })
    @Get(':userId/columns/:columnId/cards')
    async findAllByColumnId(@Param('userId') userId: number,
                            @Param('columnId') columnId: number ) {
        return this.cardsService.findAllByColumn(columnId);
    }

    @ApiOperation({ summary: 'Обновление карты' })
    @Put(':userId/columns/:columnId/cards/:id')
    async update(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Param('id') id: number,
                 @Body() updateCardDto: UpdateCardDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.cardsService.update(id, updateCardDto);
    }

    @ApiOperation({ summary: 'Удаление карты' })
    @Delete(':userId/columns/:columnId/cards/:id')
    async remove(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Param('id') id: number) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.cardsService.remove(id);
    }
}