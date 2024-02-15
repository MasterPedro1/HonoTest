import { db } from "../../utils/db";

export const getContratos = async (c) => {
    try {

        const contratoByCurp = await db.persona.findUnique({
            where: {
                curp: curp
            },
            include: {
                contratos: true
            }
        })

        if (!contratoByCurp) {
            throw new Error("¡No se encontro ningun contrato con este CURP!")
        }

        if (contratoByCurp.length === 0) {
            throw new Error("¡No hay contratos asociados a este CURP!")
        }

        

        return c.json({
            success: "¡Aquí están todos los contratos asociados a este CURP!",
            data: contratoByCurp.contratos
        });


    } catch (error) {
        console.error("CONTRATO GET ERROR");

        

        return c.json ({
            error: error.message
        })
    }
}