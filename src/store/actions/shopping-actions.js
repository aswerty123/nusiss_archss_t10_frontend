import { DeleteData, GetData, PostData, PutData } from '../../utils';
import { Action } from '.';

export const onGetProducts = () => async (dispatch) => {
  try {
    const response = await GetData('/product');

    return dispatch({ type: Action.VIEW_PRODUCTS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const onCreateProduct =
  ({ name, desc, type, unit, price, available, suplier, banner }) =>
  async (dispatch) => {
    try {
      const response = await PostData('/product/create', {
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });

      return dispatch({ type: Action.ADD_PRODUCT, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
