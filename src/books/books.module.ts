import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/prisma.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, CloudinaryService],
  imports: [PrismaModule],
})
export class BooksModule {}
