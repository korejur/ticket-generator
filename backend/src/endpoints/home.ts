import { Router } from 'express';
import QRCode from 'qrcode';
import { getLatestTicketFromDB, getTotalTicketCount } from '../models/ticket';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const totalTickets = await getTotalTicketCount();
    const latestTicket = await getLatestTicketFromDB();
    
    let qrCode = null;
    if (latestTicket) {
      const ticketUrl = `${process.env.BACKEND_URL}/tickets/${latestTicket.id}`;
      qrCode = await QRCode.toDataURL(ticketUrl);
    }

    res.render('home', { 
      totalTickets,
      latestTicket,
      qrCode
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;