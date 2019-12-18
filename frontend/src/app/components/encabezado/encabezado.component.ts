import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  constructor() { }

  ngOnInit() {
  }

}
