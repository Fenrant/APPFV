// To parse this data:
//
//   import { Convert, Result } from "./file";
//
//   const result = Convert.toResult(json);

export interface Result {
    comando_id:     string;
    estado:         string;
    exitosa:        boolean;
    fecha_creacion: Date;
    fecha_fin:      Date;
    fecha_inicio:   Date;
    id:             number;
    mensaje:        string;
    output:         string[];
    padre_id:       number;
    prueba_id:      number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toResult(json: string): Result {
        return JSON.parse(json);
    }

    public static resultToJson(value: Result): string {
        return JSON.stringify(value);
    }
}
