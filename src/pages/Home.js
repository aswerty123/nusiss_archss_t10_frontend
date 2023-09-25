import { useEffect } from 'react';
import { onViewProfile } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const { user, profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { token } = user;

//   useEffect(() => {
//     if (token) {
//       dispatch(onViewProfile());
//     }
//   }, [token]);

  return (
    <>
      <div>Home</div>
      <div>User</div>
      <div>{JSON.stringify(user)}</div>
      <div>Profile</div>
      <div>{JSON.stringify(profile)}</div>
    </>
  );
};
