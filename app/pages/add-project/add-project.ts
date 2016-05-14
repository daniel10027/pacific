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

  constructor(private nav: NavController,
              private projectService: ProjectService,
              private pictureService: PictureService) {
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

  addPhotoTapped() {
    this.pictureService.getPicture()
      .then(photo => {
        if(photo) {
          this.project.addPhoto(photo);
        }
      });
  }
}