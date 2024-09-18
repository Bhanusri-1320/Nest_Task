import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello 🌍!';
  }
  getGreetings(name: string): string {
    return `Hello ${name}!`;
  }
}
