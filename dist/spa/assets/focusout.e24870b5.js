import{av as f,p as v,aw as D,a8 as F,m as L,ax as Q,ay as _,az as G,L as K,v as M,M as O,ah as T,B as $,au as b,P as I}from"./index.542c6195.js";import{r as w,b as q}from"./focus-manager.b507780d.js";const c=[];function W(e){return c.find(n=>n.contentEl!==null&&n.contentEl.contains(e))}function B(e,n){do{if(e.$options.name==="QMenu"){if(e.hide(n),e.$props.separateClosePopup===!0)return f(e)}else if(e.__qPortal===!0){const t=f(e);return t!==void 0&&t.$options.name==="QPopupProxy"?(e.hide(n),t):e}e=f(e)}while(e!=null)}function z(e,n,t){for(;t!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(t--,e.$options.name==="QMenu"){e=B(e,n);continue}e.hide(n)}e=f(e)}}function C(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function H(e,n,t,l){const u=v(!1),r=v(!1);let i=null;const d={},g=l==="dialog"&&C(e);function E(p){if(p===!0){w(d),r.value=!0;return}r.value=!1,u.value===!1&&(g===!1&&i===null&&(i=_(!1,l)),u.value=!0,c.push(e.proxy),q(d))}function h(p){if(r.value=!1,p!==!0)return;w(d),u.value=!1;const P=c.indexOf(e.proxy);P!==-1&&c.splice(P,1),i!==null&&(G(i),i=null)}return D(()=>{h(!0)}),e.proxy.__qPortal=!0,F(e.proxy,"contentEl",()=>n.value),{showPortal:E,hidePortal:h,portalIsActive:u,portalIsAccessible:r,renderPortal:()=>g===!0?t():u.value===!0?[L(Q,{to:i},t())]:void 0}}function J(){let e;const n=$();function t(){e=void 0}return K(t),M(t),{removeTick:t,registerTick(l){e=l,O(()=>{e===l&&(T(n)===!1&&e(),e=void 0)})}}}const o=[];let s;function j(e){s=e.keyCode===27}function y(){s===!0&&(s=!1)}function A(e){s===!0&&(s=!1,I(e,27)===!0&&o[o.length-1](e))}function m(e){window[e]("keydown",j),window[e]("blur",y),window[e]("keyup",A),s=!1}function R(e){b.is.desktop===!0&&(o.push(e),o.length===1&&m("addEventListener"))}function S(e){const n=o.indexOf(e);n>-1&&(o.splice(n,1),o.length===0&&m("removeEventListener"))}const a=[];function k(e){a[a.length-1](e)}function V(e){b.is.desktop===!0&&(a.push(e),a.length===1&&document.body.addEventListener("focusin",k))}function X(e){const n=a.indexOf(e);n>-1&&(a.splice(n,1),a.length===0&&document.body.removeEventListener("focusin",k))}export{H as a,S as b,z as c,V as d,R as e,B as f,W as g,c as p,X as r,J as u};