import styles from './styles.module.scss';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Input, Button, Spinner } from '/src/components';
import prisma from '../../../lib/prisma';

const Profile = ({ user }) => {
  console.log('us ->>', user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [r, setR] = useState(false);
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

    fetch('/api/users/update', {
      method: 'PUT',
      body: data,
    })
      .then((res) => {
        if (res.status === 201) {
          console.log('worked');
        } else if (res.status === 201) {
          alert('failed to update');
        }
        setR(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.profileWrapper}>
      <h1>Profile</h1>
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
              value={firstName}
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
              value={lastName}
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
              value={phoneNo}
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
              value={email}
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
              value={password}
            />
          </div>
          {!r ? <Button label={'Update'} disabled={r} /> : <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
