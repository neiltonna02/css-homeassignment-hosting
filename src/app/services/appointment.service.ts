import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";


//Doing all the logic to connect to the API

@Injectable()
export class AppointmentService
{
    //Creating a variable for the URL
    endpoint: string = "http://localhost:8080/appointment";

    //token: string = JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken;

    //Creating a variable to store the headers
    httpHeader =
    {
        headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
            //'Authorization': `Bearer ${this.token}`
        })
    }

    //Constructor
    constructor (private httpClient: HttpClient)
    {

    }

    //Getting all the appointments
    getAppointments(): Observable<Appointment[]>
    {

        let requestHeader =
        {
            headers: new HttpHeaders(
            {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
                //'Authorization': `Bearer ${this.token}`
            })
        }

        //Here we have access to httpClient because we have included it in the constructor, and Angular does Dependency Injection automatically
        return this.httpClient.get<Appointment[]>(this.endpoint, requestHeader); //calling the 'get' action
    }

    //Adding an appointment
    addAppointment(appointment: Appointment) : Observable<Appointment>
    {
        let addRequestHeader =
        {
            headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
            })
        }

        return this.httpClient.post<Appointment>(this.endpoint, appointment, addRequestHeader);
    }

    //Updating an appointment
    updateAppointment(appointment: Appointment, id: number) : Observable<Appointment>
    {

        // let queryParams = new HttpParams();
        // queryParams = queryParams.append("id", id);
        
        let updateRequestHeader =
        {
            headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
            })
        }

        return this.httpClient.put<Appointment>(this.endpoint + "/" + id, appointment, updateRequestHeader);
    }

    //Getting a single appointment by id
    getAppointmentById(id: number): Observable<Appointment>
    {
        let oneAppointmentRequestHeader =
        {
            headers: new HttpHeaders(
            {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
            })
        }
        
        return this.httpClient.get<Appointment>(this.endpoint + "/" + id, oneAppointmentRequestHeader);
    }

    //Deleting an appointment
    deleteAppointment(id: number): Observable<any>
    {
        let deleteRequestHeader =
        {
            headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("returnedJsonFromApi")).jwtToken
            })
        }

        return this.httpClient.delete(this.endpoint + "/" + id, deleteRequestHeader);
    }
    
}