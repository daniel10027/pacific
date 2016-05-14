import {Page, NavParams} from 'ionic-angular/index';
import {Project} from '../../models/project';
import {ProjectPhotoList} from '../../components/project-photo-list/project-photo-list';

@Page({
  templateUrl: 'build/pages/project/project.html',
  directives: [ProjectPhotoList]
})
export class ProjectPage {
  project: Project;

  constructor(navParams: NavParams) {
    this.project = navParams.get('project');
  }
  
}