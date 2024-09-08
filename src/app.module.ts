import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { CardsModule } from './cards/cards.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Card } from './cards/card.entity';
import { ColumnEntity } from './columns/column.entity';
import { Comment } from './comments/comment.entity';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql7.freesqldatabase.com',
      port: 3306,
      username: 'sql7728948',
      password: 'qUbgNt5XSC',
      database: 'sql7728948',
      entities: [User, Card, ColumnEntity, Comment],
      synchronize: true,
    }),
    CommentsModule,
    CardsModule,
    ColumnsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}