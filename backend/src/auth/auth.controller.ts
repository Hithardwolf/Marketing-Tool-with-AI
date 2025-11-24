import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService, User } from '../database/db.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly dbService: DatabaseService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    try {
      if (!body.email || !body.password) {
        throw new HttpException(
          'Email and password required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingUser: User | undefined = this.dbService.findUserByEmail(
        body.email,
      );
      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const hashedPassword: string = await bcrypt.hash(body.password, 10);

      const newUser: User = {
        id: Date.now(),
        email: body.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      this.dbService.addUser(newUser);

      return {
        message: 'User registered successfully',
        userId: newUser.id,
        email: newUser.email,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      if (!body.email || !body.password) {
        throw new HttpException(
          'Email and password required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user: User | undefined = this.dbService.findUserByEmail(body.email);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid: boolean = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      return {
        message: 'Login successful',
        userId: user.id,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
