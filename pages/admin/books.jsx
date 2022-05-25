import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useForm } from 'react-hook-form';
import { Input, Button, Spinner } from '/src/components';
import { requireAuthentication } from '../../utils/requireAuthentication';

const Books = () => {
  const [bookId, setBookId] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [totalPages, setTotalPages] = useState();
  const [year, setYear] = useState();
  const [content, setContent] = useState();
  const [r, setR] = useState(false);
  const [rImg, setRImg] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const { register, handleSubmit, formState } = useForm();

  const submitData = () => {
    setR(true);

    const bodyData = {
      title,
      category,
      cover: imageSrc,
      description,
      totalPages,
      year,
      content: content,
    };

    const data = JSON.stringify(bodyData);

    fetch('/api/book/create', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log('Book Added Successfully');
          console.log('Title -->', data?.title);
        }
        setR(false);
      })
      .catch((error) => console.error(error));
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

    // const imgUrl = process.env.CLOUDINARY;
    // console.log(imgUrl);

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/rafaelmingossi/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());

    setImageSrc(data?.secure_url);
    setUploadData(data);
    setRImg(false);
  }

  return (
    <div className={styles.bottom}>
      <div className={styles.contentWrapper}>
        <h1>Add a New Book</h1>
        <div className={styles.inputsWrapper}>
          <form
            className={styles.formWrapper}
            method='post'
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
          >
            <div className={styles.imgWrapper}>
              <img
                src={imageSrc ? imageSrc : '/noPic.svg'}
                className={styles.profileImg}
                alt='book image'
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
          </form>
          <form
            onSubmit={handleSubmit(submitData)}
            className={styles.formBottom}
          >
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='text'
                label={'Title'}
                onChange={(e) => setTitle(e.target.value)}
                ref={register}
                required
                name='title'
                //value={title || ''}
              />
            </div>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='text'
                label={'Category'}
                onChange={(e) => setCategory(e.target.value)}
                ref={register}
                required
                name='category'
                //value={category || ''}
              />
            </div>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='text'
                label={'Description'}
                onChange={(e) => setDescription(e.target.value)}
                ref={register}
                name='description'
                //value={description || ''}
              />
            </div>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='text'
                label={'Content'}
                onChange={(e) => setContent(e.target.value)}
                ref={register}
                name='content'
                //value={description || ''}
              />
            </div>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='number'
                label={'Total Pages'}
                onChange={(e) => setTotalPages(e.target.value)}
                ref={register}
                required
                name='totalPages'
                //value={totalPages || ''}
              />
            </div>
            <div className={styles.form}>
              <Input
                placeholder=' '
                type='number'
                label={'Year'}
                onChange={(e) => setYear(e.target.value)}
                ref={register}
                required
                name='year'
                //value={year || ''}
              />
            </div>
            <div className={styles.btn}>
              {!r ? <Button label={'Add Book'} disabled={r} /> : <Spinner />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Books;

export const getServerSideProps = requireAuthentication(async (context) => {
  return { props: {} };
});
