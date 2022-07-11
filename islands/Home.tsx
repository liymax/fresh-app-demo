/** @jsx h */
import {h} from "preact";
import {tw} from "@twind";

export default function () {
  const pics = ['barChart.png','lineChart.png','pieChart.png']
  function goRoute(item) {
    // setRoute(r)
    location.href= '/' + item.split('.')[0]
  }
  return (
    <div class={tw`grid m-8 grid-cols-2`}>
      {pics.map(p =>{
        return <figure className={tw`m-6 cursor-pointer`}
                       onClick={e =>goRoute(p)}>
          <img src={'/'+p} alt={'截图:'+p} className={tw`max-w-lg h-auto`}/>
          <figcaption className={tw`text-center text-blue-600`}>点击，查看详情</figcaption>
        </figure>
      })}
    </div>
  );
}
