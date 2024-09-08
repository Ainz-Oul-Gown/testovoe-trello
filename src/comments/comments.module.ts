import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CardsModule } from '../cards/cards.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CardsModule, UsersModule],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}