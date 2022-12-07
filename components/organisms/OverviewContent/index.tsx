import Categori from './Categori';
import TableRow from './TableRow';
import { useCallback, useEffect, useState } from 'react';
import { getMemberOverview } from '../../../services/member';
import { toast } from 'react-toastify';
import { HistoryTransactionTypes, PembelianCategoriesTypes } from '../../../services/data-types';

export default function OverviewContent() {
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if(response.error) {
      toast.error(response.message);
    } else {
      setCount(response.data.count);
      setData(response.data.data)
    }
  }, [])

  useEffect(() => {
    getMemberOverviewAPI();
  }, [])

  const IMG = process.env.NEXT_PUBLIC_IMG
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Pembelian Categories</p>
          <div className="main-content">
            <div className="row">
              {count.map((item: PembelianCategoriesTypes) => (
                <Categori  
                  key={item._id} 
                  icon="ic-minyak" 
                  price={item.value}>
                </Categori>
              ))}
     
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">Kardus</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: HistoryTransactionTypes) => (
                  <TableRow
                    key={item._id}
                    image={`${IMG}/${item.historyVoucherPembelian.thumbnail}`}
                    title={item.historyVoucherPembelian.kardusName} 
                    categori={item.category.name} 
                    item={`${item.historyVoucherPembelian.nominalQuantity} ${item.historyVoucherPembelian.nominalName}`}
                    price={item.value} 
                    status={item.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
