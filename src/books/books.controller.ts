import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findall(){
        return this.booksService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(+id);
    }

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body() updateBookDto: UpdateBookDto
    ) {
        return this.booksService.update(+id, updateBookDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(+id)
    }

}
