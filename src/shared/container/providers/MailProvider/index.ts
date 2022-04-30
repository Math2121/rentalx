import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SeSMailProvider } from "./implementations/SeSMailProvider";


const mailProvider = {
    ethereal:container.resolve(EtherealMailProvider),
    ses:container.resolve(SeSMailProvider)
  };

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER],
  );
  