import express from 'express';
import userRoutes from './routes/UserRoutes';
import campaignRoutes from './routes/CampaignRoutes';
import candidateRoutes from './routes/CandidatesRoutes'; 
import votingRoutes from './routes/VotingRoutes';
const cors = require('cors'); // Importa el paquete

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/candidate', candidateRoutes);  
app.use('/api/votingRoutes', votingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
