import React, { Fragment } from 'react';
import { compose, mapProps } from 'recompose';
import { withCopyClipboard, withToggle } from 'shared/hooks';
import { numberWithCommas } from 'shared/utils';

const WrapCopyTitle = withCopyClipboard((props) => {
  return <small className='font-weight-bold cursor-pointer text-primary'>{props.text}</small>;
});

const WrapCopySku = withCopyClipboard((props) => {
  return <u>{props.text}</u>;
});

const Product = (props) => {
  const {
    name,
    price,
    catalogStatusCode,
    catalogStatusName,
    higherPrice: specialPrice,
    sku: pvSku,
    baseImage,
    urlPath,
    isNotInWeb,
  } = props.product;

  const { isStoreDetailShow, storeStock, toggleStoreDetail } = props;
  return (
    <div className='d-flex flex-column cursor-pointer border-bottom border-left my-1' onClick={toggleStoreDetail}>
      <div className='d-flex align-items-center'>
        <div>
          <img src={baseImage || '/images/default-pv.jpg'} alt={pvSku} width={60} height={60} />
        </div>
        <div className='pl-1'>
          <WrapCopyTitle text={name} />

          <div>
            <small>
              Mã kho: <WrapCopySku text={pvSku} />
            </small>
          </div>
          {catalogStatusCode && (
            <div>
              <small>Trạng thái: {catalogStatusName}</small>
            </div>
          )}
          {isNotInWeb && (
            <div>
              <small className='text-warning'>Chưa có trên web</small>
            </div>
          )}
          <div>
            {!!specialPrice && specialPrice < price ? (
              <small className='text-danger'>
                Giá:{' '}
                <small className='text-secondary'>
                  <del>{numberWithCommas(price)}</del>
                </small>{' '}
                {numberWithCommas(specialPrice)} đồng
              </small>
            ) : (
              <small className='text-danger'>Giá: {numberWithCommas(price)} đồng</small>
            )}
          </div>
        </div>
        {!isNotInWeb && urlPath && (
          <div className='mr-1' style={{ marginLeft: 'auto' }}>
            <a href={urlPath} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
              <i className='fas fa-external-link-alt' />
            </a>
          </div>
        )}
      </div>
      <div className='ml-3'>
        <small className='text-success'>
          {storeStock ? (
            <div className='d-flex flex-row'>
              <u>Còn</u>
              <div className='d-flex flex-column pl-2'>
                <span>
                  {storeStock.totalItem} sản phẩm trong {storeStock.totalStore} kho
                </span>
                <span>{storeStock.activeItem} sản phẩm có thể bán</span>
              </div>
            </div>
          ) : (
            <div className='text-danger'>Hết hàng</div>
          )}

          {storeStock && isStoreDetailShow && (
            <Fragment>
              <hr className='m-1' />
              <div>
                {storeStock.items.map((store, index) => (
                  <div className={`${store.faded ? 'text-secondary' : ''}`} key={store.storeCode}>
                    <span>
                      {index + 1}. {store.name}
                    </span>
                    <br />
                    <small className='ml-3'>Còn {store.totalItem} sản phẩm</small>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </small>
      </div>
    </div>
  );
};

const enhance = compose(
  withToggle('storeDetail', false),
  mapProps((props) => {
    const { product } = props;
    if (!product.numberInStockProduct) return { ...props, storeStock: null };

    return {
      ...props,
      storeStock: {
        totalItem: product.numberInStockProduct,
        totalStore: product.numberInStockStore,
        activeItem: product.numberInStockSaleable,
        items: product.stockDetails
          .map((store) => ({
            name: store.storeName,
            totalItem: store.inventory,
            status: store.storeStatus === 1,
            faded: store.storeType !== 'B',
            storeCode: store.storeCode,
          }))
          .sort((x, y) => {
            if (x.faded && y.faded) return y.totalItem - x.totalItem;
            if (x.faded) return 1;
            if (y.faded) return -1;

            return y.totalItem - x.totalItem;
          }),
      },
    };
  }),
);
export default enhance(Product);
