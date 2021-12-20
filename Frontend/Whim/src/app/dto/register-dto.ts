export class RegisterDto {
    name: string;
    lastName: string;
    email: string;
    password: string;
    password2: string;
    address: string;
    city: string;
    constructor(){
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.password2 = "";
        this.address = "";
        this.city = "";
    }
}