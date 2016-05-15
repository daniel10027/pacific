import {Page} from 'ionic-angular';
import {GoogleMaps} from '../../components/google-maps/google-maps';
import {ProjectLocation, ProjectMarker} from '../../models/project';
import {LocationService} from '../../services/location';
import {ProjectService} from '../../services/project';

@Page({
  templateUrl: 'build/pages/project-map/project-map.html',
  directives: [GoogleMaps]
})
export class ProjectMapPage {
  projectLocations: Array<ProjectMarker> = [];
  currentLocation: ProjectLocation;

  constructor(private projectService: ProjectService, private locationService: LocationService) {

  }

  onPageWillEnter() {
    let promises = [
      this.projectService.getAll(),
      this.locationService.getLocation()
    ];
    Promise.all(promises)
      .then((results: Array<any>) => {
        let projects = results[0];
        let location = results[1];
        this.projectLocations = projects
          .filter(project => !!project.location)
          .map(project => ({
            latitude: project.location.latitude,
            longitude: project.location.longitude,
            project
          }));
        this.currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
    });
  }
}