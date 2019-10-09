import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'https';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('name/:name')
    findAll(@Param() params): Promise<User> {
        return this.usersService.findByName(params.name);
    }

}
