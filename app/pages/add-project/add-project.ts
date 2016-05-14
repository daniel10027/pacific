import {FormBuilder, Validators, ControlGroup, AbstractControl} from 'angular2/common';
import {Page, NavController} from 'ionic-angular';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project';
import {PictureService} from '../../services/picture';
import {ProjectPhotoList} from '../../components/project-photo-list/project-photo-list';


@Page({
  templateUrl: 'build/pages/add-project/add-project.html',
  directives: [ProjectPhotoList]
})
export class AddProjectPage {
  project: Project = new Project();
  name: AbstractControl;
  description: AbstractControl;
  projectForm: ControlGroup;

  constructor(form: FormBuilder,
              private nav: NavController,
              private projectService: ProjectService,
              private pictureService: PictureService) {

    // Set project form
    this.projectForm = form.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.name = this.projectForm.controls['name'];
    this.description = this.projectForm.controls['description'];
  }

  saveProject(values) {
    this.project.name = values.name;
    this.project.description = values.description;
    this.projectService.add(this.project)
      .then(() => {
        // Go to the previous page
        if(this.nav.canGoBack()) {
          this.nav.pop();
        }
      });
  }

  addPhotoTapped() {
    this.pictureService.getPicture()
      .then(photo => {
        if(photo) {
          this.project.addPhoto(photo);
        }
      });
  }
}