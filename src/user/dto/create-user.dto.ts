import { ApiProperty } from "@nestjs/swagger";
import { Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    login: string;

    @ApiProperty()
    @MinLength(6, {message: 'Password length must be more than 6'})
    @Matches(/^(?=.*[.,!_])/, { message: 'Password must contain at least one of: ., !, _' })  
    password: string;

    @ApiProperty()
    fio?: string;
}
