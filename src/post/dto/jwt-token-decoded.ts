import { IsString } from "class-validator";
export class JwtTokenDecoded {


    @IsString()
    id: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    iat: number;
    
    @IsString()
    exp: number;
}
