import styles from './styles.module.scss';
import Input from '../common/Input';
import Button from '../common/Button';
import { Spinner } from '../common/Spinner';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

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
  const [loading, setLoading] = useState(false);

  // get functions to build form with useForm() hook
  const { register, handleSubmit } = useForm();

  const submitData = () => {
    const bodyData = {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };
    console.log('bdyData ->> ', JSON.stringify(bodyData));

    const data = JSON.stringify(bodyData);

    fetch('/api/users/register', {
      method: 'POST',
      body: data,
    })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div
      className={`${styles.registerWrapper}  ${
        !isRegisterOpen ? styles.openDrawer : ''
      }`}
    >
      {loading && <Spinner />}
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
              //id='firstName'
              //value={firstName}
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
              //id='lastName'
              //value={lastName}
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
              required
              //id='phoneNo'
              //value={phoneNo}
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
          <Button label={'Register'} onClick={() => submitData} />
        </form>
      </div>
    </div>
  );
};

export default Register;
