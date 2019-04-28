import {Component, OnInit} from '@angular/core';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';
import {FileService} from '../shared/services/file.service';


declare var require: any;

const Noty = require('noty');


declare let jQuery: any;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {


  trips: Trip[];
  newTrip: Trip = new Trip();

  constructor(private tripService: TripService,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.getAllTrips();
  }

  getAllTrips() {
    this.tripService.getTripsOfConnectedUser().subscribe(
      (data) => {
        this.trips = data;
        console.log(this.trips);
      }
    );
  }


  onCreateTripClick() {


    this.newTrip.startDate = jQuery('#startDate').val();
    this.newTrip.endDate = jQuery('#endDate').val();
    console.log(this.newTrip);
    this.tripService.addTrip(this.newTrip).subscribe(
      () => {
        this.closeModal('#add-trip');
        this.initTrip();
        new Noty({
          theme: 'metroui',
          type: 'success',
          layout: 'topRight',
          timeout: 5000,
          progressBar: true,
          text: 'Your trip is saved !'
        }).show();
      },
      () => {
        new Noty({
          theme: 'metroui',
          type: 'error',
          layout: 'topRight',
          timeout: 5000,
          progressBar: true,
          text: 'Error : your trip wasn\'t saved'
        }).show();
      }
    );
  }

  closeModal(modalId: string) {
    jQuery(modalId).modal('toggle');
  }

  initTrip() {
    this.newTrip = new Trip();


  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      /* let formData:FormData = new FormData();
       formData.append('file', file, file.name);
       let headers = new Headers();
       /** In Angular 5, including the header Content-Type can invalidate your request */
      this.fileService.uploadFile(file).subscribe(
        (data) => {
          this.newTrip.imageUrl = data.fileDownloadUri;
        }
      );
    }

  }

}
