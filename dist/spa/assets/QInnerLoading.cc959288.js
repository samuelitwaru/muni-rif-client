import{m as b,n as t,p as n,a7 as m,D as v,x as f}from"./index.3ceec1d0.js";import{a as S,u as y}from"./use-dark.cdc1981a.js";import{u as C,a as h}from"./use-transition.0c217553.js";var D=b({name:"QInnerLoading",props:{...S,...C,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(e,{slots:a}){const s=v(),r=y(e,s.proxy.$q),{transitionProps:i,transitionStyle:o}=h(e),u=t(()=>"q-inner-loading absolute-full column flex-center"+(r.value===!0?" q-inner-loading--dark":"")),c=t(()=>"q-inner-loading__label"+(e.labelClass!==void 0?` ${e.labelClass}`:""));function d(){const l=[n(f,{size:e.size,color:e.color})];return e.label!==void 0&&l.push(n("div",{class:c.value,style:e.labelStyle},[e.label])),l}function g(){return e.showing===!0?n("div",{class:u.value,style:o.value},a.default!==void 0?a.default():d()):null}return()=>n(m,i.value,g)}});export{D as Q};