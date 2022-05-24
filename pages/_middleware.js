import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
// import getConfig from 'next/config';

// const { serverRuntimeConfig } = getConfig();

export function middleware(req) {
  const secret = process.env.SECRET;
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;
  //console.log('jwt -->', jwt);

  const url = req.url;
  //console.log('url -->', url);

  if (url === '/') {
    if (jwt) {
      console.log('part5');
      //console.log('jwt ->>', jwt);

      try {
        verify(jwt, secret);
        console.log('part6');
        //url.pathname = '/Home';

        return NextResponse.redirect('/Home');
      } catch (e) {
        console.log('part7');

        return NextResponse.redirect('/');
      }
    }
  }

  if (url?.includes('/Home')) {
    if (jwt === undefined) {
      console.log('part1');
      return NextResponse.redirect('/');
    }

    try {
      verify(jwt, secret);
      console.log('part2');

      return NextResponse.next();
    } catch (e) {
      console.log('part3');

      return NextResponse.redirect('/');
    }
  }

  if (url?.includes('/account')) {
    if (jwt === undefined) {
      console.log('part1');
      return NextResponse.redirect('/');
    }

    try {
      verify(jwt, secret);
      console.log('part2');

      return NextResponse.next();
    } catch (e) {
      console.log('part3');

      return NextResponse.redirect('/');
    }
  }

  return NextResponse.next();
}
