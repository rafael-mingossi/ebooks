import styles from './styles.module.scss';
import Input from '../common/Input';
import Button from '../common/Button';

import { useContext } from 'react';
import { ViewContext } from '../../../pages/_app';

const Register = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);

  const { isRegisterOpen } = viewContext;

  return (
    <div
      className={`${styles.registerWrapper}  ${
        isRegisterOpen ? styles.openDrawer : ''
      }`}
    >
      <img
        src='/close.svg'
        alt='icon close'
        className={styles.close}
        onClick={() =>
          setViewContext({
            ...viewContext,
            isRegisterOpen: false,
          })
        }
      />
      <div className={styles.contentWrapper}>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='text'
            label={'First Name'}
            required
            id='firstName'
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='text'
            label={'Last Name'}
            required
            id='lastName'
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='email'
            label={'E-mail'}
            required
            id='email'
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='password'
            label={'Password'}
            required
            id='password'
          />
        </div>
        <Button label={'Register'} onClick={console.log('register')} />
      </div>
    </div>
  );
};

export default Register;
