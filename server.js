require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Configuração do Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rota para envio de e-mail
app.post('/enviar-email', (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Configuração do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usando o Gmail como exemplo
    auth: {
      user: process.env.EMAIL_USER,  // Usando a variável de ambiente
      pass: process.env.EMAIL_PASS,  // Usando a variável de ambiente
    },
  });

  const mailOptions = {
    from: email,
    to: 'glvinformatica2024@gmail.com', // E-mail que vai receber as mensagens de suporte
    subject: `Mensagem de Suporte de ${nome}`,
    text: mensagem,
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).send('Erro ao enviar o e-mail.');
    }
    console.log('E-mail enviado:', info.response);
    res.status(200).send('E-mail enviado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
