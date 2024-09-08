import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Comment} from './comment.entity';
import {CreateCommentDto} from './dto/create-comment.dto';
import {UpdateCommentDto} from './dto/update-comment.dto';
import {CardsService} from '../cards/cards.service';
import {UsersService} from '../users/users.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        private cardsService: CardsService,
        private usersService: UsersService,
    ) {}

    async create(cardId: number, userId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        const card = await this.cardsService.findOne(cardId);
        const user = await this.usersService.findById(userId);
        const comment = this.commentsRepository.create({
            ...createCommentDto,
            card,
            user
        });
        return await this.commentsRepository.save(comment, {});
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.commentsRepository.findOne({
            where: {id},
            relations: ['card','card.column','card.column.user','user'],
            select: {
                id: true,
                text: true,
                card: {
                    id: true,
                    title: true,
                    description: true,
                    column: {
                        id: true,
                        title: true,
                        user: {
                            id: true,
                            username:true,
                            email: true
                        },
                    }
                },
                user: {
                    id: true,
                    username:true,
                    email: true
                }
            }
        });
        if (!comment) {
            throw new NotFoundException();
        }
        return comment;
    }

    async findAllWithCard(cardId: number) {
        return await this.commentsRepository.find({
            where: { card: { id: cardId } },
            relations: ['user'],
            select: {
                id: true,
                text: true,
                user: {
                    id: true,
                    username:true,
                    email: true
                }
            }});
    }


    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.findOne(id);
        Object.assign(comment, updateCommentDto);
        return await this.commentsRepository.save(comment);
    }

    async remove(id: number): Promise<void> {
        await this.commentsRepository.delete(id);
    }
}