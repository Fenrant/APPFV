// To parse this data:
//
//   import { Convert, Modulo } from "./file";
//
//   const modulo = Convert.toModulo(json);

export interface Modulo {
    id:          number;
    nombre:      string;
    descripcion: string;
    tipo:        string;
    codModulo:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toModulo(json: string): Modulo {
        return JSON.parse(json);
    }

    public static moduloToJson(value: Modulo): string {
        return JSON.stringify(value);
    }
}
