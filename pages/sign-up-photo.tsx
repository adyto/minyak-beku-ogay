import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setSignUp } from '../services/auth';
import { getKardusCategory } from '../services/pelanggan';
import { toast } from 'react-toastify';
import { CategoryTypes } from '../services/data-types';

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [image, setImage] = useState<any>('null');
  const [imagePreview, setImagePriview] = useState<any>('/icon/ic-avatar.svg');
  const [localForm, setLocalForm] = useState({
    name: '',
    email: '',
  });
  const router = useRouter();

  const getKardusCategoryAPI = useCallback(async () => {
    const data = await getKardusCategory();

    setCategories(data);
    setFavorite(data[0]._id);
  }, [getKardusCategory]);

  useEffect(() => {
    getKardusCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem('user-form');
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = await localStorage.getItem('user-form');
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append('image', image);
    data.append('email', form.email);
    data.append('name', form.name);
    data.append('password', form.password);
    data.append('username', form.name);
    data.append('phoneNumber', '081281903333');
    data.append('role', 'user');
    data.append('status', 'Y');
    data.append('favorite', favorite);

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success('Register Berhasil!');
      router.push('/sign-up-success');
      localStorage.removeItem('user-form');
    }
  };
  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    <Image
                      src={imagePreview}
                      className="img-upload"
                      width={120}
                      height="120"
                      alt="preview image"
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePriview(URL.createObjectURL(img));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localForm.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localForm.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Kardus
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => setFavorite(event.target.value)}
                >
                  {categories.map((category: CategoryTypes) => (
                    <option key={category._id} value={category._id} selected>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
