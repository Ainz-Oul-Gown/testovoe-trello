import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from './column.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, User]), UsersModule],
  providers: [ColumnsService],
  exports: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}