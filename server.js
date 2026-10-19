import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'docs')));
app.use('/fonts', express.static(path.join(__dirname, 'font')));

app.post('/api/contact', (request, response) => {
  const { name, company, contact, service, project } = request.body ?? {};

  if (![name, contact, service, project].every((value) => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ message: 'Preencha os campos obrigatórios para enviar o pedido.' });
  }

  // Ponto de integração: substitua esta linha por envio para CRM, e-mail ou base de dados.
  console.info('Novo contacto Nest Angola:', { name, company, contact, service });
  return response.status(201).json({ message: 'Pedido recebido. Entraremos em contacto brevemente.' });
});

app.get('*', (_request, response) => response.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => console.log(`Nest Angola disponível em http://localhost:${port}`));
