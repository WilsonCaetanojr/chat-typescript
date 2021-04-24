import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from "../entities/Message";

interface IMessagesCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessagesCreate) {
    const message = this.messagesRepository.create({
      user_id,
      admin_id,
      text,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const lsit = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return lsit;
  }
}

export { MessagesService };
