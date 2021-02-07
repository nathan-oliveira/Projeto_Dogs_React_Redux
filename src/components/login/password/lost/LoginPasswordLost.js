import React from 'react'
import userForm from '../../../../hooks/useForm'
import useFetch from '../../../../hooks/useFetch'

import Input from '../../../forms/input/Input'
import Button from '../../../forms/button/Button'
import { PASSWORD_LOST } from '../../../../api'
import Error from '../../../helper/Error'
import Head from '../../../helper/Head'

const LoginPasswordLost = () => {
  const login = userForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar')
      })

      const { json } = await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? <p style={{ color: '#4c1' }}>{data}</p> : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />

          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
              <Button>Enviar Email</Button>
            )}

          <Error error={error} />
        </form>
      )}
    </section>
  )
}

export default LoginPasswordLost
