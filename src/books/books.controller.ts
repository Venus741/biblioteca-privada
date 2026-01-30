import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findall(): Promise<Book[]>{
        return this.booksService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book>{
        return this.booksService.findOne(+id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('bookCover'))
    create(
        @Body() createBookDto: CreateBookDto,
        @UploadedFile() bookCover: Express.Multer.File): Promise<Book> {
            return this.booksService.create(createBookDto, bookCover);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.booksService.update(+id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void>{
        return this.booksService.remove(+id);
    }
}
