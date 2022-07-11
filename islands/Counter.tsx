/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(1);
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
  const handleClick = (e) => {
    console.log(e)
    setCount(count - 1)
    location.href= '/lineChart'
  }
  return (
    <div class={tw`flex gap-2 w-full`}>
      <p class={tw`flex-grow-1 font-bold text-xl`}
         onClick={() =>  location.href= '/lineChart'}>{count}</p>
      <button class={btn} onClick={handleClick}
        disabled={!IS_BROWSER}
      >-1</button>
      <button class={btn}
        onClick={() => setCount(count + 1)}
        disabled={!IS_BROWSER}
      >+1</button>
    </div>
  );
}
