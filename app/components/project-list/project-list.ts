import {Component, Input} from 'angular2/core';
import {Project} from '../../models/project';

@Component({
  selector: 'project-list',
  templateUrl: 'build/components/project-list/project-list.html'
})
export class ProjectList {
  @Input() projects: Array<Project>;
}