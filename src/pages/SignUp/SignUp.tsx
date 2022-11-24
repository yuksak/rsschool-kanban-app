import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignUp.module.scss';
import { useAppDispatch } from 'store/hooks';
import { isUserAuth, signInUser, signUpUser } from 'api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = async ({ login, password, name }: AuthorizationValues) => {
    toast.loading('Signing up...', { duration: 2000 });
    await dispatch(signUpUser({ login, password, name }));

    const { payload } = await dispatch(signInUser({ login, password }));
    const { token, message } = payload as { token: string; message: string };

    if (token) {
      window.localStorage.setItem('token', token);
      toast.success('Welcome on board!');
      navigate('/boards');
    }
    if (message) {
      toast.error(message);
    }
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => handleChange(data)} />
    </main>
  );
};
