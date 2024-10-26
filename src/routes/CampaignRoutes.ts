import { Router, Request, Response } from 'express';
import Campaign from '../models/Campaign';
import Candidate from '../models/Candidate'; 

const router = Router();

let campaigns: Campaign[] = [];
let campaignIdCounter = 1;
let candidateIdCounter = 1;

// Ruta para crear una nueva campaña
router.post('/campaigns', (req: Request, res: Response) => {
  const { title, description, isEnabled, candidates } = req.body;
  console.log(req.body);
  // Crear una nueva instancia de Campaign
  console.log(candidates);
  const newCampaign = new Campaign(campaignIdCounter++, title, description, isEnabled, candidates);
  campaigns.push(newCampaign);
  console.log(campaigns);
  res.status(201).json({ message: 'Campaña creada con éxito.', campaign: newCampaign });
});


// Ruta para agregar un candidato a una campaña existente
router.post('/campaigns/:id/candidates', (req: Request, res: Response) => {
  const { name, description, faculty } = req.body;
  const { id } = req.params;

  // Buscar la campaña por ID
  const campaign = campaigns.find(c => c.id === parseInt(id));
  if (!campaign) {
    return res.status(404).json({ message: 'Campaña no encontrada.' });
  }

  // Crear una nueva instancia de Candidate
  const newCandidate = new Candidate(
    candidateIdCounter++,  
    name,                  
    description,           
    faculty,               
    campaign.id,           
    0                      
  );

  // Agregar el candidato a la lista de candidatos de la campaña
  campaign.candidates.push(newCandidate);

  res.status(201).json({ message: `Candidato agregado a la campaña ${campaign.title}.`, candidate: newCandidate });
});


// Ruta para listar todas las campañas
router.get('/campaigns', (req: Request, res: Response) => {
  res.status(200).json({ campaigns });
});

// Ruta para listar los candidatos de una campaña específica
router.get('/campaigns/:id/candidates', (req: Request, res: Response) => {
  const { id } = req.params;

  // Buscar la campaña por ID
  const campaign = campaigns.find(c => c.id === parseInt(id));
  if (!campaign) {
    return res.status(404).json({ message: 'Campaña no encontrada.' });
  }

  // Devolver la lista de candidatos de la campaña
  res.status(200).json({ candidates: campaign.candidates });
});

// Ruta para votar por un candidato
router.post('/campaigns/:campaignId/candidates/:candidateId/vote', (req: Request, res: Response) => {
  const { campaignId, candidateId } = req.params;
  console.log(req.params);
  // Buscar la campaña por ID
  const campaign = campaigns.find(c => c.id === parseInt(campaignId));
  console.log(campaign);  
  if (!campaign) {
    return res.status(404).json({ message: 'Campaña no encontrada.' });
  }
  console.log("se encontro campag");  
  // Buscar el candidato por ID dentro de la campaña encontrada
  const candidate = campaign.candidates.find(c => c.id === parseInt(candidateId));
  console.log(candidate);
  if (!candidate) {
    return res.status(404).json({ message: 'Candidato no encontrado en esta campaña.' });
  }
  console.log("candidate encontrado");

  // Incrementar el número de votos del candidato
  candidate.votes += 1;

  res.status(200).json({ message: `Voto registrado para ${candidate.name}.`, votes: candidate.votes });
});

export default router;
