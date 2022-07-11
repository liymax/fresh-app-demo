/** @jsx h */
import { h } from "preact"
import { useEffect, useRef } from 'preact/hooks'
import {select} from "https://esm.sh/d3-selection@3"
import {scaleBand, scaleLinear} from "https://esm.sh/d3-scale@4"
import {range, max} from "https://esm.sh/d3-array@3"
import {axisBottom, axisLeft} from "https://esm.sh/d3-axis@3"
import {zoom} from "https://esm.sh/d3-zoom@3"
import {histData} from "../utils/dataMock.ts"
export default function () {
  const svgRef = useRef(null)
  const width = 900, height = 500
  const margin = {top: 20, right: 0, bottom: 30, left: 40}
  const gtZero = (d) => {
    return Math.max(d.value-0.012, 0)
  }
  function drawHist() {
    const svg = select(svgRef.current).attr('viewBox', [0,0, width, height])
    const xs = scaleBand().domain(histData.map(d => d.name))
      .range([margin.left, width - margin.right]).padding(0.1)
    const ys = scaleLinear().domain([0, max(histData, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])
    svg.append("g").attr("class", "bars").attr("fill", "steelblue")
      .selectAll("rect").data(histData).join("rect")
      .attr("x", d => xs(d.name)).attr("y", d => ys(d.value))
      .attr("height", d => ys(0) - ys(d.value))
      .attr("width", xs.bandwidth())
      .clone().attr("fill", "purple").attr("y", d => ys(gtZero(d)))
      .attr("height", d => ys(0) - ys(gtZero(d)))
    const xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(axisBottom(xs).tickSizeOuter(0))
    svg.append("g").attr("class", "x-axis").call(xAxis)
    svg.append("g").attr("class", "y-axis").attr("transform", `translate(${margin.left},0)`)
        .call(axisLeft(ys)).select(".domain").remove()
    svg.call(s => {
      const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]]
      s.call(zoom().scaleExtent([1, 8]).translateExtent(extent).extent(extent)
        .on("zoom", zoomed))
      function zoomed(event) {
        xs.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)))
        svg.selectAll(".bars rect").attr("x", d => xs(d.name)).attr("width", xs.bandwidth());
        svg.selectAll(".x-axis").call(xAxis);
      }
    })
  }
  useEffect(() => {
    drawHist()
  }, [])
  return (<div>
    <svg ref={svgRef} width={width} height={height}/>
  </div>)
}