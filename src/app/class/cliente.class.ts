  
export class Cliente {
    id?: number
    identificacion?:number
    nombre_usuario?:string
    password?:number
    tipo_identificacion?:number
    nombre?: string
    apellido?: string
    correo?: Date
    celular?: string
    
    constructor(
        id?: number,
        identificacion?:number,
        nombre_usuario?:string,
        password?:number,
        tipo_identificacion?:number,
        nombre?: string,
        apellido?: string,
        correo?: Date,
        celular?: string
    ) {
    
        this.id=id;
        this.identificacion=identificacion;
        this.nombre_usuario=nombre_usuario;
        this.password=password;
        this.tipo_identificacion=tipo_identificacion
        this.nombre=nombre;
        this.apellido=apellido;
       this.correo=correo;
       this.celular=celular;
    
    }
    
    }