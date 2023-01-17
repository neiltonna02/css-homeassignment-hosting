import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccount } from '../dto/useraccount.dto';
import { UserAccountService } from '../services/useraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{

  loginForm: FormGroup;
  userAccount: UserAccount;
  badReq: boolean = false;

  //Constructor
  constructor (
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
    private router: Router
    )
  {}

  //Initialising the loginForm elements
  ngOnInit(): void
  { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  //When submitting the form, the data is POSTed to the API
  submitForm()
  {
    //console.log(JSON.stringify(this.loginForm.value));
    this.userAccount = this.loginForm.value;
    this.userAccountService.postLoginDetails(this.userAccount).subscribe(
      (res: UserAccount) => {
        this.userAccount = res;
        //console.log(JSON.stringify(this.userAccount));

        //Putting the response received from the API in the localStorage
        localStorage.setItem('returnedJsonFromApi', JSON.stringify(this.userAccount));

        //If the user successfully logs in
        if (localStorage.getItem("returnedJsonFromApi"))
        {
          console.log("LS POPULATA");

          //Extracting the token from the JSON returned from the API:
          const token = JSON.parse(localStorage.getItem("returnedJsonFromApi"));
          console.log(token.jwtToken);
          console.log(JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken);
          console.log(`Bearer ${JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken}`);

          //Redirect the user to the Appointments List page
          this.router.navigate(['/appointments']);
        }
      },

      //If there is an error with the request, it means that the credentials are incorrect
      error => {
        console.log("ERROR!!");
        this.badReq = true;
      }
    
    );
  }
  

}
