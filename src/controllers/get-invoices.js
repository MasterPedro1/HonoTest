import { db } from "../../utils/db";
import { format } from "date-fns"
import es from "date-fns/locale/es"

export const getInvoices = async (c) => {
    try {

        const locale = es;

        const invoicesContrato = await db.invoice.findMany({
            where: {
                contratoId: contratoId
            },
            orderBy: {
                dueDate: "asc"
            }
        })

        const formattedInvoices = invoicesContrato.map(item => ({
            ...item,
            dueDate: format(item.dueDate, "d MMMM, yyyy", { locale }),
            createdAt: format(item.createdAt, "d MMMM, yyyy", { locale })
        }))


        set.status = 200;

        console.log("SUCCESS GET INVOICES", formattedInvoices);

        return {
            success: "¡Estos son los recibos asignados a este contrato!",
            data: formattedInvoices
        }



    } catch (error) {
        // Mejorar los logs para incluir detalles sobre el error
        console.error("Error en getInvoices:", error);

        set.status = 500;

        return {
            error: error.message
        };
    }
};
