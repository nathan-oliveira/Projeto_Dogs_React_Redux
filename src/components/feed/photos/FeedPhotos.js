import React from 'react'
import styles from './FeedPhotos.module.css'

import { PHOTOS_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch'

import Error from '../../helper/Error'
import Loading from '../../helper/Loading'
import FeedPhotosItem from './item/FeedPhotosItem'
import { useSelector } from 'react-redux';

const FeedPhotos = ({ setModalPhoto }) => {
  const { list } = useSelector(state => state.feed)

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {list.map(photo => (
        <FeedPhotosItem
          photo={photo}
          key={photo.id}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  )
}

export default FeedPhotos
