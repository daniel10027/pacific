import {Injectable} from 'angular2/core';
import {Camera} from 'ionic-native';

@Injectable()
export class PictureService {

  getPicture(): Promise<any> {
    return Camera.getPicture({});
  }

}