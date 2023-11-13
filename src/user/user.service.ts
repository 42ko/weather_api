import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });

    if (existingUser) {
      throw new ConflictException('User with this login already exists');
    }

    const user = await this.userRepository.save({
      login: createUserDto.login,
      password: createUserDto.password,
      fio: createUserDto.fio,
    });

    const token = this.jwtService.sign({ sub: user.id });
    user.token = token;
    await this.userRepository.save(user);

    return { fio: user.fio, token };
  }

  async findOne(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async deleteUser(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
  
    if (!user) {
    
      throw new NotFoundException('User not found');
    }
  
    await this.userRepository.remove(user);
  
    return { message: 'User deleted successfully' };
  }
 
}
