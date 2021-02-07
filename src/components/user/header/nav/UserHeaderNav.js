import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './UserHeaderNav.module.css'

import useMedia from '../../../../hooks/useMedia'

import { ReactComponent as MinhasFotos } from '../../../../assets/feed.svg'
import { ReactComponent as Estatisticas } from '../../../../assets/estatisticas.svg'
import { ReactComponent as AdicionarFotos } from '../../../../assets/adicionar.svg'
import { ReactComponent as Sair } from '../../../../assets/sair.svg';
import { useDispatch } from 'react-redux'
import { userLogout } from '../../../../store/user'

const UserHeaderNav = () => {
  const dispatch = useDispatch()
  const mobile = useMedia('(max-width: 40rem');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname])

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" end activeClassName={styles.active}>
          <MinhasFotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas" activeClassName={styles.active}>
          <Estatisticas />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to="/conta/postar" activeClassName={styles.active}>
          <AdicionarFotos />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={() => dispatch(userLogout())}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  )
}

export default UserHeaderNav
