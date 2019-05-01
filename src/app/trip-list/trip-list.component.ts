import {Component, OnInit} from '@angular/core';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';
import {FileService} from '../shared/services/file.service';
import {Utils} from '../shared/utils';
import {Config} from '../shared/config';
import {UserService} from '../shared/services/user.service';


declare var require: any;

const Noty = require('noty');


declare let jQuery: any;

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {


  trips: Trip[] = [];
  newTrip: Trip = new Trip();

  constructor(private tripService: TripService,
              private fileService: FileService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getAllTrips();
    this.initDatePicker();
    const baseContext = this;
    Utils.initializeUploadFile(Config.baseUrl + '/uploadFile', this.userService.getToken(), '.file-input-trip', true, true, 1);
    jQuery('.file-input-trip').on('fileuploaded', (event, data, previewId, index) => {

      if (data.response) {
        baseContext.newTrip.imageUrl = data.response.fileDownloadUri;
      }
    });
  }

  getAllTrips() {
    this.tripService.getTripsOfConnectedUser().subscribe(
      (data) => {
        this.trips = data;
        console.log(this.trips);
      }
    );
  }

  initDatePicker() {
    const baseContext = this;
    jQuery('#startDate').daterangepicker({

        autoUpdateInput: true,
        singleDatePicker: false,
        showControls: true,
        showDropdowns: true,
        autoApply: true,

        locale: {
          format: 'DD/MM/YYYY'
        }
      }, function (start, end, label) {
        baseContext.newTrip.startDate = start.format('DD/MM/YYYY');
        baseContext.newTrip.endDate = end.format('DD/MM/YYYY');

      }
    );


  }


  onCreateTripClick() {

    console.log(this.newTrip);
    this.tripService.addTrip(this.newTrip).subscribe(
      (data) => {
        this.trips = data;
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
