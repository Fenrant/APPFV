

export class Ejemplo {
    id:          number = 0;
    algoritmoId:          number = 0;
    cantParametros:          number = 0;
    descripcion:      string = "";
    numEjemplo:   number = 0;
    createAt: string = "";
    parametros: Parametros[] = [];

}


export class Parametros {
    
    id: number = 0;
    nombre: string = "";
    tipoDato: string = "";
    valor: any;
    inputOutput: string = "INPUT";
    orden: number = 0;
    descripcion: string = "";
}