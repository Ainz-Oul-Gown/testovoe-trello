import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column('text')
    @ApiProperty()
    text: string;

    @ManyToOne(() => Card, (card) => card.comments)
    @ApiProperty({ type: () => Card })
    card: Card;

    @ManyToOne(() => User, (user) => user.comments)
    @ApiProperty({ type: () => User })
    user: User;
}