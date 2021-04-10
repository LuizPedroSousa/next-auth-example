import nodemailer, { SendMailOptions } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

interface sendMailProps extends SendMailOptions {
  context: any
  template: string
}

export default async function sendMail(
  mailOptions: sendMailProps
): Promise<void> {
  return await createTransport().sendMail(mailOptions)
}

function createTransport() {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS
    }
  })
  transport.use(
    'compile',
    hbs({
      viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/lib/resources/mail')
      },
      viewPath: path.resolve('./src/lib/resources/mail'),
      extName: '.html'
    })
  )
  return transport
}
