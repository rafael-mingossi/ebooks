import styles from './styles.module.scss';
import { Button, Input, TextArea } from '/src/components';
import { useState } from 'react';

const Help = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (firstName !== '' && lastName !== '' && email !== '' && message !== '') {
      alert('Message sent! Thank you!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNo('');
      setMessage('');
    } else {
      alert('Fields cannot be empty!');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Help</h1>

      <div className={styles.formContainer}>
        <p>
          If you have any question you can check the FAQ or you can send us an
          email helpall.library@gmail.com
        </p>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='text'
                label={'First Name'}
                onChange={(e) => setFirstName(e.target.value)}
                //ref={register}
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
                //ref={register}
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
                //ref={register}
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
                //ref={register}
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
              //ref={register}
              required
              name='message'
              rows='3'
              cols='50'
              value={message}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button label={'Send'} onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default Help;
