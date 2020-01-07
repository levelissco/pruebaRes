import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  clave_profesor: any;
  constructor(private storage: StorageMap, private router: Router) {     
    this.storage.get('clave_profesor').subscribe((profesor) => {
    this.clave_profesor=profesor;
  });}

  ngOnInit() {
  }
  logOut(){
    this.storage.delete('clave_profesor').subscribe(() => { 
      this.router.navigate(['/'])
    });
  }
}
