import styles from './styles.module.scss';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Input, Button, Spinner } from '/src/components';
import prisma from '../../../lib/prisma';
import { ViewContext } from '../../../pages/_app';

const Profile = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setItem, getItem, handleLogout } = useLocalStorage({});

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState();
  const [r, setR] = useState(false);
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    //const loggedInUser = getItem({ key: 'user' });
    const loggedInUser = viewContext?.user;
    if (loggedInUser) {
      setUser(loggedInUser);
      setFirstName(loggedInUser?.firstName);
      setLastName(loggedInUser?.lastName);
      setPhoneNo(parseInt(loggedInUser?.phoneNo));
      setUserId(loggedInUser?.userId);
      setEmail(loggedInUser?.email);
    }
  }, []);

  let favs = getItem({ key: user?.userId });

  const submitData = () => {
    setR(true);
    const bodyData = {
      userId,
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
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setViewContext({
            ...viewContext,
            user: data.newUsers,
          });
          setItem({ key: 'user', value: data?.newUsers });
        }
        setR(false);
      })
      .catch((error) => console.error(error));
  };

  //   console.log('file ->>', file);
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src='/user.svg' className={styles.profileImg} />
          <div className={styles.btnLeft}>
            <div className={styles.textbox}>
              <label className={styles.btnWhite}>
                Select Image
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>

            <Button label='Upload' onClick={() => handleLogout()} />
          </div>

          <strong>
            <u>
              <p>{file?.name ? file?.name : 'No Image Selected!'}</p>
            </u>
          </strong>

          <Button label='Log Out' onClick={() => handleLogout()} />
        </div>
        <div className={styles.contentWrapper}>
          <form onSubmit={handleSubmit(submitData)}>
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
                //value={password}
              />
            </div>
            {!r ? <Button label={'Update'} disabled={r} /> : <Spinner />}
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.favList}>
          <div className={styles.header}>
            <h1>Favourite Books</h1>
            {favs?.map((fav) => (
              <p key={fav} className={styles.list}>
                {fav}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
