import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { JWTPayloadTypes } from '../../../services/data-types';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
  });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: any = payload.pelanggan;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      user.avatar = `${IMG}/${userFromPayload.avatar}`;
      setIsLogin(true);
      setUser(user);
    }
  }, []);

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/');
    setIsLogin(false);
  };
  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.avatar}
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <Link href="/member">
                <span className="dropdown-item text-lg color-palette-2">
                  My Profile
                </span>
              </Link>
            </li>
            <li onClick={onLogout}>
              <a className="dropdown-item text-lg color-palette-2" href="">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <a
        className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
        href="../sign-in"
        role="button"
      >
        Sign In
      </a>
    </li>
  );
}
