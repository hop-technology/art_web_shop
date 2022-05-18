import getPageData from '../lib/get-page-data'
import getAllProducts from '../lib/get-all-product'

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__container'>
        <h1>Get in touch</h1>
        <div className='contact__information'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
            porta urna. Fusce faucibus, nisl eu pharetra finibus, lacus libero
            lobortis ligula, a laoreet libero felis in ex. Donec leo nunc,
            facilisis a feugiat sit amet, condimentum id dui. Donec sagittis leo
            arcu, vel auctor quam tristique eu. Nullam faucibus finibus magna,
            id pretium augue convallis et. Phasellus mattis fringilla hendrerit.
            Cras convallis nunc eu lorem gravida, nec vestibulum eros pharetra.
            Curabitur vitae ante ex. Morbi cursus mauris sed hendrerit dapibus.
            Fusce imperdiet quam mauris, eget rutrum ante pellentesque non.
            Integer fermentum fringilla purus quis sagittis. Quisque pretium
            fermentum nisl eget rhoncus. Nunc porttitor diam et ornare
            sollicitudin.
            <br /> <br /> Nunc ullamcorper, dui vitae lacinia blandit, tellus mi
            rhoncus quam, ultricies tristique lectus mauris sed eros. Nunc magna
            odio, rhoncus nec viverra vel, viverra vel urna. Fusce blandit eros
            ut sem dapibus, quis aliquet ligula luctus. Suspendisse aliquam
            libero nisi, nec mattis eros ullamcorper quis. Phasellus
            pellentesque mollis suscipit. <br />
            <br />
            Ut porta mi tellus, porta rhoncus metus semper vitae. Suspendisse
            interdum neque fermentum, placerat ligula ac, sollicitudin magna.
            Cras tellus quam, semper blandit nisl vitae, posuere eleifend diam.
            In in posuere eros. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Ut vitae magna ut diam
            varius venenatis. Nunc porttitor, elit id vehicula venenatis, erat
            felis egestas nulla, id lacinia leo metus eu nisi. Cras auctor, leo
            id lacinia rutrum, mi quam tincidunt mi, nec eleifend urna augue sit
            amet ligula. Suspendisse purus dui, tincidunt vitae pretium at,
            efficitur eget sapien. Vestibulum purus turpis, dapibus eget tellus
            quis, dignissim gravida turpis. Cras eros nulla, rutrum ut ipsum at,
            faucibus dictum ipsum. Phasellus rhoncus et arcu sed condimentum.
            Vestibulum pellentesque risus aliquam lorem sodales consequat.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })

  return {
    props: {
      ...pageData,
      products,
    },
  }
}
