import {Component, Input, Output, EventEmitter, NgZone} from 'angular2/core';
import {ProjectLocation} from '../../models/project';

declare var google;

const MAP_ELEMENT_ID = 'google-maps';
const DEFAULT_ZOOM = 15;

@Component({
  selector: 'google-maps',
  templateUrl: 'build/components/google-maps/google-maps.html'
})
export class GoogleMaps {
  @Input() center: ProjectLocation;
  @Input() markers: Array<ProjectLocation>;
  @Output() mapClick: EventEmitter<ProjectLocation> = new EventEmitter();
  @Output() mapReady: EventEmitter<{}> = new EventEmitter();
  private _map: any;
  private _markers: Array<any> = [];

  constructor(private zone: NgZone) {

  }

  ngOnInit() {
    this._map = new google.maps.Map(document.getElementById(MAP_ELEMENT_ID), {
      zoom: DEFAULT_ZOOM,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.centerMap();
    this.updateMarkers();
    this._map.addListener('click', e => this.onMapClicked(e));
    this._map.addListener('idle', () => this.onMapReady());
  }

  ngOnChanges() {
    if (!this._map) {
      return;
    }
    this.centerMap();
    this.cleanMarkers();
    this.updateMarkers();
  }

  private centerMap() {
    this._map.setCenter({
      lat: this.center.latitude,
      lng: this.center.longitude
    });
  }

  private updateMarkers() {
    this._markers = this.markers.map(marker => {
      return new google.maps.Marker({
        map: this._map,
        position: {
          lat: marker.latitude,
          lng: marker.longitude
        }
      });
    });
  }

  private cleanMarkers() {
    this._markers.forEach(marker => marker.setMap(null));
  }

  private onMapClicked(e) {
    this.zone.run(() => {
      this.mapClick.emit({
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng()
      });
    });
  }

  private onMapReady() {
    this.zone.run(() => {
      this.mapReady.emit({});
    });
  }

}