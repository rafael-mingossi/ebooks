import styles from './styles.module.scss';
import Input from '../common/Input';
import Button from '../common/Button';

import { useContext, useState } from 'react';
import { ViewContext } from '../../../pages/_app';

const Register = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);

  const { isRegisterOpen } = viewContext;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitData = async () => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, phoneNo, email, password };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      //await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

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
            onChange={(e) => setFirstName(e.target.value)}
            required
            id='firstName'
            value={firstName}
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='text'
            label={'Last Name'}
            onChange={(e) => setLastName(e.target.value)}
            required
            id='lastName'
            value={lastName}
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='number'
            label={'Phone No.'}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            id='phoneNo'
            value={phoneNo}
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='email'
            label={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
            required
            id='email'
            value={email}
          />
        </div>
        <div className={styles.form}>
          <Input
            placeholder=' '
            type='password'
            label={'Password'}
            onChange={(e) => setPassword(e.target.value)}
            required
            id='password'
            value={password}
          />
        </div>
        {/* <input disabled={!email || !password} type='submit' value='Create' /> */}
        <Button
          label={'Register'}
          onClick={() =>
            setViewContext({
              ...viewContext,
              isRegisterOpen: false,
            })
          }
        />
      </div>
    </div>
  );
};

export default Register;
