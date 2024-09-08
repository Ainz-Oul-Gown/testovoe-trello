import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
    ForbiddenException,
    Put
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {TokenGuard} from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('users')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Создание нового комментария' })
    @Post(':userId/columns/:columnId/cards/:cardId/comments')
    async create(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Param('cardId') cardId: number,
                 @Body() createCommentDto: CreateCommentDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.commentsService.create(cardId, req.user.sub, createCommentDto);
    }

    @ApiOperation({ summary: 'Поиск комментариев по карточке' })
    @Get(':userId/columns/:columnId/cards/:cardId/comments')
    async findAll(@Param('userId') userId: number,
                  @Param('columnId') columnId: number,
                  @Param('cardId') cardId: number) {
        return this.commentsService.findAllWithCard(cardId);
    }

    @ApiOperation({ summary: 'Поиск комметария' })
    @Get(':userId/columns/:columnId/cards/:cardId/comments/:id')
    async find(@Param('userId') userId: number,
               @Param('columnId') columnId: number,
               @Param('cardId') cardId: number,
               @Param('id') id: number) {
        return this.commentsService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновление комментарий' })
    @Put(':userId/columns/:columnId/cards/:cardId/comments/:id')
    async update(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Param('cardId') cardId: number,
                 @Param('id') id: number,
                 @Body() updateCommentDto: UpdateCommentDto) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.commentsService.update(id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @Delete(':userId/columns/:columnId/cards/:cardId/comments/:id')
    async remove(@Request() req,
                 @Param('userId') userId: number,
                 @Param('columnId') columnId: number,
                 @Param('cardId') cardId: number,
                 @Param('id') id: number) {
        if (userId != req.user.sub) {
            throw new ForbiddenException();
        }
        return this.commentsService.remove(id);
    }
}