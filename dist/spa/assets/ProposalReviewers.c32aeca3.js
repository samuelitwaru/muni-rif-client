import{Q as g}from"./QToolbarTitle.07383659.js";import{_ as Q,r as w,o as l,j as n,f as s,i as t,w as r,h as c,e as p,F as u,k as _,t as a,l as f,v as k,g as S}from"./index.3ceec1d0.js";import{Q as y}from"./QMarkupTable.0526bcd7.js";import{Q as C}from"./QItemLabel.10f5b6db.js";import{Q as b,a as x}from"./QItem.0066d918.js";import{Q as $}from"./QList.6907dda0.js";import{Q as D}from"./QBtnDropdown.0bf88a3c.js";import{Q as q}from"./QInput.21ead741.js";import{Q as L}from"./QCard.6a05c192.js";import{C as V}from"./ClosePopup.78ca8335.js";import"./use-dark.cdc1981a.js";import"./QBtnGroup.fa193a84.js";import"./QMenu.e361c0a0.js";import"./selection.6ac5d2d4.js";import"./use-timeout.a878214f.js";import"./focusout.b7dd7394.js";import"./focus-manager.b507780d.js";import"./use-transition.0c217553.js";import"./scroll.1f71a2f6.js";import"./uid.42677368.js";import"./use-key-composition.be73f6ad.js";import"./use-split-attrs.9038d558.js";import"./use-form.6d2fe591.js";const B={data(){return{scores:[],reviewers:[],loading:!1,formData:{user:null,email:null,proposal:this.$route.params.proposal_id}}},created(){this.getScores(),this.getReviewers()},methods:{getScores(){this.$api.get(`scores/?proposal=${this.$route.params.proposal_id}`).then(o=>{this.scores=o.data})},getReviewers(){this.$api.get("users/?groups__name__in=reviewer").then(o=>{this.reviewers=o.data})},createScore(){this.$utilsStore.setLoading(!0),this.$api.post("scores/",this.formData).then(o=>{o.status==201&&(this.getScores(),this.$utilsStore.setLoading(!1))})},deleteScore(o){confirm("Are you sure you would like to delete this reviewer?")&&(this.$utilsStore.setLoading(!0),this.$api.delete(`scores/${o}/`).then(m=>{m.status==204&&(this.getScores(),this.$utilsStore.setLoading(!1))}))}}},R={class:"q-pa-sm"},A={class:"text-left"},I={class:"text-left"},N={class:"text-left flex"},T=t("label",{class:"text-h6 q-pa-sm"},"Add Reviewer",-1),E={class:"row"},F={class:"col-6 q-pa-sm"},P={class:"col-4 q-pa-sm"},j={class:"col-2 q-pa-sm"};function M(o,m,U,z,i,d){const h=w("proposal-score-sheets");return l(),n("div",null,[s(h),t("div",R,[s(g,null,{default:r(()=>[c("Reviewers")]),_:1}),i.scores.length?(l(),p(y,{key:0,flat:"",bordered:""},{default:r(()=>[t("tbody",null,[(l(!0),n(u,null,_(i.scores,e=>(l(),n("tr",{key:e.id},[t("td",A,a(e.user)+" - "+a(e.user__first_name)+" "+a(e.user__last_name)+" ["+a(e.user__username)+"] ",1),t("td",I,a(e.status),1),t("td",N,[s(f,{color:"primary",icon:"close",flat:"",dense:"",onClick:v=>d.deleteScore(e.id)},null,8,["onClick"])])]))),128))])]),_:1})):k("",!0),s(L,{flat:"",bordered:"",class:"my-card q-my-sm"},{default:r(()=>[T,t("div",E,[t("div",F,[s(D,{flat:"",class:"q-mx-sm",label:"Select reviewer",color:"primary"},{default:r(()=>[s($,null,{default:r(()=>[(l(!0),n(u,null,_(i.reviewers,e=>S((l(),p(b,{key:e.id,clickable:"",onClick:v=>{this.formData.email=e.username,this.formData.user=e.id}},{default:r(()=>[s(x,null,{default:r(()=>[s(C,null,{default:r(()=>[t("div",null,a(e.first_name)+" "+a(e.last_name),1),c(" "+a(e.username),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[V]])),128))]),_:1})]),_:1})]),t("div",P,[s(q,{outlined:"",dense:"",modelValue:i.formData.email,"onUpdate:modelValue":m[0]||(m[0]=e=>i.formData.email=e),type:"email",label:"Enter Email Address"},null,8,["modelValue"])]),t("div",j,[s(f,{color:"primary",label:"Add",onClick:d.createScore},null,8,["onClick"])])])]),_:1})])])}var _e=Q(B,[["render",M]]);export{_e as default};