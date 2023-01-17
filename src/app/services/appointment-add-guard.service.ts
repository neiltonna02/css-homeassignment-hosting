import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

//This service class is a Route Guard, which implements the feature so that
//those users with a 'VET' user role are not able to add an appointment

@Injectable()
export class AppointmentAddGuardService implements CanActivate {
    
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        //If 'returnedJsonFromApi' exists in the localStorage (which means the user is logged in)
        if (localStorage.getItem("returnedJsonFromApi") != null)
        {
            //Getting the user role from the JSON in localStorage
            var returnedJsonFromApi: any = localStorage.getItem("returnedJsonFromApi");
            var parsed = JSON.parse(returnedJsonFromApi);
            //var role = JSON.parse(localStorage.getItem("returnedJsonFromApi")).role;
            
            // console.log("RETURNED: " + returnedJsonFromApi);
            // console.log("PARSED: " + parsed);
            console.log(parsed.role);
    
            //If user is a vet, show an alert and redirect to the appointments list
            if (parsed.role == "VET") {
                alert("Vets cannot add appointments!");
                this.router.navigate(['/appointments']);
                return false;
            }
        }

        return true;
    }

}