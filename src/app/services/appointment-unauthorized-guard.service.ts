import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

//This service class is a Route Guard, which implements the feature so that
//users which are not logged in are not able to add an appointment

@Injectable()
export class AppointmentUnauthorizedGuardService implements CanActivate {
    
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        //If there is no item 'returnedJsonFromApi' in the localStorage (which means user is not logged in),
        //show an alert and redirect the user to the login page
        if (localStorage.getItem("returnedJsonFromApi") === null)
        {
            alert("Log in to access this feature!");
            this.router.navigate(['/login']);
            return false;
        }
        
        return true;
    }

}