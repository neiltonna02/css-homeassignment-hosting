import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

//This service class is a Route Guard, which implements the feature so that
//users which are already logged in are not able to log in again until signing out

@Injectable()
export class AppointmentAuthorizedGuardService implements CanActivate {
    
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        //If there is an item 'returnedJsonFromApi' exists in the localStorage (which means user is logged in),
        //show an alert and redirect the user to the appointments list page
        if (localStorage.getItem("returnedJsonFromApi") != null)
        {
            alert("You are already logged in!");
            this.router.navigate(['/appointments']);
            return false;
        }
        
        return true;
    }

}