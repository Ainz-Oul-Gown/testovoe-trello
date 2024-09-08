import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import {User} from "../users/user.entity";

@Entity()
export class Card {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column('text')
    @ApiProperty()
    description: string;

    @ManyToOne(() => User, (user) => user.cards)
    @ApiProperty({ type: () => User })
    user: User;

    @ManyToOne(() => ColumnEntity, (column) => column.cards)
    @ApiProperty({ type: () => ColumnEntity })
    column: ColumnEntity;

    @OneToMany(() => Comment, (comment) => comment.card)
    @ApiProperty({ type: () => [Comment] })
    comments: Comment[];
}