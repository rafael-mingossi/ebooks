export function requireAuthentication(gssp) {
  return async (context) => {
    const { req } = context;
    const token = req.cookies.userToken;

    const { cookies } = req;

    const jwt = cookies.EbooksJWT;

    if (!jwt) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
