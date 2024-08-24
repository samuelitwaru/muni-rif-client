import{Q as p,a as d}from"./QBreadcrumbs.c3e1ce91.js";import{Q as f}from"./QSeparator.d1f4a56a.js";import{_,r as b,o as n,c as k,w as r,g as t,a as l,e as v,E as g,h as m,F as T,i as Q,t as y,j as c,aJ as D,aK as I}from"./index.542c6195.js";import{Q as x}from"./QMarkupTable.131caeae.js";import{Q as B}from"./QPage.3405bde5.js";import{g as C}from"./api.ba4f3ba9.js";import"./use-dark.3250c496.js";import"./axios.8ac39568.js";const w={name:"ThemesList",data(){return{formData:{title:""},items:[]}},created(){this.init()},methods:{init(){C().then(e=>this.items=e)},createTheme(){this.$api.post("themes/",this.formData).then(e=>{(e.status=201)&&(this.items.unshift(e.data),this.formData={title:""})})},editItem(e){console.log("Edit item:",e)},deleteItem(e){confirm("Delete this theme?")&&this.$api.delete(`themes/${e}`).then(s=>{s.status==204&&this.init()})}}},S=e=>(D("data-v-7a0ccab7"),e=e(),I(),e),E={class:"q-ma-md"},V=S(()=>t("thead",null,[t("tr",null,[t("th",{align:"left"},"Title"),t("th",{align:"left"},"Actions")])],-1)),q=["disabled"];function A(e,s,F,L,o,i){const u=b("router-link");return n(),k(B,null,{default:r(()=>[t("div",E,[l(p,null,{default:r(()=>[l(d,{icon:"home",to:"/",label:"Home"}),l(d,{label:"Themes",icon:"apps"})]),_:1})]),l(f,{spaced:""}),l(x,{class:"q-ma-sm",flat:"",bordered:""},{default:r(()=>[V,t("tbody",null,[t("tr",null,[t("td",null,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>o.formData.title=a),style:{display:"block",width:"100%"},type:"text"},null,512),[[g,o.formData.title]])]),t("td",null,[t("button",{disabled:o.formData.title.length<5,onClick:s[1]||(s[1]=(...a)=>i.createTheme&&i.createTheme(...a))}," Add ",8,q)])]),(n(!0),m(T,null,Q(o.items,a=>(n(),m("tr",{key:a.id},[t("td",null,y(a.title),1),t("td",null,[l(u,{to:`/themes/${a.id}`},{default:r(()=>[l(c,{icon:"edit",flat:"",color:"primary",onClick:h=>i.editItem(a)},null,8,["onClick"])]),_:2},1032,["to"]),l(c,{icon:"delete",flat:"",color:"negative",onClick:h=>i.deleteItem(a.id)},null,8,["onClick"])])]))),128))])]),_:1})]),_:1})}var U=_(w,[["render",A],["__scopeId","data-v-7a0ccab7"]]);export{U as default};