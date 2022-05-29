import styles from './styles.module.scss';
import { Button, Input, TextArea, PageHeader, Spinner } from '/src/components';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Help = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [message, setMessage] = useState('');
  //const [userId, setUserId] = useState('');
  const [r, setR] = useState(false);

  const { getUserItem } = useLocalStorage({});

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNo('');
    setMessage('');
    // setUserId('');
  };

  // useEffect(() => {
  //   const loggedInUser = getUserItem({ key: 'user' });

  //   if (loggedInUser) {
  //     setUserId(loggedInUser?.userId);
  //   } else {
  //     setUserId('');
  //   }
  // }, []);

  const { register, handleSubmit, formState } = useForm();

  const submitData = async () => {
    setR(true);
    const bodyData = {
      firstName,
      lastName,
      email: email.toLocaleLowerCase(),
      message,
      //userId: userId,
      phoneNo,
    };

    const data = JSON.stringify(bodyData);

    await fetch('/api/feed/create', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (res) {
          clearInputs();
        }
        setR(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <PageHeader title={'Feedback'} />

      <div className={styles.formContainer}>
        <p>
          If you have any question you can check the FAQ or you can send us an
          email helpall.library@gmail.com
        </p>
        <form
          onSubmit={handleSubmit(submitData)}
          // style={{ display: 'flex', flexDirection: 'column' }}
          className={styles.formWrappers}
        >
          <div className={styles.top}>
            <div className={styles.left}>
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
                  label={'Email'}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={register}
                  required
                  name='email'
                  value={email}
                />
              </div>
            </div>
            <div className={styles.right}>
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
                  type='text'
                  label={'Phone No.'}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  ref={register}
                  required
                  name='phoneNo'
                  value={phoneNo}
                />
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.form}>
              <TextArea
                placeholder=' '
                type='text'
                label={'Message'}
                onChange={(e) => setMessage(e.target.value)}
                ref={register}
                required
                name='message'
                rows='3'
                cols='50'
                value={message}
              />
            </div>
          </div>
          <div className={styles.bottom}>
            {!r ? (
              <Button label={'Send'} disabled={r} />
            ) : (
              <div className={styles.spin}>
                <Spinner />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
