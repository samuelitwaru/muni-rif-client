import{_ as m,a as u,r as o,o as p,e as f,w as a,f as e,i as t,aX as g,t as h}from"./index.372b62db.js";import{Q as y}from"./QToolbarTitle.e100ace9.js";import{Q as v,a as x,b}from"./QLayout.3cf702a4.js";import{Q as s}from"./QSeparator.bc4ab105.js";import{_ as w}from"./logo.151e68dc.js";import"./scroll.34254c72.js";import"./use-dark.cd8e6500.js";const q={setup(){return u().isLoggedIn&&(window.location.href="/"),{year:new Date().getFullYear()}}},L={reveal:"",bordered:"",class:"bg-primary text-white"},Q=t("img",{src:w},null,-1),S=t("label",{class:"q-pa-md text-white"},"MuniRIF Management System",-1),k={class:"q-mt-md"},I={id:"bg",class:"row q-py-md",style:{"background-image":"url('https://munirif.pythonanywhere.com/media/static/bg.jpg')","background-position":"center","min-height":"40rem"}},F={class:"flex col-md-8 q-mb-md"},M={class:"col flex justify-center q-px-md"},R={align:"center",class:"q-pa-sm q-mt-xl",style:{"background-color":"#00b0d9",height:"14rem"}},B={class:"text-white q-py-xl q-my-xl"};function C(n,r,T,i,V,$){const l=o("loading-component"),c=o("router-link"),d=o("taglines"),_=o("router-view");return p(),f(b,{view:"hhr LpR lFf"},{default:a(()=>[e(l),t("div",L,[e(v,null,{default:a(()=>[e(y,null,{default:a(()=>[e(c,{to:"/",style:{}},{default:a(()=>[t("div",null,[e(g,null,{default:a(()=>[Q]),_:1}),S])]),_:1})]),_:1})]),_:1})]),e(x,null,{default:a(()=>[t("div",k,[e(d,{style:{color:"#00b0d9","font-family":`'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif`}})]),t("div",I,[t("div",F,[e(s,{spaced:""})]),t("div",M,[e(_)])]),e(s,{spaced:""}),t("div",R,[t("p",B," \xA9 "+h(i.year)+" MuniRIF Management System. All rights reserved ",1)])]),_:1})]),_:1})}var X=m(q,[["render",C]]);export{X as default};