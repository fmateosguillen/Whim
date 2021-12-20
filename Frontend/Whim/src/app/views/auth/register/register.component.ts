import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/dto/register-dto';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDto = new RegisterDto();
  errorArray = [];

  constructor(private authService: AuthService, private router: Router) { }

  newUserForm = new FormGroup({
    name: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNumber: new FormControl(""),
    address: new FormControl(""),
    city: new FormControl("")
  });

  doRegister() {
    let registerDto: RegisterDto = {
      role: "user",
    } as any;
    Object.keys(this.newUserForm.controls).map((key) => {
      registerDto[key] = this.newUserForm.controls[key].value;
    });
    this.authService.register(registerDto).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(["/admin/tables"]);
      },
      err => {
        if(err.status == 400) {
          this.errorArray = err.error;
          console.log(this.errorArray);
          
          alert('Incorrect Register Data');
        } else {
          alert('Server error');
        }
      }
    );
  }
  

  ngOnInit(): void {
  }

}
