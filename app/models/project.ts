export class Project {
  _id: string;
  name: string;
  description: string;
  cover: string;
  photos: Array<string> = [];

  addPhoto(photo: string) {
    this.photos.push(photo);
    if(!this.cover) {
      this.cover = photo;
    }
  }

  removePhoto(photo: string) {
    let position = this.photos.indexOf(photo);
    if(position !== -1) {
      this.photos.splice(position, 1);
    }
    if(photo === this.cover) {
      this.cover = this.photos[0] || '';
    }
  }

  get valid() {
    return !!this.name;
  }
}