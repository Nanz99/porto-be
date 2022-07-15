import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { User } from '../Entity/user.entity';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/helper';
import { JwtService } from '@nestjs/jwt';
import { Address } from 'src/Entity/address.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private jwtService: JwtService,
  ) {}

  async register(data: SignUpDto): Promise<any> {
    const hasPassword = await bcrypt.hash(data.password, 10);
    try {
      const address = await this.addressRepository.create(data.address);
      const addressID = await this.addressRepository.save(address);

      const user = await this.authRepository.create({
        name: data.name,
        email: data.email,
        password: hasPassword,
        addressId: addressID.id,
        phoneNumber: data.phoneNumber,
      });

      await this.authRepository.save(user);
      const token = await APIFeatures.assignJwtToken(user, this.jwtService);

      return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Duplicate Email entered.');
      }
    }
  }
  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email address or password.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email address or password.');
    }

    const token = await APIFeatures.assignJwtToken(user, this.jwtService);

    return { token };
  }
}
