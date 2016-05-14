import {Component, Input} from 'angular2/core';
import {Project} from '../../models/project';

@Component({
  selector: 'project-photo-list',
  templateUrl: 'build/components/project-photo-list/project-photo-list.html'
})
export class ProjectPhotoList {
  @Input() project: Project;
  @Input() editable: boolean;
}