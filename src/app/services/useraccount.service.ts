import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAccount } from "../dto/useraccount.dto";


//Doing all the logic to connect to the API

@Injectable()
export class UserAccountService
{
    //Creating a variable for the URL
    endpoint: string = "http://localhost:8080/authenticate";

    //Creating a variable to store the headers
    httpHeader =
    {
        headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
        })
    }

    //Constructor
    constructor (private httpClient: HttpClient)
    {

    }

    //Getting all the appointments
    postLoginDetails(userAccount: UserAccount): Observable<UserAccount>
    {
        // localStorage.setItem('returnedJson', JSON.stringify(userAccount));
        // const returnedJson = localStorage.getItem("returnedJson")
        // console.log(JSON.stringify(localStorage));
        // console.log("Uername: ", JSON.parse(returnedJson));

        

        //Here we have access to httpClient because we have included it in the constructor, and Angular does Dependency Injection automatically
        return this.httpClient.post<UserAccount>(this.endpoint, userAccount, this.httpHeader);
    }
    
}