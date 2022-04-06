import styles from './styles.module.scss';
import Input from '../../common/Input';
import Button from '../Button';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { ViewContext } from '../../../../pages/_app';

const Login = () => {
  const router = useRouter();
  const [viewContext, setViewContext] = useContext(ViewContext);

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.fieldsWrapper}>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='email'
            // className={styles.inputs}
            id={'email'}
            label={'E-mail'}
            required
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='text'
            // className={styles.inputs}
            id={'email'}
            label={'Password'}
            required
          />
        </div>
        <Button label={'Login'} onClick={() => router.push('/Home')} />
        <p>
          Don`t have an account?{' '}
          <div
            className={styles.linkRegister}
            onClick={() =>
              setViewContext({
                ...viewContext,
                isRegisterOpen: true,
              })
            }
          >
            Click here to register!
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
