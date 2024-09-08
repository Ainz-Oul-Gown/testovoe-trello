import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({select:['id', 'username', 'email']});
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ where: { username } });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({where: {email}})
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id }, select:['id', 'username', 'email']});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}