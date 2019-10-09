import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly photoRepository: Repository<User>,
  ) {}

  async findByName(inputname: string): Promise<User> {
    return await this.photoRepository.findOne({ where: { name: inputname} });
  }
}
