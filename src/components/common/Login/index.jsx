import { useState } from 'react';
import styles from './styles.module.scss';
import Input from '../../common/Input';
import Button from '../Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { useContext } from 'react';
import { ViewContext } from '../../../../pages/_app';

const Login = () => {
  const router = useRouter();
  const [viewContext, setViewContext] = useContext(ViewContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { register, handleSubmit } = useForm();

  const submitData = () => {
    const bodyData = {
      email,
      password,
    };
    console.log('bdyData ->> ', JSON.stringify(bodyData));

    const data = JSON.stringify(bodyData);

    fetch('/api/users/login', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        res.status === 200 ? router.push('/home') : alert('failed to login');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.fieldsWrapper}>
        <form
          onSubmit={handleSubmit(submitData)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='email'
              label={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
              ref={register}
              required
              //id='email'
              //value={email}
              name='email'
            />
          </div>
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='password'
              label={'Password'}
              onChange={(e) => setPassword(e.target.value)}
              ref={register}
              required
              //id='password'
              //value={password}
              name='password'
            />
          </div>
          <Button label={'Login'} onClick={() => console.log('login')} />
        </form>
        <p>
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
