import {Page, NavController, NavParams} from 'ionic-angular';
import {ProjectLocation} from '../../models/project';
import {LocationService} from '../../services/location';
import {GoogleMaps} from '../../components/google-maps/google-maps';

declare var google;

@Page({
  templateUrl: 'build/pages/select-location/select-location.html',
  directives: [GoogleMaps]
})
export class SelectLocationPage {
  location: ProjectLocation;
  mapReady: boolean = false;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private locationService: LocationService) {

  }

  onPageWillEnter() {
    this.locationService.getLocation()
      .then(location => {
        this.location = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
      });
  }

  onMapClicked(location: ProjectLocation) {
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude
    };
  }

  onMapReady() {
    this.mapReady = true;
  }

  setLocation() {
    let project = this.navParams.get('project');
    project.location = this.location;
    this.nav.pop();
  }

}