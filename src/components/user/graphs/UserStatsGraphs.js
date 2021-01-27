import React from 'react'
import styles from './UserStatsGraphs.module.css'
import {
  VictoryPie as Pie,
  VictoryChart as Chart,
  VictoryBar as Bar
} from 'victory';

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos)
      }
    })

    const arrayTotal = data.map(({ acessos }) => Number(acessos))
    const total = arrayTotal.reduce((a, b) => a + b)

    setTotal(total);
    setGraph(graphData);
  }, [data])

  return (
    <section className={` ${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p class="">Acessos: ${total} </p>
      </div>
      <div className={styles.graphItem}>
        <Pie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2
            },
            labels: {
              fontSize: 14,
              fill: '#333'
            },
          }}
        />
      </div>

      <div div={styles.graphItem}>
        <Chart>
          <Bar
            alignment="start"
            data={graph}
          />
        </Chart>
      </div>
    </section>
  )
}

export default UserStatsGraphs
