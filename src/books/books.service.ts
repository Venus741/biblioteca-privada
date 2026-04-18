import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
    
    constructor(
        private prisma: PrismaService,
        private cloudinaryService: CloudinaryService
    ) {}

    async findAll(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }
    
    async findOne(id: number): Promise<Book> {
        const book = await this.prisma.book.findUnique({ where: { id } });

        if (!book) {
            throw new NotFoundException(`Livro #${id} não encontrado`);
        }

        return book;
    }

    async create(
        data: CreateBookDto,
        bookCover: Express.Multer.File
    ): Promise<Book> {

        if (bookCover) {
            const imageUrl = await this.cloudinaryService.uploadImage(bookCover);
            data.bookCover = imageUrl;
        }

        return this.prisma.book.create({ data });
    }

    async update(
        id: number,
        data: UpdateBookDto,
        bookCover: Express.Multer.File
    ): Promise<Book> {

        const book = await this.prisma.book.findUnique({ where: { id } });

        if (!book) {
            throw new NotFoundException(`Livro #${id} não encontrado`);
        }

        if (bookCover) {
            const imageUrl = await this.cloudinaryService.uploadImage(bookCover);
            data.bookCover = imageUrl;
        }

        return this.prisma.book.update({
            where: { id },
            data,
        });
    }

    async remove(id: number): Promise<void> {
        const book = await this.prisma.book.findUnique({ where: { id } });

        if (!book) {
            throw new NotFoundException(`Livro #${id} não encontrado`);
        }

        await this.prisma.book.delete({ where: { id } });
    }
}