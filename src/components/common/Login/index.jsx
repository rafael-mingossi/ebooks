import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Spinner, Button, Input } from '/src/components';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

import Link from 'next/link';
import { ViewContext } from '../../../../pages/_app';

const Login = () => {
  const { setUserItem } = useLocalStorage();
  const router = useRouter();
  const [viewContext, setViewContext] = useContext(ViewContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resp, setResp] = useState('');
  const [r, setR] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const submitData = () => {
    setR(true);
    const bodyData = {
      email,
      password,
    };

    const data = JSON.stringify(bodyData);

    fetch('/api/users/login', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setViewContext({
            ...viewContext,
            token: data.token,
            isLogged: true,
            user: data.userLogin,
          });
          setUserItem({ key: 'token', value: data?.token });
          setUserItem({ key: 'user', value: data?.userLogin });
          router.push('/Home');
        }
        setR(false);
      })
      .catch((error) => {
        setResp('500');
        setR(false);
      });
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.fieldsWrapper}>
        {resp === '500' && (
          <p className={styles.inputValidation}>
            Email or Password is incorrect!
          </p>
        )}

        <form
          onSubmit={handleSubmit(submitData)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='email'
              label={'E-mail'}
              onChange={(e) => [setEmail(e.target.value), setResp('')]}
              ref={register}
              required
              id='email'
              name='email'
            />
          </div>
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='password'
              label={'Password'}
              onChange={(e) => [setPassword(e.target.value), setResp('')]}
              ref={register}
              required
              id='password'
              name='password'
            />
          </div>
          <div className={styles.btn}>
            {!r ? (
              <Button
                label={'Login'}
                onClick={() => console.log('login')}
                disabled={r}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </form>
        <p className={styles.registerMsg}>
          Don`t have an account?{' '}
          <div className={styles.linkRegister}>
            <Link href='/account/register'>Click here to register!</Link>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
