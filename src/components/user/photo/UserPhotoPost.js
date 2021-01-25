import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UserPhotoPost.module.css'

import useForm from '../../../hooks/useForm'
import useFetch from '../../../hooks/useFetch'
import { PHOTO_POST } from '../../../api'

import Input from '../../forms/input/Input'
import Button from '../../forms/button/Button'
import Error from '../../helper/Error'

const UserPhotoPost = () => {
  const name = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', img.raw)
    formData.append('nome', name.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0])
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange} />

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
            <Button>Enviar</Button>
          )}

        <Error error={error} />

        <div>
          {img.preview && (
            <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>
          )}
        </div>
      </form>
    </section>
  )
}

export default UserPhotoPost;