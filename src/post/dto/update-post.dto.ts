import { IsString, IsArray } from 'class-validator';

export class UpdatePostDto {
    @IsString()
    authorId: string;

    @IsString()
    text: string;

    @IsString()
    imageSrc: string;

    @IsArray()
    plants: string[];

    @IsArray()
    likes: string[];

    @IsArray()
    shares: string[];

    @IsArray()
    comments: string[];

    @IsString()
    id: string;
}
