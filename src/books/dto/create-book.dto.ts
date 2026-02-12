import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    gender: string;

    @IsInt()
    year: number;

    @IsBoolean()
    wasRead: boolean;

    @IsBoolean()
    isInTheLibrary: boolean;

    @IsString()
    @IsOptional()
    bookCover?: string | null;
}