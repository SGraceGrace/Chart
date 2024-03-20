import { Component } from '@angular/core';
import * as L from 'leaflet';
import { AppService } from '../app.service';

declare const HeatmapOverlay: any;

const heatData: any = {
  data: [],
};

@Component({
  selector: 'app-density-map',
  templateUrl: './density-map.component.html',
  styleUrls: ['./density-map.component.scss']
})
export class DensityMapComponent {

  private map!: any;

  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    const heatLayerConfig = {
      radius: 5,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'count',
    };

    const heatmapLayer = new HeatmapOverlay(heatLayerConfig);

    this.appService.getLocations().subscribe((data) => {
      data.forEach((data) => {
        heatData.data.push(data);
      });

      console.log(heatData);

      heatmapLayer.setData(heatData);

      heatmapLayer.addTo(this.map);
    });
  }
}
