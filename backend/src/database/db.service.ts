import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
}

export interface Poster {
  id: number;
  userId: number;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable()
export class DatabaseService {
  private readonly dbPath = path.join(__dirname, '../../database');
  private readonly usersFile = path.join(this.dbPath, 'users.json');
  private readonly postersFile = path.join(this.dbPath, 'posters.json');

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    if (!fs.existsSync(this.dbPath)) {
      fs.mkdirSync(this.dbPath, { recursive: true });
    }

    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify({ users: [] }, null, 2));
    }

    if (!fs.existsSync(this.postersFile)) {
      fs.writeFileSync(
        this.postersFile,
        JSON.stringify({ posters: [] }, null, 2),
      );
    }
  }

  getUsers(): User[] {
    const data = fs.readFileSync(this.usersFile, 'utf8');
    return JSON.parse(data).users;
  }

  addUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    fs.writeFileSync(this.usersFile, JSON.stringify({ users }, null, 2));
    return user;
  }

  findUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find((u) => u.email === email);
  }

  getPosters(): Poster[] {
    const data = fs.readFileSync(this.postersFile, 'utf8');
    return JSON.parse(data).posters;
  }

  addPoster(poster: Poster): Poster {
    const posters = this.getPosters();
    posters.push(poster);
    fs.writeFileSync(this.postersFile, JSON.stringify({ posters }, null, 2));
    return poster;
  }

  getUserPosters(userId: number): Poster[] {
    const posters = this.getPosters();
    return posters.filter((p) => p.userId === userId);
  }
}
