import {Injectable} from 'angular2/core';
import {Camera} from 'ionic-native';

@Injectable()
export class PictureService {

  getPicture(): Promise<any> {
    const options = {
      destinationType: Camera.DestinationType.DATA_URL
    };
    return Camera.getPicture(options);
  }

}