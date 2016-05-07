import {Page} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project';

@Page({
  templateUrl: 'build/pages/add-project/add-project.html'
})
export class AddProjectPage {
  project: Project = new Project();

  constructor(private projectService: ProjectService) {

  }

  saveProject() {
    this.projectService.add(this.project);
  }
}