import HopHelper from '../pages/api/helpers'
import Image from 'next/image'

const Categories = ({ props, title, activeCurrency }) => {
  return (
    <div className='categories'>
      <div className='categories__title'>
        <h1>{title}</h1>
      </div>
      <div className='categories__grid'>
        {props.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <h1>{item.name}</h1>
                <div>
                  <p>
                    {HopHelper.numberFormatter({
                      currency: activeCurrency,
                      value: item.price,
                    })}
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src={item.images[0].url}
                  alt={item.name}
                  height={200}
                  width={200}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
