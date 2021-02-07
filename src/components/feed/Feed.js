import React from 'react'

import FeedModel from './modal/FeedModel'
import FeedPhotos from './photos/FeedPhotos'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loadNewPhotos, resetFeedState } from '../../store/feed'
import Loading from '../helper/Loading'
import Error from '../helper/Error'

const Feed = ({ user }) => {
  const { infinite, loading, list, error } = useSelector(state => state.feed)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetFeedState())
    dispatch(loadNewPhotos({ user, total: 6 }))
  }, [dispatch, user])

  React.useEffect(() => {
    let wait = false;

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.screenY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * .75 && !wait) {
          dispatch(loadNewPhotos({ user, total: 6 }))
          wait = true;

          setTimeout(() => {
            wait = false;
          }, 500)
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll)
    window.addEventListener('scroll', infiniteScroll)

    return () => {
      window.removeEventListener('wheel', infiniteScroll)
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [infinite, dispatch, user])

  return (
    <div>
      <FeedModel />

      {loading && <Loading />}
      {error && <Error error={error} />}
      {list.length > 0 && (<FeedPhotos />)}

      {!infinite && !user && (
        <p>Não existe mais postagem</p>
      )}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.prototype = {
  user: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
}

export default Feed;