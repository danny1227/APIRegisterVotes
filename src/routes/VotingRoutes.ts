import { Router, Request, Response } from 'express';
import Campaign from '../models/Campaign'; 

const router = Router();

let campaigns: Campaign[] = []; 

// Ruta para habilitar/deshabilitar la votación de una campaña
router.patch('/campaigns/:id/voting', (req: Request, res: Response) => {
  const { id } = req.params;
  const { isEnabled } = req.body;  // Recibe el nuevo estado de habilitación

  // Buscar la campaña por ID
  const campaign = campaigns.find(c => c.id === parseInt(id));
  if (!campaign) {
    return res.status(404).json({ message: 'Campaña no encontrada.' });
  }

  // Actualizar el estado de habilitación de la votación
  campaign.isEnabled = isEnabled;

  res.status(200).json({ message: `Votación ${isEnabled ? 'habilitada' : 'deshabilitada'} para la campaña ${campaign.title}.`, campaign });
});

export default router;
