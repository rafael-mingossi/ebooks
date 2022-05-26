import styles from './styles.module.scss';
import { PageHeader } from '/src/components';

const Disclaimer = () => {
  return (
    <div className={styles.container}>
      <PageHeader title={'Disclaimer'} />
      <p>
        This website was created as a project for the Victoria Univerity, and
        the information contained herein is not intended to be a source of
        advice or source of information with respect to the material presented,
        and the information and/or documents contained in this website do not
        constitute a trustful surce of information. <br />
        <br />
        All the information contained in this website was created with
        educational purposes and can’t not be use with any other purpose. <br />
        <br /> If you have any question you can send us an email with your
        details and your question to helpall.library@gmail.com.
      </p>
    </div>
  );
};

export default Disclaimer;
