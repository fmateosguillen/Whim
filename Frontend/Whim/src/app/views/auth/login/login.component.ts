import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dto/login-dto';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginDto = new LoginDto();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  loginUSerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  doLogin(){
    console.log('Component')
    Object.keys(this.loginUSerForm.controls).map(key => {
      this.user[key] = this.loginUSerForm.controls[key].value;
    });
    this.authService.login(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin/products']);
      },
      error => {
        if(error.status == 401) {
          alert('Incorrect login data');
        } else {
          alert('Server error');
        }
        console.log(error)
      }
    );
  }

  ngOnInit(): void {
  }

}
