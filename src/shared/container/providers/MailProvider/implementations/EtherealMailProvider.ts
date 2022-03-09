import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import Handlebars from "handlebars";
import fs from "fs";
@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          tls: {
  
            rejectUnauthorized: false,
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileCOntent = fs.readFileSync(path).toString("utf-8");

    const templateParse = Handlebars.compile(templateFileCOntent);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHtml,
    });
    console.log("oi");
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
