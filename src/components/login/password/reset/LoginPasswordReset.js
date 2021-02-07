import React from 'react'
import { useNavigate } from 'react-router-dom'

import useForm from '../../../../hooks/useForm'
import useFetch from '../../../../hooks/useFetch'
import { PASSWORD_RESET } from '../../../../api'

import Input from '../../../forms/input/Input'
import Button from '../../../forms/button/Button'
import Error from '../../../helper/Error'
import Head from '../../../helper/Head'

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm('password');
  const { error, loading, data, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')

    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })

      const { response } = await request(url, options);

      if (response.ok) navigate('/login')
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Resete sua Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <Button disabled>Resentando...</Button>
        ) : (
            <Button>Resetar</Button>
          )}
      </form>

      <Error error={error} />
    </section>
  )
}

export default LoginPasswordReset
