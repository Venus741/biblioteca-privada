import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findall(): Promise<Book[]> {
        return this.booksService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('bookCover', {
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp'
            ];

            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(
                    new BadRequestException(
                        'Tipo de arquivo inválido. Apenas JPG, PNG ou WEBP são permitidos.'
                    ),
                    false
                );
            }
        },
        limits: {
            fileSize: 2 * 1024 * 1024
        }
    }))
    create(
        @Body() createBookDto: CreateBookDto,
        @UploadedFile() bookCover: Express.Multer.File
    ): Promise<Book> {
        return this.booksService.create(createBookDto, bookCover);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('bookCover', {
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp'
            ];

            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(
                    new BadRequestException(
                        'Tipo de arquivo inválido. Apenas JPG, PNG ou WEBP são permitidos.'
                    ),
                    false
                );
            }
        },
        limits: {
            fileSize: 2 * 1024 * 1024
        }
    }))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto,
        @UploadedFile() bookCover: Express.Multer.File
    ): Promise<Book> {
        return this.booksService.update(id, updateBookDto, bookCover);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.booksService.remove(id);
    }
}