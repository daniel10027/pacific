import {Page, NavController} from 'ionic-angular';
import {AddProjectPage} from '../add-project/add-project';
import {Project} from '../../models/project';
import {ProjectList} from '../../components/project-list/project-list';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [ProjectList]
})
export class HomePage {
  projects: Array<Project> = [];

  constructor(private nav: NavController) {

  }

  addProjectTapped() {
    this.nav.push(AddProjectPage, {});
  }
}
