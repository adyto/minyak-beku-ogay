import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/pelanggan';
import { useRouter } from 'next/router';

export default function CheckoutConfirmation() {
  const [checkBox, setCheckBox] = useState(false)
  const router = useRouter();

  const onSubmit = async () => {
    const dataItemLocal = localStorage.getItem('data-item')
    const dataPembelianLocal = localStorage.getItem('data-pembelian')

    const dataItem = JSON.parse(dataItemLocal!)
    const dataPembelian = JSON.parse(dataPembelianLocal!)

    if(!checkBox){
      toast.error('Pastikan sudah melakukan pembayaran!');
    } else {
      const data = {
        "voucher" : dataItem._id,
        "nominal" : dataPembelian.nominalItem._id,
        "payment" : dataPembelian.paymentItem.payment._id,
        "bank" : dataPembelian.paymentItem.bank._id,
        "name" : dataPembelian.bankAccountName,
      }
  
      const response = await setCheckout(data);
      if(response.error){
        toast.error(response.message)
      } else {
        toast.success('Checkout Berhasil!')
        router.push('/complete-checkout')
      }
    }
  }
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" checked={checkBox} onChange={() => setCheckBox(!checkBox)} />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          type="button"
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
