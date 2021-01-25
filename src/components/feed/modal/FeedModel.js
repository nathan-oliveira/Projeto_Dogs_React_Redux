import React from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../../hooks/useFetch'
import { PHOTO_GET } from '../../../api'

import Error from '../../helper/Error'
import Loading from '../../helper/Loading'
import PhotoContent from '../../photo/content/PhotoContent'

const FeedModel = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id)
    request(url, options)
  }, [photo, request])

  function handleOutsideClick(event) {
    if (event.target === event.currentTarge) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  )
}

export default FeedModel
