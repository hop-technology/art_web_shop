import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
  const {
    email,
    name,
    city,
    postalCode,
    addressLine1,
    addressLine2,
    ...products
  } = req.body
  const msg = {
    to: email,
    from: 'support@hoptech.se',
    subject: 'Order confirmation',
    html: `
    <head>
    <title>Order confirmation</title>
    </head>
    <body>
      <h1>${name}, Thank you for your order!</h1>
      <div className='success__product-information'>
        <div>
          <h2>Delivery details</h2>
          <p>${name}</p>
          <p>${addressLine1}</p>
          <p>${addressLine2 && addressLine2}</p>
          <p>
            ${city}, ${postalCode}
          </p>
          <p>${email}</p>
        </div>
        <div className='success__information'>
          <h2>Order information</h2>
          <p>
          ${products}
          
          </p>
          <h3>
            Please contact us at
            <a href='artshop@walborgventures.com'>
              artshop@walborgventures.com
            </a>
            or 08-123 56 78 for any questions.
          </h3>
        </div>
      </div>
      </body>
    `,
  }

  try {
    await sgMail.send(msg)
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
