import{d as l,b as u}from"./index.542c6195.js";import{a as n}from"./auth.285be793.js";const p=l({id:"proposal",state:()=>({proposal:JSON.parse(localStorage.getItem("proposal"))}),getters:{currentProposal:t=>t.proposal},actions:{setProposal(t){this.proposal=t,localStorage.setItem("proposal",JSON.stringify(t))}}}),m=l({id:"data",state:()=>({call:JSON.parse(localStorage.getItem("call"))}),getters:{currentCall:t=>t.call},actions:{setCall(t){this.call=t,localStorage.setItem("call",JSON.stringify(t))}}}),d=l({id:"utils",state:()=>({loading:Boolean(parseInt(localStorage.getItem("loading"))),stateData:JSON.parse(localStorage.getItem("state"))}),getters:{isLoading:t=>t.loading},actions:{setLoading(t){let a=1;this.loading=t,t===!1&&(a=0),localStorage.setItem("loading",a)},setStateData(t,a){var r=JSON.parse(localStorage.getItem("state")||"{}");r[t]=a,localStorage.setItem("state",JSON.stringify(r))},getStateData(){return JSON.parse(localStorage.getItem("state"))}}});var P=u(({app:t})=>{const a=n(),r=p(),i=m(),g=d();t.config.globalProperties.$userHasAnyGroups=e=>{var o=n().currentUser.groups;return e.some(s=>o.includes(s))},t.config.globalProperties.$buildURLQuery=e=>Object.entries(e).map(o=>{if(o[1])return o.map(encodeURIComponent).join("=")}).join("&"),t.config.globalProperties.$commaSeparator=e=>e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),t.config.globalProperties.$formatDate=e=>{if(!e)return"";const o=new Date(e),s=o.getFullYear(),c=o.toLocaleString("en-US",{month:"short"}),S=String(o.getDate()).padStart(2,"0");return`${c} ${S} ${s}`},t.config.globalProperties.$authStore=a,t.config.globalProperties.$dataStore=i,t.config.globalProperties.$proposalStore=r,t.config.globalProperties.$utilsStore=g});export{P as default};
