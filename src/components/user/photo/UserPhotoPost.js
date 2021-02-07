import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UserPhotoPost.module.css'
import useForm from '../../../hooks/useForm'

import Input from '../../forms/input/Input'
import Button from '../../forms/button/Button'
import Error from '../../helper/Error'
import Head from '../../helper/Head'
import { useDispatch, useSelector } from 'react-redux'
import { photoPost } from '../../../store/photoPost'

const UserPhotoPost = () => {
  const name = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading } = useSelector(state => state.photoPost);
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.token.data)

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

    dispatch(photoPost({ formData, token }));
  }

  function handleImgChange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0])
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
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