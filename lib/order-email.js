import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const Email = ({ customer }) => {
  const msg = {
    to: customer.email,
    from: 'support@hoptech.se',
    subject: 'Order has been created',
    text: 'Thank you for your order',
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Message sent')
    })
    .catch((error) => {
      console.log(error)
    })
}

export default Email
