import{d as k,r as s,o as b,a as d,c as p,b as g,F as B,e as C,n as F,f as I,t as M,_ as L,g as S,h as D}from"./index-CK3bdsGx.js";const N=["data-index"],E=k({__name:"VirtualSlide",props:{total:{default:20},list:{default:()=>[]}},setup(h){const l=h,i=s(),c=s(),t=s([]),a=s(0),e=s(0),f=s(0),u=s(0),m=s(0),v=s(document.documentElement.clientHeight);function y(n){f.value=n.touches[0].clientY,m.value=Date.now()}function T(n){if(u.value=n.touches[0].clientY-f.value,e.value===0&&u.value>0)return console.log("上拉刷新");if(e.value===l.total-1&&u.value<0)return console.log("没有更多了");_(u.value-e.value*v.value,"none")}function $(){if(x()){if(u.value>0){if(e.value===0)return;e.value--}if(u.value<0){if(e.value===l.total-1)return;e.value++,e.value>=a.value}}w(),_(-e.value*v.value,"all 0.3s"),R()}function w(){if(x()){const n=e.value<l.total-a.value-1,r=e.value<l.total-a.value-2;if(u.value>0&&r&&(e.value>=a.value||e.value===a.value-1)){const o=e.value-a.value+1;t.value.pop(),t.value.unshift(l.list[o])}if(u.value<0&&n&&e.value>=a.value){const o=e.value-a.value+t.value.length;t.value.shift(),t.value.push(l.list[o])}}}function _(n,r){c.value.style.transition=r,c.value.style.transform=`translateY(${n}px)`}function R(){f.value=0,u.value=0}function V(){t.value=l.list.slice(0,Math.min(l.total,5)),a.value=Math.floor(t.value.length/2)}function x(){const n=Date.now()-m.value,o=Math.abs(u.value)/n>.5;return Math.abs(u.value)>v.value/2||o}function Y(){if(e.value>=a.value){const n=e.value-a.value+1,r=l.total-1-a.value-2,o=Math.min(n,r)*v.value;return`${Math.max(o,0)}px`}return 0}return b(()=>{V()}),(n,r)=>(d(),p("div",{ref_key:"wrapperRef",ref:i,class:"wrapper",onTouchstart:y,onTouchmove:T,onTouchend:$},[g("div",{ref_key:"listRef",ref:c,class:"list"},[(d(!0),p(B,null,C(t.value,o=>(d(),p("div",{key:o.index,class:"item","data-index":o.index,style:F({top:Y(),background:o.background})},[I(M(o.title)+": ",1),g("div",null,"activeIndex："+M(e.value),1)],12,N))),128))],512)],544))}}),H=L(E,[["__scopeId","data-v-b7cb791a"]]);function z(){return`rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`}const q=k({__name:"slide.demo",setup(h){const l=s([]),i=s(0);function c(){for(let t=0;t<40;t++)l.value.push({index:t+1,title:`第${t+1}个`,background:z()});i.value=40}return b(()=>{c()}),(t,a)=>i.value?(d(),S(H,{key:0,list:l.value,total:i.value},null,8,["list","total"])):D("",!0)}});export{q as default};
