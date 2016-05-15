import {Injectable} from 'angular2/core';
import {Geolocation} from 'ionic-native';

@Injectable()
export class LocationService {
  
  getLocation() {
    return Geolocation.getCurrentPosition();
  }
  
}