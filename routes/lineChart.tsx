/** @jsx h */
import { h } from "preact"
import { tw } from "@twind"
import Graph from "../islands/Graph.tsx"
export default function () {
  return (
    <div className={tw`flex justify-center mt-10`}>
      <Graph />
    </div>
  )
}
