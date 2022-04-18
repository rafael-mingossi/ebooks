import { getProviders, getSession, signIn } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/Home',
      },
    };
  }
  return {
    props: {
      providers: await getProviders(context),
    },
  };
}

const handleLogin = (e) => {
  signIn(e.target.credentialsID.value, {
    email: e.target.email.value,
    password: e.target.password.value,
  });
};

function Login({ providers }) {
  return (
    <div>
      <form method='POST' onSubmit={handleLogin}>
        <input
          type='hidden'
          name='credentialsID'
          value={providers.credentials.id}
        />
        <input type='text' placeholder='email' name='email' />
        <input type='password' placeholder='password' name='password' />
        <span>
          <button type='submit'>Sign In</button>
        </span>
      </form>
    </div>
  );
}

export default Login;
