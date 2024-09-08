import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';
import {Card} from "../cards/card.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    username: string;

    @Column({ unique: true })
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @OneToMany(() => ColumnEntity, (column) => column.user)
    @ApiProperty({ type: () => [ColumnEntity] })
    columns: ColumnEntity[];

    @OneToMany(() => Card, (card) => card.user)
    @ApiProperty({ type: () => [Card] })
    cards: Card[];

    @OneToMany(() => Comment, (comment) => comment.user)
    @ApiProperty({ type: () => [Comment] })
    comments: Comment[];
}