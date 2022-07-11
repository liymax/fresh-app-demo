/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import PieChart from "../islands/PieChart.tsx";
export default function () {
  return (
    <div class={tw`flex justify-center mt-10`}>
      <PieChart />
    </div>
  )
}
