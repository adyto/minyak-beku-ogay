import Link from 'next/link';
import { useState } from 'react';
import {
  BanksTypes,
  NominalsTypes,
  PaymentTypes,
} from '../../../services/data-types';
import NominalItem from './NominalItem';
import PaymentItem from './PaymentItem';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface TopUpFormProps {
  nominals: NominalsTypes[];
  payments: PaymentTypes[];
}
export default function TopUpForm(props: TopUpFormProps) {
  const { nominals, payments } = props;
  const [bankAccountName, setBankAccountName] = useState('');
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const router = useRouter();

  const onNominalItemChange = (data: NominalsTypes) => {
    setNominalItem(data);
  };

  const onPaymentItemChange = (payment: PaymentTypes, bank: BanksTypes) => {
    const data = {
      payment,
      bank,
    };
    setPaymentItem(data);
  };

  const onSubmit = () => {
    if (bankAccountName === '' || nominalItem === '' || paymentItem === '') {
      toast.error('Silahkan isi data pembelian!');
    } else {
      const data = {
        bankAccountName,
        nominalItem,
        paymentItem,
      };
      localStorage.setItem('data-pembelian', JSON.stringify(data));
      router.push('/checkout');
    }
  };

  return (
    <>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Pembelian
        </p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => {
            return (
              <NominalItem
                key={nominal._id}
                _id={nominal._id}
                nominalQuantity={nominal.nominalQuantity}
                nominalName={nominal.nominalName}
                price={nominal.price}
                onChange={() => onNominalItemChange(nominal)}
              />
            );
          })}
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  bankID={bank._id}
                  type={payment.type}
                  name={bank.nameBank}
                  onChange={() => onPaymentItemChange(payment, bank)}
                />
              )),
            )}
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(event) => setBankAccountName(event.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </>
  );
}
