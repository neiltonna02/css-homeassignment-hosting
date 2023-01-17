import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit
{

  appointment?: Appointment;

  //Constructor
  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  //This runs when the page loads
  ngOnInit(): void
  {
    //Getting the id passed in the URL through the route skeleton
    var id: number = Number(this.route.snapshot.paramMap.get('id'));
    //console.log(this.route);

    this.appointmentService.getAppointmentById(id).subscribe((res: Appointment) => {
      this.appointment = res;
    });
  }

  //When the back button is clicked, the user is redirected back to the Appointsments List
  backClick(): void
  {
    this.router.navigate(['/appointments']);
  }
  
}
