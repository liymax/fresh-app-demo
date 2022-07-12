/** @jsx h */
import { h } from "preact"
import { useEffect, useRef } from 'preact/hooks'
import {select} from "https://esm.sh/d3-selection@3"
import { pie, arc } from "https://esm.sh/d3-shape@3"
import { range, InternSet} from "https://esm.sh/d3-array@3"
import {quantize} from "https://esm.sh/d3-interpolate@3"
import {format} from "https://esm.sh/d3-format@3"
import TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js'
import {interpolateSpectral} from "https://esm.sh/d3-scale-chromatic@3"
import {scaleOrdinal} from "https://esm.sh/d3-scale@4"
import {pieData} from "../utils/dataMock.ts"
export default function () {
  const svgRef = useRef(null)
  const width = 560,height = 560
  const innerRadius = 120, strokeWidth = 0,strokeLinejoin = "round"
  const  outerRadius = Math.min(width, height) / 2 - 60,
    labelRadius = (innerRadius * 0.4 + outerRadius * 0.6)
  const stroke = innerRadius > 0 ? "none" : "white"
  const padAngle = stroke === "none" ? 1 / outerRadius : 0
  const N = pieData.map(e => e.age), V = pieData.map(e => e.amount)
  const I = range(N.length).filter(i => !isNaN(V[i]))
  const names = new InternSet(N)
  const colors = quantize(t => interpolateSpectral(t * 0.8 + 0.1), names.size)
  const color = scaleOrdinal(names, colors)
  const  title = i => `${N[i]}\n${format(',')(V[i])}`
  const arcs = pie().padAngle(padAngle).sort(null).value(i => V[i])(I)
  const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius)
  const makeArc =  outRad =>  arc().innerRadius(innerRadius).outerRadius(outRad)
  function drawPie() {
    const svg = select(svgRef.current).attr('viewBox', [-width/2,-height/2, width, height])
    svg.append("g").attr("stroke", stroke).attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin).selectAll("path")
      .data(arcs).join("path").attr("fill", d => color(N[d.data]))
      .attr("d", makeArc(outerRadius))
      .on('mouseover',function (ev){
        new TWEEN.Tween({outerRadius}).to({outerRadius: outerRadius+30}, 175)
        .onUpdate((obj) => {
          select(this).attr("d", makeArc(obj.outerRadius))
        }).start()
      }).on('mouseout', function () {
        new TWEEN.Tween({outerRadius: outerRadius+30}).to({outerRadius}, 125)
        .onUpdate((obj) => {
          select(this).attr("d", makeArc(obj.outerRadius))
        }).start()
      })
    svg.append("g").attr("font-size", 14).attr("text-anchor", "middle")
    .selectAll("text").data(arcs).join("text").style('pointer-events', 'none')
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan").data(d => {
        const lines = title(d.data).split(/\n/)
        return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1)
      }).join("tspan").attr("x", 0).attr("y", (_, i) => `${i * 1.1}em`)
      .attr("font-weight", (_, i) => i ? null : "bold").text(d => d);
  }
  useEffect(() => {
    function animate(time) {
      requestAnimationFrame(animate)
      TWEEN.update(time)
    }
    requestAnimationFrame(animate)
    drawPie()
  }, [])
  return (<div>
    <svg ref={svgRef} width={width} height={height}/>
  </div>)
}