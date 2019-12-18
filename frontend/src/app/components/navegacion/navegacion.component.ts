import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  clave_profesor: any;
  constructor(private storage: StorageMap) {     
    this.storage.get('clave_profesor').subscribe((profesor) => {
    this.clave_profesor=profesor;
    console.log(this.clave_profesor);
  });}

  ngOnInit() {
  }

}
