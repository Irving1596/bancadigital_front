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
  codigo_otp: number;
  estado = 'novalido';
  config_time= 180;  // indicates the time (in secs) in which will forward the code
  diff:number; 
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  tiempo_terminado:number;

  constructor(private cliente_service: ClienteService, private router: Router) {
    if (localStorage.getItem('clientes')) {
      this.cliente = JSON.parse(localStorage.getItem('clientes'));
    }

  }

  ngOnInit(): void {
    this.enviaCodigo(); 
  }
  enviaCodigo(): void {
    this.diff=0;
    const sendVerificacion = this.cliente_service.postSendVerify(this.cliente).subscribe(
      (data: Verificacion) => {
        this.verificacion = data;
        this.guardarStorage('clientesVerif');
      });
      this.tiempo_codigo();
  }

  verifica_cliente(): void {
    this.verificacion.celular = this.cliente.celular;
    this.verificacion.otp = this.codigo_otp;
    const sendvalidacion = this.cliente_service.postValidVerify(this.verificacion).subscribe(
      (data: Verificacion) => {
        //this.verificacion = data;
        this.estado = data.estado;
        console.log(this.verificacion);
        if (data.estado === 'valido') {
          //this.router.navigate(['home']);
          //alert('Validación correcta ');
        }
        else if (data.estado === 'novalido') {
          alert('El codigo es invalido verifique e intente de nuevo');
        }
        else if (data.estado === 'timeout') {
          alert('El codigo ha expirado ');
        } else {
          alert('Error xyz');
        }

      });
  }
  tiempo_codigo(): void {
    this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.calc_tiempo(); }, 1000);
      this.duration = this.parseTime(this.config_time);
  }

  calc_tiempo() {
    const now = new Date();
     this.diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (this.diff >= this.config_time) {
      this.stopTime();
    }else{
    this.ellapsedTime = this.parseTime(this.diff);
    }
  }

  stopTime(){
    clearInterval(this.timer);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  guardarStorage(event) {
    switch (event) {
      case 'clientesVerif':
        localStorage.setItem('clientesVerif', JSON.stringify(this.verificacion));
        break;
    }
  }
}
