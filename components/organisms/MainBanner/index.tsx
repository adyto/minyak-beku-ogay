import Link from 'next/link';

export default function MainBanner() {
  return (
    <section className="header pt-lg-60 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row gap-lg-0 gap-5">
          <div className="col-lg-6 col-12 my-auto">
            <h1 className="header-title color-palette-1 fw-bold">
              Official Site <br className="d-sm-block d-none" />{' '}
              <span className="underline-blue">Ogay Minyak Beku</span>
            </h1>
            <p className="mt-30 mb-40 text-lg color-palette-1">
              Kami menyediakan bermacam minyak beku
              <br className="d-md-block d-none" /> untuk kebutuhan anda.
            </p>
            <div className="d-flex flex-lg-row flex-column gap-4">
              <Link
                className="btn btn-get text-lg text-white rounded-pill"
                href="/#feature"
              >
                Get Started
              </Link>
              <Link
                className="btn-learn text-lg color-palette-1 my-auto text-center"
                href="/#"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-12 d-lg-block d-none">
            <div className="d-flex justify-content-lg-end justify-content-center me-lg-5">
              <div className="position-relative" data-aos="zoom-in">
                <img src="/img/Header-1.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
