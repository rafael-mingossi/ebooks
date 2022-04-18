import styles from './styles.module.scss';
import Input from '../common/Input';
import Button from '../common/Button';
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

  // get functions to build form with useForm() hook
  const { register, handleSubmit } = useForm();

  // const submitData = () => {
  //   const bodyData = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //   };
  //   console.log('bdyData ->> ', bodyData);

  //   fetch('http://localhost:3000/api/users/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(bodyData),
  //   })
  //     .then((res) => console.log(res))
  //     .catch((error) => console.error(error));
  // };

  const submitData = () => {
    let xhr = new XMLHttpRequest();
    //xhr.open('POST', 'http://localhost:3000/api/users/register');
    xhr.open('POST', 'https://ebooks-one.vercel.app/account/register');

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => alert(xhr.responseText.toString());

    const bodyData = {
      firstName: firstName,
      lastName: lastName,
      //phoneNo: phoneNo,
      email: email,
      password: password,
    };

    let data = JSON.stringify(bodyData);

    xhr.send(data);
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
