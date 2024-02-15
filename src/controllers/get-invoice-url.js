import { db } from "../../utils/db";

export const getInvoiceUrl = async ({ params: { id }, set }) => {
    try {

        const invoiceById = await db.invoice.findUnique({
            where: {
                id: id
            }
        })

        console.log("GET INVOICE URL", invoiceById);

        set.status = 200;

        return {
            success: "¡Aqui esta el url donde puedes realizar el pago!",
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}//payment/${invoiceById.id}`
        }

    } catch (error) {

        set.status = 500;

        console.error("GET INVOICE URL ERROR", error.message);

        return {
            error: error.message
        }

    } finally {

    }
}