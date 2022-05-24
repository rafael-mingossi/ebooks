export function authUser(gssp) {
  return async (context) => {
    const { req } = context;
    const token = req.cookies.userToken;

    const { cookies } = req;

    const jwt = cookies.OursiteJWT;

    if (jwt) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/Home',
          statusCode: 301,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
