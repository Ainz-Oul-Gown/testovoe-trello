import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnEntity } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnsRepository: Repository<ColumnEntity>,
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) {}

    async create(userId: number, createColumnDto: CreateColumnDto): Promise<ColumnEntity> { // Исправлено
        const user = await this.userRepository.findOne({where: {id: userId}, select: ['id', 'username', 'email']});
        const column = this.columnsRepository.create({
            ...createColumnDto,
            user,
        });
        return await this.columnsRepository.save(column);
    }

    async findAll(): Promise<ColumnEntity[]> {
        return await this.columnsRepository.find();
    }

    async findAllForUser(userId: number): Promise<ColumnEntity[]> {
        return await this.columnsRepository.find({ where: { user: { id: userId } } });
    }


    async findOne(id: number): Promise<ColumnEntity> {
        const column = await this.columnsRepository.findOneBy({ id: id });
        if (!column) {
            throw new NotFoundException();
        }
        return column;
    }

    async update(id: number, updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
        const column = await this.findOne(id);
        Object.assign(column, updateColumnDto);
        return await this.columnsRepository.save(column);
    }

    async remove(id: number): Promise<void> {
        await this.columnsRepository.delete(id);
    }
}
