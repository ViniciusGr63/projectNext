const express = require('express');
const CvRoutes = require('./routes/CvRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.get('/api', (req, res) => {
  res.json({ Cv_crud_express: 'este é um crud de curriculos' });
});


app.use('/api', CvRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
