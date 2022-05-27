import styles from './styles.module.scss';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Input, Button, Spinner, PageHeader } from '/src/components';
import { ViewContext } from '../../../pages/_app';

const Profile = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setUserItem, handleLogout, getUserItem, getItem } = useLocalStorage(
    {}
  );
  const router = useRouter();

  const [user, setUser] = useState();
  const [usersList, setUsersList] = useState();
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [r, setR] = useState(false);
  const [rImg, setRImg] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    fetch('/api/users', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setUsersList(data?.users));
  }, [usersList, setUsersList]);

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });
    //const loggedInUser = viewContext?.user;
    if (loggedInUser) {
      setUser(loggedInUser);
      setFirstName(loggedInUser?.firstName);
      setLastName(loggedInUser?.lastName);
      setPhoneNo(parseInt(loggedInUser?.phoneNo));
      setUserId(loggedInUser?.userId);
      setEmail(loggedInUser?.email);
      setImageSrc(loggedInUser?.image);
    }
  }, []);

  const forceReload = () => {
    router.reload();
  };

  const handleUserLogOut = () => {
    fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((r) => console.log('userOUT -->', r))
      .catch((error) => {
        console.log(error);
      });
  };

  const logOutHandler = () => {
    handleUserLogOut();
    handleLogout('user');
    setTimeout(forceReload, 1000);
  };

  let favs = getItem({ key: user?.userId });

  const showFavs = () => {
    return favs?.map((fav) => (
      <p key={fav} className={styles.list}>
        {fav}
      </p>
    ));
  };

  const showNoFavs = () => {
    return <p className={styles.noList}>You don't have any favourites!</p>;
  };

  //handle img upload and img change
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  console.log('img -->', imageSrc);

  //handle submit img to Cloudinary
  async function handleOnSubmit(event) {
    event.preventDefault();

    setRImg(true);
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const imgUrl = process.env.CLOUDINARY;
    console.log(imgUrl);

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/rafaelmingossi/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    setRImg(false);
  }

  const submitData = () => {
    setR(true);
    const bodyData = {
      userId,
      firstName,
      lastName,
      image: imageSrc,
      email,
      password,
      phoneNo,
    };

    const data = JSON.stringify(bodyData);

    if (imageSrc === null || imageSrc === undefined) {
      alert('Select an image and upload it first');
      setR(false);
    } else {
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
            setUserItem({ key: 'user', value: data?.newUsers });
          }
          setR(false);
        })
        .catch((error) => console.error(error));
    }
  };

  //   console.log('file ->>', file);
  return (
    <div className={styles.container}>
      <PageHeader title={'Profile'} />
      <div className={styles.profileWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <form
              className={styles.formWrapper}
              method='post'
              onChange={handleOnChange}
              onSubmit={handleOnSubmit}
            >
              <div className={styles.imgWrapper}>
                <img
                  src={imageSrc ? imageSrc : '/user.svg'}
                  alt='user image'
                  className={styles.profileImg}
                />
              </div>
              <div className={styles.btnLeft}>
                <div className={styles.textbox}>
                  <label className={styles.btnWhite}>
                    Select Image
                    <input type='file' name='file' />
                  </label>
                </div>

                {!rImg ? (
                  <Button disabled={rImg} label='Upload' />
                ) : (
                  <div className={styles.spin}>
                    <Spinner />
                  </div>
                )}
              </div>

              <Button label='Log Out' onClick={() => logOutHandler()} />
            </form>
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
                  value={firstName || ''}
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
                  value={lastName || ''}
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
                  value={phoneNo || ''}
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
                  value={email || ''}
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
              <div className={styles.btn}>
                {!r ? <Button label={'Update'} disabled={r} /> : <Spinner />}
              </div>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          {user?.role === 'USER' ? (
            <div className={styles.favList}>
              <div className={styles.header}>
                <h1>Favourite Books</h1>
                {favs?.length !== 0 ? showFavs() : showNoFavs()}
              </div>
            </div>
          ) : (
            ''
          )}
          {user?.role === 'ADMIN' ? (
            <div className={styles.admin}>
              <h1>ADMIN Panel</h1>
              <div className={styles.btnDiv}>
                <Link href='/admin/users'>
                  <div className={styles.btnWrapper}>
                    <a className={styles.learnMoreBtn}>Manage Users</a>
                  </div>
                </Link>
                <Link href='/admin/books'>
                  <div className={styles.btnWrapper}>
                    <a className={styles.learnMoreBtn}>Add Books</a>
                  </div>
                </Link>
                <Link href='/admin/booksList'>
                  <div className={styles.btnWrapper}>
                    <a className={styles.learnMoreBtn}>Delete Books</a>
                  </div>
                </Link>
                <Link href='/Home'>
                  <div className={styles.btnWrapper}>
                    <a className={styles.learnMoreBtn}>Return</a>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
