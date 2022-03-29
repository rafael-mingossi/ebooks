import styles from './styles.module.scss';
import Input from '../../common/Input';
import Button from '../Button';

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.fieldsWrapper}>
        <Input placeholder='e-mail' type='text' className={styles.inputs} />
        <Input placeholder='password' type='text' className={styles.inputs} />
        <Button label={'Login'} />
        <p>
          Don`t have an account? <a href='#'>Click here to register!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
