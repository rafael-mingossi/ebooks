import { getProviders, getSession, signIn } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
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
    username: e.target.username.value,
    password: e.target.password.value,
  });
};

function Login({ providers }) {
  return (
    <div>
      <form method='POST' onSubmit={Login}>
        <input
          type='hidden'
          name='credentialsID'
          value={providers.credentials.id}
        />
        <input type='text' placeholder='username' name='username' />
        <input type='password' placeholder='password' name='password' />
        <span>
          <button type='submit'>Sign In</button>
        </span>
      </form>
    </div>
  );
}

export default Login;
