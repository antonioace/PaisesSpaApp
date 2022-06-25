import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  @Output() OnEnter: EventEmitter<string> = new EventEmitter();
  // OnDebounce se deja de emitir cuando la persona deja de escribir
  @Output() OnDebounce: EventEmitter<string> = new EventEmitter();
  termino: string = '';
  @Input() placeholder: string = '';
  // El subject permite crear un obserable manualmente
  debouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))

      .subscribe((valor) => {
        this.OnDebounce.emit(valor);
      });
  }

  buscar() {
    this.OnEnter.emit(this.termino);
  }

  teclaPresionada(): void {
    this.debouncer.next(this.termino);
  }
}
