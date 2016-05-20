import {Page, NavParams} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectPhotoList} from '../../components/project-photo-list/project-photo-list';
import {GoogleMaps} from '../../components/google-maps/google-maps';
import {ProjectService} from '../../services/project';

declare var cordova;

@Page({
  templateUrl: 'build/pages/project/project.html',
  directives: [
    ProjectPhotoList,
    GoogleMaps
  ]
})
export class ProjectPage {
  project: Project;

  constructor(navParams: NavParams, private projectService: ProjectService) {
    this.project = navParams.get('project');
  }

  shareIconTapped() {
    this.projectService.shareProject(this.project);
  }

  addIconTapped() {
    this.project.preview = false;
    this.projectService.add(this.project);
  }
  
}