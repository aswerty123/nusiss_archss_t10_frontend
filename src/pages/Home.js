import { useQueryClient } from "@tanstack/react-query"
import { useLoginQuery, useLogoutMutation } from '../queries/user-queries';
import tw, { styled } from 'twin.macro';



export const Home = () => {

  return (
    <>
      <div>Home</div>
      <div>LoginData</div>
      {/* <div>{JSON.stringify(loginQuery)}</div> */}
      <div>Profile</div>
      {/* <div>{JSON.stringify(profile)}</div> */}
    </>
  );
};
