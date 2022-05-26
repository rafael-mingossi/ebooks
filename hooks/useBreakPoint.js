import { useMediaQuery } from 'react-responsive';

export function useBreakpoint() {
  const xsm = useMediaQuery({ query: '(max-width: 425px)' });
  const sm = useMediaQuery({ query: '(max-width: 960px)' });
  const md = useMediaQuery({ query: '(max-width: 1280px)' });
  const lg = useMediaQuery({ query: '(max-width: 1440px)' });

  return {
    xsm,
    sm,
    md,
    lg,
  };
}
