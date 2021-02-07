import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Error from '../helper/Error';
import Loading from '../helper/Loading';
import PhotoContent from './content/PhotoContent';
import Head from '../helper/Head'
import { fetchPhoto } from '../../store/photo';

const Photo = () => {
  const { id } = useParams();
  const { loading, error, data } = useSelector(state => state.state)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPhoto(id))
  }, [dispatch, id])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data) return (
    <section className="container mainContainer">
      <Head title={data.photo.title} />
      <PhotoContent single={true} />
    </section>
  )
  else
    return null
}

export default Photo
