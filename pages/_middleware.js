import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
// import getConfig from 'next/config';

// const { serverRuntimeConfig } = getConfig();

export default function middleware(req) {
  const secret = process.env.SECRET;
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;
  //console.log('jwt -->', jwt);

  const url = req.nextUrl.clone();
  //console.log('url -->', url?.pathname);

  if (url?.pathname === '/') {
    if (jwt) {
      console.log('part5');
      console.log('jwt ->>', jwt);

      try {
        verify(jwt, secret);
        console.log('part6');
        url.pathname = '/Home';

        return NextResponse.redirect(url);
      } catch (e) {
        console.log('part7');

        return NextResponse.redirect(url?.origin);
      }
    }
  }

  if (url?.href?.includes('/Home')) {
    if (jwt === undefined) {
      console.log('part1');
      return NextResponse.redirect(url?.origin);
    }

    try {
      verify(jwt, secret);
      console.log('part2');

      return NextResponse.next();
    } catch (e) {
      console.log('part3');

      return NextResponse.redirect(url?.origin);
    }
  }

  if (url?.href?.includes('/account')) {
    if (jwt === undefined) {
      console.log('part1');
      return NextResponse.redirect(url?.origin);
    }

    try {
      verify(jwt, secret);
      console.log('part2');

      return NextResponse.next();
    } catch (e) {
      console.log('part3');

      return NextResponse.redirect(url?.origin);
    }
  }

  return NextResponse.next();
}
