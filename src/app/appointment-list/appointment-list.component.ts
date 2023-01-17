import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import { ExcelService } from '../services/excel.service';
import { ViewChild, ElementRef } from '@angular/core';  
import jsPDF from 'jspdf';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {

  title: string = "Appointment System";

  //Creating an empty array of type 'Appointment'
  appointments: Appointment[] = [];

  //Getting the user role from the JSON in localStorage
  role: any = JSON.parse(localStorage.getItem("returnedJsonFromApi")).role;


  //Constructor
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private excelService: ExcelService
    )
  {}

  //This runs when the page loads, initialising the appointments
  ngOnInit(): void
  {
    this.initialiseAppointments();
    console.log(this.role);
  }

  //Initialising the appointments (populating the 'appointments' array)
  initialiseAppointments()
  {
    this.appointmentService.getAppointments().subscribe((resp: Appointment[]) => {
      this.appointments = resp;
      // console.log("THIS.APPOINTMENTS IS" + this.appointments);
      console.log("Initialising appointments...");
    })
  }

  //Deleting an appointment when the 'delete' button next to the appointment is clicked
  deleteAppointment (appointmentId: number)
  {
    //console.log("DELETING : " + appointmentId);
    this.appointmentService.deleteAppointment(appointmentId).subscribe();
    
    //location.reload();
    window.location.reload();
  }


  //Exporting the current appointment records in Excel
  excelExport(): void
  {
    console.log(this.appointments);

    //Exporting the records
    this.excelService.export(this.appointments, 'Appointments');
  }


  //Exporting the current appointment records in PDF
  @ViewChild('forPdf') pdfInclude: ElementRef; //finding the attribute with the name specified (reference)
  pdfExport(): void
  {
    //Creating a variable for storing the content to be shown in the PDF
    let pdfInclude=this.pdfInclude.nativeElement;

    //Creating a new instance of PDF
    let pdfDocument = new jsPDF();

    //Creating the actual PDF with custom styling, and saving it with a custom file name
    pdfDocument.html(
      pdfInclude.innerHTML,
      {x:4, y:4, width:10, windowWidth:29, callback: function (pdfDocument) { pdfDocument.save("Appointments" + "_" + new  Date().getTime() + ".pdf");}
    });
  }

}
