import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { ColumnsModule} from "../columns/columns.module";
import {ColumnEntity} from "../columns/column.entity";
import {UsersModule} from "../users/users.module";


@Module({
    imports: [
        ColumnsModule,
        ColumnEntity,
        UsersModule,
        TypeOrmModule.forFeature([Card])],
    providers: [CardsService],
    exports:[CardsService, ColumnEntity],
    controllers: [CardsController],
})
export class CardsModule {}