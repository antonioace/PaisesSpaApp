import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    this.paisService.buscarPaisCapital(this.termino).subscribe(
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
  }
}
