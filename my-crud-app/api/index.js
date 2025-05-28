
const express = require('express');
const CvRoutes = require('./routes/CvRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// No backend Express (api/index.js)
const cors = require('cors');
app.use(cors());


// Registrar suas rotas com prefixo /api
app.use('/api', CvRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
