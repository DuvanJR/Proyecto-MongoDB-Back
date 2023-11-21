const express = require('express');
const mongoose = require('mongoose');
const universityRoutes = require('./routes/universityRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors'); 
const app = express();
app.use(express.json());

// Conectar a MongoDB (asegúrate de tener tu URL de conexión)
mongoose.connect('mongodb+srv://duvanjaimes28:duvanjr13@cluster0.8mr7xaz.mongodb.net/Proyecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a la base de datos'));

// Rutas
app.use('/api', universityRoutes);
app.use('/api', commentRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});