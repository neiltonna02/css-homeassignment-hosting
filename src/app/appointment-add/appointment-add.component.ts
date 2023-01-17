import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})

export class AppointmentAddComponent implements OnInit
{
  //Creating instances of FormGroup and Appointment
  appointmentForm: FormGroup;
  appointment: Appointment;

  //Getting the user role from the JSON in localStorage
  role: any = JSON.parse(localStorage.getItem("returnedJsonFromApi")).role;
  
  //Constructor
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
    )
  {}

  //Initialising the appointmentForm elements
  ngOnInit(): void
  { 
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      animalType: ['', [Validators.required]],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern("^[0-9]{1,}[A-Z]{1}$")]],
      ownerName: ['', [Validators.required]],
      ownerSurname: ['', [Validators.required]],
      ownerContactNumber: ['', [Validators.required, Validators.min(0), Validators.pattern("^-?[0-9]{8,}$")]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      appointmentDuration: ['', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: ['']
    });
  }

  //When submitting the form, the data is POSTed to the API
  submitForm()
  {
    console.log(JSON.stringify(this.appointmentForm.value));
    //console.log(this.appointmentForm);
    this.appointment = this.appointmentForm.value;
    this.appointment.appointmentDate = this.dateFormat(this.appointment.appointmentDate);
    this.appointmentService.addAppointment(this.appointment).subscribe((res: Appointment) => {
      this.appointment = res;
      console.log(JSON.stringify(this.appointment));
    });

    //Redirecting to the appointments list
    this.router.navigate(['/appointments']);
  }

  //To format the date in the one being accepted by the API
  dateFormat(dateToFormat: string): string
  {
      const pipe: DatePipe = new DatePipe('en-US');
      return pipe.transform(dateToFormat, 'dd/MM/yyyy');
  }
  
}
