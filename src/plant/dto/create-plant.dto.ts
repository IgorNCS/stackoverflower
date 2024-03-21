import { IsString } from "class-validator";
export class CreatePlantDto {
    @IsString()
    name: string;

    @IsString()
    scientific_name: string;

    @IsString()
    description: string;

    @IsString({ each: true })
    tags: string[];

    id?: any;


}

