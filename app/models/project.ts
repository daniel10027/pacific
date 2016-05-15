export interface ProjectLocation {
  latitude: number;
  longitude: number;
}

export class Project {
  _id: string;
  name: string;
  description: string;
  location: ProjectLocation;
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

  get createdAt() {
    return new Date(this._id);
  }

  get valid() {
    return !!this.name;
  }
}