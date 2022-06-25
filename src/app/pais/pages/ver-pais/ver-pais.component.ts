import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;
  // ANTES DE QUE SE INICIALEZ
  constructor(
    private activatedRouted: ActivatedRoute,
    private paisService: PaisService
  ) {}
  // CUANDO EL COMPONENTE ESTA INICIALIZAOD
  ngOnInit(): void {
    /*  this.activatedRouted.params.subscribe(({ id }) => {
      console.log(id);

      this.paisService.getPaisPorAlpha(id).subscribe((pais) => {
        console.log(pais);
      });
    }); */

    this.activatedRouted.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)
      )
      .subscribe((resp) => {
        console.log(resp[0]);
        this.pais = resp[0];
      });
  }
}
