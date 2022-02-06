import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.scss']
})

export class PaisInputComponent implements OnInit {

  @Input() placeholder: String = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();
  termino = '';

  ngOnInit(){
    this.debouncer
    .pipe(
      debounceTime(300)
    ).
    subscribe(valor => {
      this.onDebounce.emit(valor);
    })
  }

  buscar() {
    this.onEnter.emit(this.termino);

  }

  teclaPresionada(event: any) {
    this.debouncer.next(this.termino);
  }

}
