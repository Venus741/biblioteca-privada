import { PartialGraphHost } from "@nestjs/core";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto){
    
}