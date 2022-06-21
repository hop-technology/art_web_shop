import Image from 'next/image'
import HopHelper from '../../pages/api/helpers'

const SuccessTable = ({ order, activeCurrency }) => {
  return (
    <table className='success__container'>
      <thead className='success__header'>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      {order.orderItems.map((item, index) => {
        return (
          <tbody key={index}>
            <tr className='success__content'>
              <td>
                <Image
                  src={item.product.images = []
                    ? '/Walborg_logo.png'
                    : item.product.images?.[0]?.url}
                  height='100'
                  width='100'
                  alt={item.product.name}
                />
              </td>
              <td>
                <p>{item.product.name}</p>
              </td>
              <td>
                <p>{item.quantity}</p>
              </td>
              <td>
                {HopHelper.numberFormatter({
                  currency: activeCurrency,
                  value: item.total / 100,
                })}
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}

export default SuccessTable
