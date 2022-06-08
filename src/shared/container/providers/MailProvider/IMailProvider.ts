interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    varaibles: any,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
