import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';


export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    readonly message: string;

}
