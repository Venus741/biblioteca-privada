import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    
    private books: Book[] = [];
    private nextId: 1;

    findAll(): Book[] {
        return this.books;
    }

    findOne(id: number): Book {
        const book = this.books.find(b => b.id === id);
        if (!book) throw new NotFoundException(`Livro #${id} não encontrado`);
        return book;

    } 

    create(dto: CreateBookDto): Book {
        const book: Book = {id: this.nextId++, ...dto}
        this.books.push(book);
        return book;
    }

    update(id: number, dto: UpdateBookDto): Book {
        const book = this.findOne(id);
        Object.assign(book, dto);
        return book;

    }

    remove(id: number): void {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1) throw new NotFoundException(`Livro #${id} não encontrado`);
        this.books.splice(index, 1);
    }

}
