import {Component, Input} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectPage} from '../../pages/project/project';

@Component({
  selector: 'project-list',
  templateUrl: 'build/components/project-list/project-list.html'
})
export class ProjectList {
  @Input() projects: Array<Project>;

  constructor(private nav: NavController) {

  }

  openProject(project: Project) {
    this.nav.push(ProjectPage, {
      project
    });
  }
}