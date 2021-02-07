import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './FeedModal.module.css'

import Error from '../../helper/Error'
import Loading from '../../helper/Loading'
import PhotoContent from '../../photo/content/PhotoContent'
import { closeModal } from '../../../store/ui'

const FeedModel = () => {
  const { modal } = useSelector(state => state.ui)
  const { loading, error, data } = useSelector(state => state.state)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  function handleOutsideClick(event) {
    if (event.target === event.currentTarge) {
      dispatch(closeModal())
    }
  }

  if (!modal) return null
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  )
}

export default FeedModel
