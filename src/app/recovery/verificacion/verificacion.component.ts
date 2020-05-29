import { Component, OnInit } from '@angular/core';
import { Verificacion } from 'src/app/class/verificacion.class';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/class/cliente.class';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss']
})
export class VerificacionComponent implements OnInit {
  verificacion: Verificacion;
  cliente: Cliente;
  public codigo_otp: number;

  constructor(private cliente_service: ClienteService, private router: Router) {
    if (localStorage.getItem('clientes')) {
      this.cliente = JSON.parse(localStorage.getItem('clientes'));
    }
    this.enviaCodigo();
  }

  ngOnInit(): void {

  }
  enviaCodigo(): void {
    const sendVerificacion = this.cliente_service.postSendVerify(this.cliente).subscribe(
      (data: Verificacion) => {
        this.verificacion = data;
        this.guardarStorage('clientesVerif');
        console.log("verificacion quedo: ", this.verificacion);
      });
  }

  verifica_cliente(): void {
    console.log("verificacion antes", this.verificacion);
    this.verificacion.celular = this.cliente.celular;
    //this.verificacion.otp=this.otp;
    console.log("otp::::", this.codigo_otp);
    this.verificacion.otp = this.codigo_otp;
    console.log("verificacion despues set datos", this.verificacion);
    const sendvalidacion = this.cliente_service.postValidVerify(this.verificacion).subscribe(
      (data: Verificacion) => {
        this.verificacion = data;
        console.log(this.verificacion);
        if (this.verificacion.estado == 'correcto') {
          this.router.navigate(['home']);
        }
        else if (this.verificacion.estado == 'incorrecto') {
          alert('El codigo invalido verifique e intente de nuevo');
        }
        else if (this.verificacion.estado == 'timeout') {
          alert('El codigo ha expirado ');
        } else {
          alert('Error xyz');
        }

      });
  }




  guardarStorage(event) {
    switch (event) {
      case 'clientesVerif':
        localStorage.setItem('clientesVerif', JSON.stringify(this.verificacion));
        break;
    }
  }
}
