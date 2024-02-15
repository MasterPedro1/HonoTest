import { db } from "../../utils/db";

export const getContrato = async (c) => {

    try {

        const contratoById = await db.contrato.findUnique({
            where: {
                id: id
            },
            include: {
                invoices: true
            }
        })


        if (!contratoById) {
            throw new Error("¡No hay ningun contrato con este Id!")
        }

       

        return {
            success: "¡Estos son los recibos asociados a este contrato!",
            data: contratoById,
        }

    } catch (error) {
        console.error("CONTRATO GET ERROR", error);

        
        return {
            error: error.messagge
        }
    }
}