import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as L from 'leaflet';
import { ChangeDetectionStrategy } from '@angular/core';
import { StyleRenderer, lyl, ThemeVariables, SelectorsFn } from '@alyle/ui';

import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyImageCropper,
  ImgCropperErrorEvent,
  STYLES as CROPPER_STYLES,
} from '@alyle/ui/image-cropper';

const STYLES = (_theme: ThemeVariables, selectors: SelectorsFn) => {
  const cropper = selectors(CROPPER_STYLES);
  return {
    root: lyl`{
      ${cropper.root} {
        aspect-ratio: 3 / 2
        max-width: 600px
      }
    }`,
    cropperResult: lyl`{
      position: relative
      width: 150px
      height: 150px
    }`,
  };
};
const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/images/marker-icon.png';
const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrl: './publicar.component.css',
  providers: [StyleRenderer],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicarComponent implements AfterViewInit, OnInit {
  anuncioForm!: UntypedFormGroup;
  latitud: any;
  longitud: any;
  map: any;
  selectedFile: File | null = null;
  $$ = this.sRenderer.renderSheet(STYLES, 'root');
  croppedImage?: string | null = null;
  ready = false;
  @ViewChild(LyImageCropper) readonly cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 350, // Default `250`
    height: 350, // Default `200`
    fill: '#ff2997', // Default transparent
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true,
    // resizableArea: true
  };

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    readonly sRenderer: StyleRenderer
  ) {}

  ngOnInit(): void {
    //this.getUbicacion();
    this.anuncioForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      color: ['', [Validators.required]],
      tamano: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      collar: [false],
      vacunado: [false],
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [37.9922, -1.1307],
      zoom: 13,
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

    // Evento de clic en el mapa para seleccionar una ubicación
    this.map.on('click', (e: { latlng: { lat: any; lng: any } }) => {
      // Elimina marcadores anteriores
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Agrega un marcador en la ubicación seleccionada
      const { lat, lng } = e.latlng;
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('Ubicación Seleccionada')
        .openPopup();

      this.latitud = lat;
      this.longitud = lng;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('selectedFile', this.selectedFile);
    }
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
    if (!e.dataURL) {
      return;
    }
    // Convertir base64 a Blob
    const base64Data = e.dataURL.split(',')[1]; // Elimina el prefijo de la cadena base64
    const contentType = e.dataURL.split(',')[0].split(':')[1].split(';')[0]; // Obtiene el tipo MIME de la imagen
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Convertir Blob a File
    const fileName = 'cropped_image.png'; // Puedes personalizar el nombre del archivo
    const file = new File([blob], fileName, { type: contentType });

    // Establecer el archivo recortado como el archivo seleccionado
    this.selectedFile = file;
    console.log('selectedFile', this.selectedFile);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
  onSubmit() {
    if (this.anuncioForm.invalid || !this.croppedImage || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.anuncioForm.value.titulo);
    formData.append('descripcion', this.anuncioForm.value.descripcion);
    formData.append('imagen', this.selectedFile);
    formData.append('fecha', this.anuncioForm.value.fecha);
    formData.append('raza', this.anuncioForm.value.raza);
    formData.append('color', this.anuncioForm.value.color);
    formData.append('tamano', this.anuncioForm.value.tamano);
    formData.append('collar', this.anuncioForm.value.collar ? 'true' : 'false');
    formData.append(
      'vacunado',
      this.anuncioForm.value.vacunado ? 'true' : 'false'
    );
    formData.append('latitude', this.latitud.toString());
    formData.append('longitude', this.longitud.toString());
    formData.append('nomUsuario', localStorage.getItem('username') || '');
    console.log('formData', formData);

    this.http
      .post('http://localhost:8080/anuncio', formData)
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
