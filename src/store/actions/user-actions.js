import { GetData, PostData } from '../../utils';
import { Action } from '../actions';

export const SetAuthToken = async (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.clear();
  }
};

export const onSignup =
  ({ email, password, phone }) =>
  async (dispatch) => {
    try {
      const response = await PostData('customer/signup', {
        email,
        password,
        phone,
      });
      const { token } = response.data;
      await SetAuthToken(token);
      return dispatch({ type: Action.SIGNUP, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

export const onLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      console.log('before onlogin');

      const response = await PostData('customer/login', {
        email,
        password,
      });

      const { token } = response.data;
      await SetAuthToken(token);

      console.log('after onlogin ====> token: ' + token);
      console.log('response.data ===> : ' + JSON.stringify(response.data));

      return dispatch({ type: Action.LOGIN, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

export const onLogout = () => async (dispatch) => {
  try {

    await SetAuthToken(null);

    console.log('logging out ');

    return dispatch({ type: Action.LOGOUT });
  } catch (err) {
    console.log(err);
  }
};

export const onViewProfile = () => async (dispatch) => {
  try {
    const response = await GetData('customer/profile');

    return dispatch({ type: Action.PROFILE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
