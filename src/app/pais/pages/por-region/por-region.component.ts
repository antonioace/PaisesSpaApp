import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  termino: string = '';
  hayError: boolean = false;

  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  paises: Country[] = [];

  regionActiva: string = '';
  constructor(private paisService: PaisService) {}

  activarRegion(region: string) {
    if (region == this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];

    this.paisService.buscarPaisRegion(this.regionActiva).subscribe(
      (paises) => {
       
        this.paises = paises;
        
      },
      (error) => {
        this.hayError = true;
        this.paises = [];
        console.log(error);
        console.info(error);
      }
    );
  }
  sugerencias(termino: string) {
    this.hayError = false;
  }



  
  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }
}
