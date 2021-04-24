import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, user_id, text } = req.body;

    const messagesService = new MessagesService();

    try {
      const message = await messagesService.create({ admin_id, user_id, text });

      return res.json(message);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}

export { MessagesController };
