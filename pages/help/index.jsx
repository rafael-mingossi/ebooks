import styles from './styles.module.scss';
import { Button, Input, TextArea, PageHeader, Spinner } from '/src/components';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { gql, useMutation } from '@apollo/client';

const CreateFeed = gql`
  mutation FeedMutation(
    $firstName: String!
    $lastName: String!
    $message: String!
    $email: String!
    $phoneNo: Int!
  ) {
    feed(
      firstName: $firstName
      lastName: $lastName
      message: $message
      email: $email
      phoneNo: $phoneNo
    ) {
      firstName
      lastName
      email
      message
      phoneNo
    }
  }
`;

const Help = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState();
  const [message, setMessage] = useState('');
  const [r, setR] = useState(false);

  const [addFeed, { data, loading, error }] = useMutation(CreateFeed, {
    onCompleted: () => clearInputs(),
    onQueryUpdated(CreateFeed) {
      if (!error) {
        return CreateFeed.refetch();
      }
    },
  });

  // if (error) return console.log(JSON.stringify(error, null, 2));

  const { getUserItem } = useLocalStorage({});

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNo('');
    setMessage('');
  };

  const { register, handleSubmit, formState } = useForm();

  if (loading)
    return (
      <div className={styles.spin}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <PageHeader title={'Feedback'} />
      {error && console.log(JSON.stringify(error, null, 2))}

      <div className={styles.formContainer}>
        <p>
          If you have any question you can check the FAQ or you can send us an
          email helpall.library@gmail.com
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addFeed({
              variables: {
                firstName: firstName,
                lastName: lastName,
                message: message,
                email: email,
                phoneNo: parseInt(phoneNo),
              },
            });
          }}
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
                  type='number'
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
            <Button label={'Send'} disabled={r} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
