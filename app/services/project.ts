import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';
import {Project} from '../models/project';
const PouchDB = require('pouchdb');

@Injectable()
export class ProjectService {
  private DB_NAME: string = 'projects';
  private db;

  constructor(private platform: Platform) {
    this.initializeDB();
  }

  private initializeDB() {
    this.platform.ready()
      .then(() => {
        this.db = new PouchDB(this.DB_NAME, {
          adapter: 'websql',
          location:'default'
        });
      });
  }

  get(id: string): Promise<Project> {
    return this.platform.ready()
      .then(() => this.db.get(id))
      .then(ProjectService.mapProject);
  }

  getAll(options = {}): Promise<Array<Project>> {
    const _options = Object.assign({
      include_docs: true
    }, options);
    return this.platform.ready()
      .then(() => this.db.allDocs(_options))
      .then(results => results.rows.map(item => ProjectService.mapProject(item.doc)));
  }

  add(project: Project): Promise<any> {
    if (!project.valid) {
      return Promise.reject(new Error('Trying to save an invalid project'));
    }
    project._id = new Date().toISOString();
    return this.platform.ready()
      .then(() => this.db.post(project));
  }

  update(project: Project): Promise<any> {
    return this.platform.ready()
      .then(() => this.db.put(project));
  }

  remove(project: Project): Promise<any> {
    return this.platform.ready()
      .then(() => this.db.remove(project));
  }

  private static mapProject(doc) {
    let project = new Project();
    project._id = doc._id;
    project.name = doc.name;
    project.description = doc.description;
    project.location = doc.location;
    project.cover = doc.cover;
    project.photos = doc.photos;
    return project;
  }
}