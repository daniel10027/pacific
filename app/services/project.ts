import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';
import {File, SocialSharing} from 'ionic-native';
import {Project} from '../models/project';
const PouchDB = require('pouchdb');

declare var cordova;

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

  shareProject(project: Project): Promise<any> {
    return this.exportProject(project)
      .then(projectFile => {
        SocialSharing.share(project.name, project.description, projectFile);
      });
  }

  /**
   * Creates a JSON file with the project data
   */
  exportProject(project: Project): Promise<string> {
    let fileName = `project-${project.createdAt.getTime()}.json`;
    return new Promise((resolve, reject) => {
      File.createFile(ProjectService.CACHE_DIRECTORY, fileName, true)
        .then(fileEntry => {
          fileEntry.createWriter(fileWriter => {
            fileWriter.write(JSON.stringify(project));
            resolve(ProjectService.CACHE_DIRECTORY + fileName);
          });
        }, reject);
    });
  }

  /**
   * Promises a Project from an exported JSON file
   */
  importProject(filePath: string): Promise<Project> {
    let pathParts = filePath.split('/');
    let fileName = pathParts.pop();
    let dir = pathParts.join('/') + '/';
    return File.checkFile(dir, fileName)
      .then(fileEntry => this.openProjectFile(fileEntry));
  }

  private openProjectFile(fileEntry): Promise<Project> {
    return new Promise((resolve, reject) => {
      fileEntry.file(file => {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function() {
          try {
            let project = ProjectService.mapProject(JSON.parse(this.result));
            project.preview = true;
            resolve(project);
          } catch(e) {
            reject(e);
          }
        };
      });
    });
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

  private static get CACHE_DIRECTORY() {
    return cordova.file.externalCacheDirectory;
  }
}