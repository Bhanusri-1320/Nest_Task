/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const salt=await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hash(password,salt)
    console.log(hashedPassword)
    const user = this.create({ username, password:hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // for duplicate user name
        throw new ConflictException('username already exists');
      }
    }
    return user;
  }
}
