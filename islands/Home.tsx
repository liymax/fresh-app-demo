/** @jsx h */
import {h} from "preact"
import { useState } from 'preact/hooks'
import {tw} from "@twind"
import Graph from "../islands/Graph.tsx"
import PieChart from "../islands/PieChart.tsx"
import Histogram from "../islands/Histogram.tsx"
export default function () {
  const pics = ['barChart.png','lineChart.png','pieChart.png']
  const [chart, setChart] = useState(null)
  function showChart(item) {
    const name = item.split('Chart')[0]
    setChart(name)
  }
  return (
    <main>
      <h3 className={tw`m-10 text-center`}>
        点击示意图，可切换图表/Click on the diagram to switch diagrams</h3>
      <div className={tw`grid m-8 grid-cols-3 grid-gap-2`}>
        {pics.map(p => {
          return <p className={tw`m-6 cursor-pointer`}
                    onClick={e => showChart(p)}>
            <img src={'/' + p} alt={'截图:' + p} className={tw`h-24 w-auto`}/>
          </p>
        })}
      </div>
      <div className={tw`flex justify-center mt-10`}>
        {chart==='bar'? <Histogram/>: (chart==='pie'?<PieChart /> : <Graph/>)}
      </div>
    </main>
  )
}
