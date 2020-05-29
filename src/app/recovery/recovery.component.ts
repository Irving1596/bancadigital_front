import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente} from 'src/app/class/cliente.class';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  tipoid:string[]=["cedula","pasaporte"];
  seleccionado:string='cedula';
  validatingForm: FormGroup;
  formpin: FormGroup;
  pattern;
  cliente:Cliente;
  id: number;
  pin: number; 
  constructor(private cliente_service: ClienteService , private router: Router) { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      minLength: new FormControl(null, [Validators.required, Validators.minLength(10),Validators.maxLength(10)])

    });

  }
  get input() { return this.validatingForm.get('minLength'); }

  valida_cliente(): void {
    const est = this.cliente_service.getClienteRecoveryUser(this.id,this.pin).subscribe(
      (data: Cliente) => {
          this.cliente = data;
          this.guardarStorage('clientes'); 
           console.log(this.cliente);
           if(this.cliente!=null){
         if(this.cliente.identificacion==this.id && this.cliente.password==this.pin){
              this.router.navigate(['verificacion']);
         }
        }
        else {
          alert ('Usted no posee productos en el banco');
        }
      });
  }
  guardarStorage(event){
    switch(event){
      case 'clientes':
        localStorage.setItem('clientes',JSON.stringify(this.cliente));
      break;
    }
  }

}
