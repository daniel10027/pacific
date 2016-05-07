import {Page} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectList} from '../../components/project-list/project-list';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [ProjectList]
})
export class HomePage {
  projects: Array<Project> = [];

  constructor() {

  }
}
