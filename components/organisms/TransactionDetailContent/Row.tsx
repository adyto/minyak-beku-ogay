import cx from 'classnames';
import { NumericFormat } from 'react-number-format';

interface RowProps {
  label: string;
  value: string | number;
  color?: boolean;
}

export default function Row(props: Partial<RowProps>) {
  const { label, value, color } = props;
  const colorDetails = cx({
    'purchase-details': true,
    'color-palette-4': color,
  });

  return (
    <p className="text-lg color-palette-1 mb-20">
      {label}{' '}
      <span className={colorDetails}>
        {typeof value === 'number' ? (
          <NumericFormat
            value={value}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        ) : (
          value
        )}
      </span>
    </p>
  );
}
