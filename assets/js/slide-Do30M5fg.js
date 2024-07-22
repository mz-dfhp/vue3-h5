import{a as v,b as z,e as q,f as J,g as K,d as Y,h as Q,o as O,c as A,i as N,F as Z,r as ee,n as D,j as H,k as te,_ as ne,l as ie,p as ae,w as re,t as oe}from"./index-Dk7ZLyK5.js";var ue=typeof global=="object"&&global&&global.Object===Object&&global,le=typeof self=="object"&&self&&self.Object===Object&&self,G=ue||le||Function("return this")(),M=G.Symbol,X=Object.prototype,se=X.hasOwnProperty,ce=X.toString,j=M?M.toStringTag:void 0;function de(e){var n=se.call(e,j),i=e[j];try{e[j]=void 0;var a=!0}catch{}var r=ce.call(e);return a&&(n?e[j]=i:delete e[j]),r}var fe=Object.prototype,ve=fe.toString;function me(e){return ve.call(e)}var xe="[object Null]",ge="[object Undefined]",F=M?M.toStringTag:void 0;function pe(e){return e==null?e===void 0?ge:xe:F&&F in Object(e)?de(e):me(e)}function he(e){return e!=null&&typeof e=="object"}var be="[object Symbol]";function ye(e){return typeof e=="symbol"||he(e)&&pe(e)==be}var Te=/\s/;function _e(e){for(var n=e.length;n--&&Te.test(e.charAt(n)););return n}var Ie=/^\s+/;function Se(e){return e&&e.slice(0,_e(e)+1).replace(Ie,"")}function $(e){var n=typeof e;return e!=null&&(n=="object"||n=="function")}var P=NaN,je=/^[-+]0x[0-9a-f]+$/i,we=/^0b[01]+$/i,ke=/^0o[0-7]+$/i,Ee=parseInt;function U(e){if(typeof e=="number")return e;if(ye(e))return P;if($(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=$(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Se(e);var i=we.test(e);return i||ke.test(e)?Ee(e.slice(2),i?2:8):je.test(e)?P:+e}var C=function(){return G.Date.now()},Oe="Expected a function",Me=Math.max,$e=Math.min;function Re(e,n,i){var a,r,p,c,o,t,m=0,s=!1,h=!1,x=!0;if(typeof e!="function")throw new TypeError(Oe);n=U(n)||0,$(i)&&(s=!!i.leading,h="maxWait"in i,p=h?Me(U(i.maxWait)||0,n):p,x="trailing"in i?!!i.trailing:x);function T(u){var d=a,b=r;return a=r=void 0,m=u,c=e.apply(b,d),c}function R(u){return m=u,o=setTimeout(y,n),s?T(u):c}function L(u){var d=u-t,b=u-m,E=n-d;return h?$e(E,p-b):E}function w(u){var d=u-t,b=u-m;return t===void 0||d>=n||d<0||h&&b>=p}function y(){var u=C();if(w(u))return _(u);o=setTimeout(y,L(u))}function _(u){return o=void 0,x&&a?T(u):(a=r=void 0,c)}function I(){o!==void 0&&clearTimeout(o),m=0,a=t=r=o=void 0}function k(){return o===void 0?c:_(C())}function S(){var u=C(),d=w(u);if(a=arguments,r=this,t=u,d){if(o===void 0)return R(t);if(h)return clearTimeout(o),o=setTimeout(y,n),T(t)}return o===void 0&&(o=setTimeout(y,n)),c}return S.cancel=I,S.flush=k,S}var Le="Expected a function";function V(e,n,i){var a=!0,r=!0;if(typeof e!="function")throw new TypeError(Le);return $(i)&&(a="leading"in i?!!i.leading:a,r="trailing"in i?!!i.trailing:r),Re(e,n,{leading:a,maxWait:n,trailing:r})}function We(){const e=v(0),n=v(0);function i(){e.value=document.documentElement.clientWidth,n.value=document.documentElement.clientHeight}return z(()=>{i(),window.addEventListener("resize",V(i,200))}),q(()=>{window.removeEventListener("resize",i)}),J(()=>{i(),window.addEventListener("resize",V(i,200))}),K(()=>{window.removeEventListener("resize",i)}),{winWidth:e,winHeight:n}}const Ae=["data-index"],Ce=Y({__name:"VirtualSlide",props:{count:{default:5},total:{default:0},list:{default:()=>[]}},emits:["refresh","load","updateActiveIndex"],setup(e,{expose:n,emit:i}){const a=e,r=i,p=v(),c=v(),o=v([]),t=v(0),m=v(0),s=v(0),h=v(0),{winHeight:x}=We(),T=Q(()=>Math.max(t.value-1,0)*x.value);function R(l){m.value=l.touches[0].clientY,h.value=Date.now()}function L(l){if(s.value=l.touches[0].clientY-m.value,t.value===0&&s.value>0){r("refresh");return}t.value===a.total-1&&s.value<0||I(s.value-t.value*x.value,"none")}function w(){if(u()){if(s.value>0){if(t.value===0)return;t.value--}if(s.value<0){if(t.value===a.total-1)return;t.value++,t.value+o.value.length>=a.list.length&&y()}}I(-t.value*x.value,"all 0.3s"),_(),D(()=>{r("updateActiveIndex",t.value)}),k()}function y(){r("load")}function _(){if(u()){if(s.value>0&&t.value!==0){const l=o.value[0].index,f=a.list.findIndex(g=>g.index===l);o.value.pop(),o.value.unshift({...f!==-1?a.list[f-1]:{},uuid:d()})}if(s.value<0&&t.value>1&&t.value-1<a.total-1){const l=o.value.slice(-1)[0].index,f=a.list.findIndex(g=>g.index===l);o.value.shift(),o.value.push({...f!==-1?a.list[f+1]:{},uuid:d()})}}}function I(l,f){c.value.style.transition=f,c.value.style.transform=`translateY(${l}px)`}function k(){m.value=0,s.value=0}function S(){t.value=0,o.value=a.list.slice(0,Math.min(a.total,a.count)).map(l=>({...l,uuid:d()}))}function u(){const l=Date.now()-h.value,g=Math.abs(s.value)/l>.5;return Math.abs(s.value)>x.value/2||g}function d(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,l=>{const f=Math.random()*16|0;return(l==="x"?f:f&3|8).toString(16)})}z(()=>{S(),r("updateActiveIndex",t.value)});function b(){t.value!==0&&W(t.value+1)}function E(){t.value!==a.total-1&&W(t.value-1)}function W(l){t.value=l,I(-t.value*x.value,"all 0.3s"),_(),D(()=>{r("updateActiveIndex",t.value)}),k()}return n({onPre:b,onNext:E,onToIndex:W}),(l,f)=>(O(),A("div",{ref_key:"wrapperRef",ref:p,class:"wrapper",onTouchstart:R,onTouchmove:L,onTouchend:w},[N("div",{ref_key:"listRef",ref:c,class:"list"},[(O(!0),A(Z,null,ee(o.value,(g,B)=>(O(),A("div",{key:g.uuid,class:"item","data-index":B+t.value,style:H({top:`${T.value}px`})},[te(l.$slots,"default",{activeIndex:t.value,data:g},void 0)],12,Ae))),128))],512)],544))}}),Ne=ne(Ce,[["__scopeId","data-v-e4166499"]]);function ze(){return`rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`}const De=Y({__name:"slide",setup(e){const n=v([]),i=v(0);function a(){for(let r=0;r<10;r++)n.value.push({index:r+1,title:`第${r+1}个`,background:ze()});i.value=10}return z(()=>{a()}),(r,p)=>i.value?(O(),ie(Ne,{key:0,list:n.value,total:i.value},{default:re(({data:c})=>[N("div",{style:H({background:c.background,height:"100%"})},[N("div",null,oe(c.title),1)],4)]),_:1},8,["list","total"])):ae("",!0)}});export{De as default};
