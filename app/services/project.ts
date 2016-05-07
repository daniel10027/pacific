import {Injectable} from 'angular2/core';
import {Project} from '../models/project';
const PouchDB = require('pouchdb');

@Injectable()
export class ProjectService {
  private DB_NAME: string = 'projects';
  private db = new PouchDB(this.DB_NAME, { adapter: 'websql', location:'default' });

  get(id: string): Promise<Project> {
    return this.db.get(id)
      .then(doc => ProjectService.mapProject(doc));
  }

  add(project: Project): Promise<any> {
    return this.db.post(project);
  }

  update(project: Project): Promise<any> {
    return this.db.put(project);
  }

  remove(project: Project): Promise<any> {
    return this.db.remove(project);
  }

  private static mapProject(doc) {
    let project = new Project();
    project.id = doc._id;
    project.name = doc.name;
    project.description = doc.description;
    return project;
  }
}