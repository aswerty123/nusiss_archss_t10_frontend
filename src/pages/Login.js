import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onSignup, onLogin } from '../store/actions';
import { Outlet, Navigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'

/** @jsxImportSource @emotion/react */
import tw, { styled } from 'twin.macro';

const LoginFormContainer = tw.div`flex min-h-full flex-wrap flex-col justify-center px-12 py-12 bg-gray-100`;
const LoginFormHeader = tw.div`text-center text-2xl font-bold leading-9 tracking-tight mx-10 text-gray-900 bg-white `;
const LoginFormBody = tw.div`mt-10 mx-auto w-full max-w-sm space-y-6 bg-white`;
const Input = tw.input`block w-full mt-2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600`;
const SubmitButton = tw.div
  .button`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;
const FieldLabel = tw.label`block text-sm font-medium leading-6 text-gray-900`;
const Switch = tw.div`mt-10 mx-2 text-center text-sm text-gray-500`;
const SwitchLink = styled(Switch)(({ link }) => [
  link && tw`inline font-semibold text-indigo-600 hover:text-indigo-400`,
]);

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [isSignup, setSignup] = useState(false);

  const { user, profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

//   useEffect(() => {
//     if (user){
//       navigate('/')
//     }
//   })


  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formData);
  };

  const userSubmit = () => {
    console.log('=====>' + formData);
    if (isSignup) {
      dispatch(
        onSignup({
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        })
      );
    } else {
      dispatch(onLogin({ email: formData.email, password: formData.password }));
    }
  };

  return (
    <div>
      <div>{JSON.stringify(formData)}</div>
      <div>{JSON.stringify(user)}</div>
      <LoginFormContainer>
        {isSignup ? (
          <LoginFormHeader>Sign Up with Us</LoginFormHeader>
        ) : (
          <LoginFormHeader>Log in to your account</LoginFormHeader>
        )}
        <LoginFormBody>
          <form tw="space-y-6">
            <div>
              <FieldLabel for="email">Email address</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                onChange={(e) => handleChange(e)}
                value={formData.email}
                required
              />
            </div>
            {isSignup ? (
              <div>
                <FieldLabel for="phone">Phone</FieldLabel>

                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={formData.phone}
                  required
                />
              </div>
            ) : (
              ''
            )}

            <div>
              <FieldLabel for="password">Password</FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            {isSignup ? (
              <SubmitButton type="button" onClick={() => userSubmit()}>
                Sign up
              </SubmitButton>
            ) : (
              <SubmitButton type="button" onClick={() => userSubmit()}>
                Log in
              </SubmitButton>
            )}
          </form>

          <SwitchLink>
            {isSignup ? 'Already a member?' : 'Not a member?'}
            <SwitchLink
              link
              onClick={() => {
                isSignup ? setSignup(false) : setSignup(true);
              }}
            >
              {isSignup ? 'Log In Here' : 'Sign Up Here'}
            </SwitchLink>
          </SwitchLink>
        </LoginFormBody>
      </LoginFormContainer>
    </div>
  );
};
