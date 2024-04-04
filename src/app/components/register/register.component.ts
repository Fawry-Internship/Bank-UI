import { Component } from '@angular/core';
import {AccountRegister} from "../../models/accountRegister/account-register";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {localhost, saveToken} from "../../environments/environments";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  accountRegister: AccountRegister = new AccountRegister('', '', '');

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private baseUrl = localhost();

  submitForm() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.http.post<any>(`${this.baseUrl}/auth/register`, formData)
        .subscribe({
          next: response => {
            saveToken(response.token)
            console.log(response);
          },
          error: error => {
            console.error('There was an error!', error);
          }
        });
    }
  }
}
