import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { db } from '../utils/db';
import { cors } from 'hono/cors';
import { getInvoices } from './controllers/get-invoices';
import { getContratos } from './controllers/get-contratos';
import { getContrato } from './controllers/get-contrato';
import { getInvoiceUrl } from './controllers/get-invoice-url';
import { postAsesor } from './controllers/post-asesor';

const app = new Hono();

app.use('/*',
  cors({
    origin: '*',
  })
)

app.get('/api/titular/:curp', async (c) => {
  try {
    const users = await db.persona.findMany({
      where: {
        curp: c.params.curp, 
      },
    });

    return c.json(users);
  } catch (error) {
    console.error(error.message);
    return c.json({ error: 'Ocurrió un error al obtener la información del titular.' });
  } finally {
  }
});


app.post('/api/asesorias/', async (c) => {
  try {
    
    console.log('Received POST request for asesorias');
    return await postAsesor(c);
  } catch (error) {
    console.error('Error en la ruta /api/asesorias:', error.message);
    return c.json({ error: 'Ocurrió un error al procesar la solicitud de asesoría.' });
  }
});

const port = 4000;
console.log(`Server is running on port ${port}`);


serve({
  fetch: app.fetch,
  port,
});
