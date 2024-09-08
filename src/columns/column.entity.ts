import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @ManyToOne(() => User, (user) => user.columns)
    @ApiProperty({ type: () => User })
    user: User;

    @OneToMany(() => Card, (card) => card.column)
    @ApiProperty({ type: () => [Card] })
    cards: Card[];
}