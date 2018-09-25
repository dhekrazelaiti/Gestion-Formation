import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-user',
  template: `
  <body>
    <div class="pen-title">
      <h1>Authentication Page</h1>
    </div>
  <div class="container">
      <div class="card">
          <h1 class="title"> Login</h1>
            <form>
              <div class="example-container">
                  <mat-form-field>
                      <input matInput placeholder="Enter your email" [formControl]= "email" required>
                      <mat-icon matPrefix >account_circle</mat-icon>
                      <mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error>
                  </mat-form-field><br/><br/>
                  <mat-form-field>
                      <input matInput placeholder="Enter your password" [type]="hide ? 'password' : 'text'">
                      <mat-icon matSuffix (click)="hide = !hide" >{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
                  </mat-form-field>
              </div>
              <div class="button-container">
                <button >GO</button>
              </div>
              <div class="footer"><a href="#">Forgot your password?</a></div>
            </form>
      </div>
  </div>
  </body>
  `
})
export class UserComponent {

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}

