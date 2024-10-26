import { Request, Response, Router } from "express";
import { requiresAuth } from "express-openid-connect";
import QRCode from "qrcode";
import { checkJwt } from "../middleware/auth";
import {
  createTicket,
  getTicketById,
  getTicketCountByVatin,
} from "../models/ticket";

const router = Router();

router.post(
  "/generate-ticket",
  checkJwt,
  async (req: Request, res: Response): Promise<void> => {
    const { vatin, firstName, lastName } = req.body;

    try {
      if (!vatin || !firstName || !lastName) {
        res.status(400).json({
          error: "Missing required field(s) - vatin, firstName, lastName",
        });
        return;
      }

      const ticketCount = await getTicketCountByVatin(vatin);
      if (ticketCount >= 3) {
        res.status(400).json({
          error:
            "Maximum number of tickets (3) already generated for this VATIN",
        });
        return;
      }

      const ticket = await createTicket(vatin, firstName, lastName);
      const ticketUrl = `${process.env.BACKEND_URL}/tickets/${ticket.id}`;
      const qrCode = await QRCode.toDataURL(ticketUrl);

      res.json({
        ticketId: ticket.id,
        qrCode,
        ticketUrl,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/:id", requiresAuth(), async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);

    if (!ticket) {
      res.json({ error: "Ticket not found" });

    }

    res.render("ticket", {
      ticket,
      user: req.oidc.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
