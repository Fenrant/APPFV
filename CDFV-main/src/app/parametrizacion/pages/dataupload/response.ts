// To parse this data:
//
//   import { Convert, Response } from "./file";
//
//   const response = Convert.toResponse(json);

export interface Respuesta {
    statusCode: number;
    mensaje:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toResponse(json: string): Respuesta {
        return JSON.parse(json);
    }

    public static responseToJson(value: Respuesta): string {
        return JSON.stringify(value);
    }
}
