import SideBar from '../../../components/organisms/SideBar';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';
import jwtDecode from 'jwt-decode'
import { getTransationDetail } from '../../../services/member';
import { HistoryTransactionTypes, JWTPayloadTypes } from '../../../services/data-types';

interface  TransactionDetailProps {
  transactionDetail: HistoryTransactionTypes
}

export default function TransactionDetail(props: TransactionDetailProps) {
  const { transactionDetail } = props
  return (
    <section className="transactions-detail overflow-auto">
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps{
  req: {
    cookies: {
      token: string
    }
  },
  params: {
    idTrx: string
  }
}

export async function getServerSideProps( {req, params }: GetServerSideProps ) {
  const { idTrx } = params
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      }
    }
  }
  const jwtToken = Buffer.from(token, 'base64').toString('ascii')
  const payload: JWTPayloadTypes = jwtDecode(jwtToken)
  const userFromPayload: any = payload.pelanggan;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  const response = await getTransationDetail(idTrx, jwtToken)
  return {
    props: {
      transactionDetail: response.data
    }
  }
}