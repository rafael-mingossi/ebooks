import styles from './styles.module.scss';
import { Spinner, Button, Input } from '/src/components';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useContext, useState } from 'react';
import { ViewContext } from '../../../pages/_app';

const Register = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const router = useRouter();
  const { setItem, getItem } = useLocalStorage();

  const { isRegisterOpen } = viewContext;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [r, setR] = useState(false);

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();

  const submitData = () => {
    setR(true);
    const bodyData = {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };

    const data = JSON.stringify(bodyData);

    fetch('/api/users/register', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (res.status === 201) {
          router.push('/');
        } else if (res.status !== 201) {
          alert('failed to register');
        }
        setR(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`${styles.registerWrapper}  ${
        !isRegisterOpen ? styles.openDrawer : ''
      }`}
    >
      <Link href='/'>
        <img src='/close.svg' alt='icon close' className={styles.close} />
      </Link>
      <div className={styles.contentWrapper}>
        <form
          onSubmit={handleSubmit(submitData)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='text'
              label={'First Name'}
              onChange={(e) => setFirstName(e.target.value)}
              ref={register}
              required
              name='firstName'
            />
          </div>
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='text'
              label={'Last Name'}
              onChange={(e) => setLastName(e.target.value)}
              ref={register}
              required
              name='lastName'
            />
          </div>
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='number'
              label={'Phone No.'}
              onChange={(e) => setPhoneNo(e.target.value)}
              ref={register}
              name='phoneNo'
            />
          </div>
          <div className={styles.form}>
            <Input
              placeholder=' '
              type='email'
              label={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
              ref={register}
              required
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
              name='password'
            />
          </div>
          {!r ? <Button label={'Register'} disabled={r} /> : <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default Register;
