import {Page, NavController} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project';
import {AddProjectPage} from '../add-project/add-project';
import {ProjectMapPage} from '../project-map/project-map';
import {ProjectPage} from '../project/project';
import {ProjectList} from '../../components/project-list/project-list';

declare var fileChooser;

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [ProjectList]
})
export class HomePage {
  projects: Array<Project> = [];

  constructor(private nav: NavController, private projectService: ProjectService) {

  }

  onPageWillEnter() {
    const options = {
      descending: true
    };
    this.projectService.getAll(options)
      .then(projects => {
        this.projects = projects;
      });
  }

  addProjectTapped() {
    this.nav.push(AddProjectPage, {});
  }

  mapIconTapped() {
    this.nav.push(ProjectMapPage, {});
  }

  openIconTapped() {
    fileChooser.open(file => {
      this.projectService.importProject(file)
        .then(project => {
          this.nav.push(ProjectPage, {
            project
          });
        });
    });
  }
}
