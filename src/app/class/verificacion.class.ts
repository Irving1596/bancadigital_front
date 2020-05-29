  
export class Verificacion {
    celular?: number
    otp?:number
    hash?:string
    estado?:string

    constructor(
        celular?: number,
        otp?:number,
        hash?:string,
        estado?:string
    ) {
    
        this.celular=celular;
        this.otp=otp;
        this.hash=hash;
        this.estado=estado;
    }
    
    }