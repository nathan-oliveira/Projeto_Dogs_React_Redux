import React from 'react'
import { STATS_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch'

import Head from '../../helper/Head'
import Loading from '../../helper/Loading'
import Error from '../../helper/Error'
const UserStatsGraphs = React.lazy(() => import('../graphs/UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();

      await request(url, options);
    }

    getData();
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data) return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Poste sua foto" />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  )
  else return null;
}

export default UserStats;
