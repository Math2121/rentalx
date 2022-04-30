import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import Handlebars from "handlebars";
import { SES } from "aws-sdk";
import fs from "fs";
@injectable()
class SeSMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
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

    await this.client.sendMail({
      to,
      from: "Rentx <matheusdepaula527@gmail.com>",
      subject,
      html: templateHtml,
    });
  }
}

export { SeSMailProvider };
