import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { userInfo } from 'os';
//import {hash, genSalt, compare} from 'bcrypt';
import * as bcrypt from 'bcryptjs'
const saltRounds = 10;

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {
  }

  async findByName(inputname: string): Promise<User> {
    return await this.UserRepository.findOne({ where: { name: inputname} });
  }

  async createUser(name: string, password: string)
  {
    let newUser = new User();

    newUser.name = name;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
           newUser.hash = hash;

           this.UserRepository.save(newUser);
      });
    });
  }

  async ValidateUser(name: string, password: string): Promise<User>
  {
    let User = await this.UserRepository.findOne({where:{name: name}});

    if(User == null) return null;

    return bcrypt.compare(password, User.hash).then(function(result) {
      console.log(result);
      if(result)
      {
        return User
      }
      return null;
    });
  }
}
