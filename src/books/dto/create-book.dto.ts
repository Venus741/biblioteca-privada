import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    gender: string;

    @IsInt()
    @Type(() => Number)
    year: number;

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    wasRead: boolean;

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isInTheLibrary: boolean;

    @IsString()
    @IsOptional()
    bookCover?: string | null;
}