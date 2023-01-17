import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{

  title: string = "Appointment System";


  //Constructor
  constructor(
    private router: Router
  ) { }

  signOut():void
  {
    //Removing the item from localStorage
    localStorage.removeItem("returnedJsonFromApi");

    //If the localStorage item does not exist
    if (localStorage.getItem("returnedJsonFromApi") == null)
    {
      console.log("MHEMM XEJN FIL LS");
    }

    //Redirecting the user to the login page
    this.router.navigate(['/login']);
    
  }

}
