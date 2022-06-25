import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  mostrarSugerencias: boolean = false;
  paisesSugeridos: Country[] = [];
  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    console.log(this.termino);

    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        // paises[0].flags.png
        //  paises[0].idd
        //  paises[0].name
        //  paises[0].population
        this.paises = paises;
        console.log(paises);
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
    this.termino = termino;
    this.mostrarSugerencias = false;
    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      (error) => {
        this.paisesSugeridos = [];
      }
    );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
