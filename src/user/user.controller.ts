import { Controller, Post, Body, Param, Delete, UsePipes, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  get(@Param('login') login: string){
    return this.userService.findOne(login)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Param('login') login: string) {
    return this.userService.deleteUser(login);
  }
  
}
