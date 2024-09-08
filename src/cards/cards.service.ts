import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Card} from './card.entity';
import {CreateCardDto} from './dto/create-card.dto';
import {UpdateCardDto} from './dto/update-card.dto';
import {ColumnsService} from '../columns/columns.service';
import {UsersService} from "../users/users.service";

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
        private columnsService: ColumnsService,
        private userService: UsersService
    ) {}

    async create(columnId: number, userId: number, createCardDto: CreateCardDto): Promise<Card> {
        const column = await this.columnsService.findOne(columnId);
        const user = await this.userService.findById(userId);
        const card = this.cardsRepository.create({
            ...createCardDto,
            column,
            user
        });
        return await this.cardsRepository.save(card, {});
    }

    async findAllByColumn(columnId: number) {
        return await this.cardsRepository.find({where: {column: {id: columnId}}});
    }

    async findOne(id: number): Promise<Card> {
        const card = await this.cardsRepository.findOne({
            where: { id },
            relations: ['column', 'column.user','user'],
            select: {
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
                },
                user: {
                    id: true,
                    username:true,
                    email: true
                }
            }
        });
        if (!card) {
            throw new NotFoundException();
        }
        return card;
    }

    async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
        const card = await this.findOne(id);
        Object.assign(card, updateCardDto);
        return await this.cardsRepository.save(card);
    }

    async remove(id: number): Promise<void> {
        await this.cardsRepository.delete(id);
    }
}