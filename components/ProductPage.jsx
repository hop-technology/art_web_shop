import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PopUp from './PopUp';
import { useSettingsContext } from '../context/settings';
import Categories from './Categories';
import NonVariantHandler from './NonVariantHandler';
import VariantsHandler from './VariantsHandler';

const ProductPage = ({ product }) => {
  const message = useSelector((state) => state.message);
  const { activeCurrency } = useSettingsContext();
  const router = useRouter();

  return (
    <>
      {message === '' ? null : <PopUp />}

      {router.pathname === '/products/[slug]' ? (
        product.variants.length < 1 ? (
          <NonVariantHandler props={product} activeCurrency={activeCurrency} />
        ) : (
          <VariantsHandler props={product} activeCurrency={activeCurrency} />
        )
      ) : (
        <Categories
          props={product}
          title={router.query.slug}
          activeCurrency={activeCurrency}
        />
      )}
    </>
  );
};

export default ProductPage;
