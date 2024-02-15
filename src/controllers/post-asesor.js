import { db } from "../../utils/db";

export const postAsesor = async (c) => {
    try {
        const body = await c.req.json()

        console.log(body);
        // console.log(c.req);
        // console.log("Este es el cuerpo ", c.body);

        const { nombre, telefono } = body;

        if (!nombre) {
            throw new Error("¡El nombre es invalido!")
        }

        if (!telefono) {
            throw new Error("¡El número de teléfono es invalido!")
        }

        // if (!whatsAppNumber) {
        //     throw new Error("¡El número de WhatsApp es invalido!")
        // }

        const cita = await db.cita.create({
            data: {
                nombre,
                telefono,
                
            }
        })

        if (!cita) {
            throw new Error("¡Ocurrio un error al generar su cita!")
        }

        
        return c.json({
            success: "¡Su cita se agendo exitosamente!",
            data: { hola: "mundo" }
        })


    } catch (error) {

        
        console.error("Internal Server Error 500", error.message);

        return c.json({
            error: error.message
        })

    }
}