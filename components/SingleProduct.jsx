import NonVariantHandler from './NonVariantHandler';
import VariantsHandler from './VariantsHandler';

const SingleProduct = ({ props, activeCurrency }) => {
  return (
    <>
      {props.variants.length < 1 ? (
        <NonVariantHandler props={props} activeCurrency={activeCurrency} />
      ) : (
        <VariantsHandler props={props} activeCurrency={activeCurrency} />
      )}
    </>
  );
};

export default SingleProduct;
