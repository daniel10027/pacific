import {Page, NavController} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project';

@Page({
  templateUrl: 'build/pages/add-project/add-project.html'
})
export class AddProjectPage {
  project: Project = new Project();

  constructor(private nav: NavController, private projectService: ProjectService) {

  }

  saveProject() {
    this.projectService.add(this.project)
      .then(() => {
        // Go to the previous page
        if(this.nav.canGoBack()) {
          this.nav.pop();
        }
      });
  }
}