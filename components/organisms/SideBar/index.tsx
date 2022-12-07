import MenuItem from './MenuItem';
import Profile from './Profile';
import Footer from './Footer';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface SideBarProps {
    activeMenu: 'overview' | 'transactions'
}

export default function SideBar(props: SideBarProps) {
  const { activeMenu } = props;
  const router = useRouter();

  const onLogOut = () => {
    Cookies.remove('token')
    router.push('/sign-in')
  }
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Overview" icon="ic-menu-overview" active={activeMenu === 'overview'} href="/member" />
          <MenuItem title="Transactions" icon="ic-menu-transactions" active={activeMenu === 'transactions'} href="/member/transactions" />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogOut} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
