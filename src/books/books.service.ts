import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
    
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Book[]> {
        return this.prisma.books.findMany();
    }

    async findOne(id: number): Promise<Book> {

        const book = await this.prisma.books.findUnique({ where: {id}});
        if (!book) {
            throw new NotFoundException(`Livro #${id} não encontrado`);
        }
        return book;
    }

    async create(data: CreateBookDto): Promise<Book> {
        return this.prisma.book.create({ data });
    }

    async update(id: number, data: UpdateBookDto): Promise<Book> {
        const book = await this.prisma.book.findUnique({where: {id}});
        if (!book) {
            throw new NotFoundException(`Livro #${id} não encontrado`);
        }
        return await this.prisma.book.update({ where: {id}, data})
        

    }

    async remove(id: number): Promise<void> {
        const index = await this.prisma.books.findIndex({ where: {id} });
        if (index === -1)
            throw new NotFoundException(`Livro #${id} não encontrado`);

        await this.prisma.books.remove({ where: {id} });
    }

}
