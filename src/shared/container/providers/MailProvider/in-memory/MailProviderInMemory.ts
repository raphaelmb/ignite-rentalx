import { IMailProvider } from "../IMailProvider";

export default class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  async sendMail(
    to: string,
    subject: string,
    varaibles: any,
    path: string
  ): Promise<void> {
    this.message.push({ to, subject, varaibles, path });
  }
}
