import React from 'react'

import FeedModel from './modal/FeedModel'
import FeedPhotos from './photos/FeedPhotos'
import PropTypes from 'prop-types'

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true)

  React.useEffect(() => {
    let wait = false;

    function infiniteScroll() {
      if (infinite) {
        const scroll = window.screenY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * .75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1])
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
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModel photo={modalPhoto} setModalPhoto={setModalPhoto} />}

      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}

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