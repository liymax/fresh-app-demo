/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Histogram from "../islands/Histogram.tsx";
export default function () {
  return (
    <div class={tw`flex justify-center mt-10`}>
      <Histogram />
    </div>
  )
}
