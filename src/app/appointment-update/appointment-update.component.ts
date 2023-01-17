import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.css']
})

export class AppointmentUpdateComponent implements OnInit
{

  //Creating instances of FormGroup and Appointment
  appointmentForm: FormGroup;
  appointment: Appointment;

  //Getting the user role from the JSON in localStorage
  role: any = JSON.parse(localStorage.getItem("returnedJsonFromApi")).role;
  
  //Constructor
  constructor (
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    @Inject (LOCALE_ID) public locale: string
    )
  {}

  //Initialising the appointmentForm elements
  ngOnInit(): void
  {

    //console.log("role is " + this.role);

    //Creating a form group instance
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
      vetNotes: ['', [Validators.required]]
    });
    
    //Setting the 'appointment' variable to be the value of the appointmentForm object
    this.appointment = this.appointmentForm.value;
    
    //Getting the id passed in the URL through the route skeleton
    var id: number = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.appointmentService.getAppointmentById(id).subscribe((res: Appointment) => {
      this.appointment = res;
    });

    
  }

  //When submitting the form, the data is updated in the API
  updateForm(appointmentForm)
  {
    // console.log("this.appointment is:");
    // console.log(JSON.stringify(this.appointment));
    // console.log(this.appointment.appointmentDate);

    // let userData:any = {};

    // this.appointmentForm.patchValue({
      
    // })

    // userData.patientName = appointmentForm.value.patientName;

    // userData.animalType = appointmentForm.value.animalType; 

    console.log("userData is:");
    // console.log(userData);


    //Passing also the ID in the parameters
    this.appointmentService.updateAppointment(this.appointment, this.appointment.appointmentId).subscribe((res: Appointment) => {
      this.appointment = res;
    });
    
  }
  
}
