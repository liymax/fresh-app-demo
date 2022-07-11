/** @jsx h */
import { h } from "preact"
import { useEffect, useRef } from 'preact/hooks'
import {select} from "https://esm.sh/d3-selection@3"
import {axisBottom, axisLeft} from "https://esm.sh/d3-axis@3"
import {line, curveBundle, area, curveStepAfter } from "https://esm.sh/d3-shape@3"
import {range, max, extent} from "https://esm.sh/d3-array@3"
import {scaleBand, scaleLinear} from "https://esm.sh/d3-scale@4"
import {lineData} from '../utils/dataMock.ts'
export default function () {
  const svgRef = useRef(null)
  const width = 600
  const height = 400
  useEffect(() => {
    drawLine()
  }, [])

  function drawLine() {
    const svg = select(svgRef.current).attr('viewBox', [0,0, width, height])
      // .attr('style', 'border: 1px solid blue')
    const xScale = scaleBand().domain(lineData.map(e => e.date)).range([30, width-10])
    svg.append("g").attr("transform", `translate(0,${height-40})`)
      .call(axisBottom(xScale).tickSizeOuter(0))
      .call(g => g.select(".domain").remove())
    console.log(extent(lineData, d => d.count))
    const yScale = scaleLinear(extent(lineData, d => d.count), [height-40, 30])
    svg.append("g").attr("transform", `translate(30,0)`).call(axisLeft(yScale))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("x2", width - 40)
        .attr("stroke-opacity", 0.1))

    const line1 = line()
      // .curve(curveBundle.beta(1.3))
      .x(d => xScale(d.date)).y(d => yScale(d.count))
    svg.append("path").attr("fill", "none")
      .attr("stroke", 'purple').attr("d", line1(lineData))

    const areaIns = area().curve(curveStepAfter)
      .x(d => xScale(d.date)).y1(d => yScale(d.count)).y0(yScale(0))
     svg.append("path").attr("fill", "steelblue").attr("d", areaIns(lineData))
  }
  return (<div>
    <svg ref={svgRef} width={width} height={height}/>
  </div>)
}