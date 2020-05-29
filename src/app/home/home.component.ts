import { Component, OnInit } from '@angular/core';
import { Cliente} from 'src/app/class/cliente.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cliente:Cliente;

  constructor() { 
    if(localStorage.getItem('clientes')){
      this.cliente = JSON.parse(localStorage.getItem('clientes'));
    }
  }

  ngOnInit(): void {
  }

}
