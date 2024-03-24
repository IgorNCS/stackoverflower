import { IsString } from "class-validator";
export class CreatePostDto {
    @IsString()
    authorId: string;

    @IsString()
    text: string;

    @IsString()
    imageSrc?:string[];

    @IsString()
    plants?:string[];
}
