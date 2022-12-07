import StepItem from '../../molecules/StepItem';

export default function TransactionStep() {
  return (
    <section id="feature" className="feature pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          Transaction Step
          <br />
          {' '}
          Pilih dan Lakukan Pembelian
        </h2>
        <div className="row gap-lg-0 gap-4" data-aos="fade-up">
          <StepItem icon="step1" title="1.Step Pertama" desc1="Pilih minyak beku" desc2="yang akan dilakukan pembelian" />
          <StepItem icon="step2" title="2.Step Kedua" desc1="Lakukan Pembelian" desc2="product yang sudah tersedia" />
          <StepItem icon="step3" title="3.Step Ketiga" desc1="Product Berhasil dibeli" desc2="dan akan segera diproses" />
        </div>
      </div>
    </section>
  );
}
