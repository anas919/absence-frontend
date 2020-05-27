import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaravelPassportService } from 'laravel-passport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private laravelPassportService: LaravelPassportService,
    private router: Router
  ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    const user = this.user.value;
    this.laravelPassportService.loginWithEmailAndPassword(user.email, user.password)
      .subscribe(
        result => {
          //console.log(result);
          this.router.navigate(['/']);
        },
        error => {
          //console.log('error :', error);
        },
        () => {
          //console.log('Completed');
        }
      );
  }
}
