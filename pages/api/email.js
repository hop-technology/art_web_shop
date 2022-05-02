import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
  const { email } = req.body
  const msg = {
    to: email,
    from: 'support@hoptech.se',
    subject: 'Your Order Confirmation',
    text: 'This worked',
  }

  try {
    await sgMail.send(msg)
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
