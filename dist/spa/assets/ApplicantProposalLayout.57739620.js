import{_ as D,J as B,aL as C,r as p,o as r,e as i,w as s,f as o,l as h,i as a,j as d,t as f,v as c,F as I,k as q,g as L,Q as y,h as F,R as N}from"./index.3ceec1d0.js";import{Q as w}from"./QInput.21ead741.js";import{Q as M}from"./QChip.992f8412.js";import{Q as v}from"./QToolbarTitle.07383659.js";import{Q as O,a as j,b as A}from"./QLayout.068da9d3.js";import{Q as E}from"./QHeader.0a6aa35f.js";import{Q as G}from"./QCard.6a05c192.js";import{Q as b}from"./QSeparator.f2419a3c.js";import{Q as H,a as U}from"./QItem.0066d918.js";import{Q as W}from"./QList.6907dda0.js";import{Q as z}from"./QDrawer.d997af1a.js";import{Q as x}from"./QMarkupTable.0526bcd7.js";import{c as R}from"./index.5ce110aa.js";import"./use-key-composition.be73f6ad.js";import"./use-dark.cdc1981a.js";import"./use-split-attrs.9038d558.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.6d2fe591.js";import"./scroll.1f71a2f6.js";import"./use-prevent-scroll.1aecfb27.js";import"./use-timeout.a878214f.js";import"./TouchPan.3fb84e77.js";import"./touch.3df10340.js";import"./selection.6ac5d2d4.js";import"./format.3e32b8d9.js";const J=B({name:"ProposalLayout",data(){return{formData:{title:""},proposal:null,editMode:!1,leftDrawerOpen:!1,score:{},sections:[],isAttachmentsValid:!1,isTeamValid:!1,isBudgetValid:!1,validity:{}}},computed:{wordCounts(){let t={};for(let e=0;e<this.sections.length;e++){const m=this.sections[e];t[m.name]=this.countWordsInHtml(this.proposal[m.name]||"")}return t},isProposalValid(){var t=!0;for(let e in this.validity)if(this.validity.hasOwnProperty(e)){if(this.validity[e])continue;return!1}return t}},created(){C(this.$options.__file),this.getProposal(),this.$bus.on("proposal-updated",t=>{this.getProposal(!1)}),this.$bus.on("attachments-updated",t=>{this.isAttachmentsValid=t})},methods:{getProposal(t=!0){this.$utilsStore.setLoading(t),this.$api.get(`proposals/${this.$route.params.proposal_id}/`).then(e=>{this.proposal=e.data,this.formData.title=this.proposal.title,this.$proposalStore.setProposal(this.proposal),this.getSections(),this.getScore(),this.getTeam(),this.getBudget(),this.$utilsStore.setLoading(!1)})},getTeam(){this.$api.get(`teams/?proposal=${this.$route.params.proposal_id}`).then(t=>{t.data.length?this.isTeamValid=!0:this.isTeamValid=!1})},getBudget(){this.$api.get(`budgets/?proposal=${this.$route.params.proposal_id}`).then(t=>{t.data.length?this.isBudgetValid=!0:this.isBudgetValid=!1})},getScore(){var t;this.$api.get(`scores/?user=${((t=this.$authStore.currentUser)==null?void 0:t.id)||0}&proposal=${this.$route.params.proposal_id}`).then(e=>{e.data.length==1&&(this.score=e.data[0])})},editProposalTitle(){this.$api.patch(`/proposals/${this.$route.params.proposal_id}/`,this.formData).then(t=>{this.$proposalStore.setProposal(t.data),this.editMode=!1})},deleteFile(t){confirm("Delete this File?")&&this.$api.delete(`files/${t}/`).then(e=>{this.getProposalFiles()})},getSections(){this.$api.get("sections/").then(t=>{this.sections=t.data})},downloadProposal(){this.$api.get(`proposals/${this.$route.params.proposal_id}/pdf/download/`).then(t=>{t.status==200&&window.open(t.data.file_url,"_blank")})},openFile(t){window.open(t)},countWordsInHtml(t){return R.load(t)("body").text().split(/\s+/).length},validateSection(t){let e=!1;return t.name=="attachments"?(e=this.isAttachmentsValid,this.validity[t.name]=e,e):t.name=="summary_budget"?(e=this.isBudgetValid,this.validity[t.name]=e,e):t.name=="team"?(e=this.isTeamValid,this.validity[t.name]=e,e):(e=this.wordCounts[t.name]>=t.lower_limit&&this.wordCounts[t.name]<=t.word_limit,this.validity[t.name]=e,e)}}}),K={class:"flex justify-between items-center"},X={class:"q-my-xs"},Y={class:"flex"},Z=["href"],tt={class:"text-caption q-px-sm q-my-auto q-mr-sm"},et={class:"q-pa-md"},ot=a("div",{class:"flex"},"Background Information",-1),st={class:"q-tr--no-hover"},at=a("td",{class:"text-left"},"Title",-1),lt={class:"text-left"},rt={key:1},it={class:"q-tr--no-hover"},nt=a("td",{class:"text-left"},"Theme",-1),pt={class:"text-left"},dt={key:0,align:"center",class:"flex justify-center q-mb-lg"};function mt(t,e,m,k,P,ut){const Q=p("loading-component"),V=p("proposal-options"),_=p("router-link"),S=p("router-view"),T=p("submit-proposal");return t.$proposalStore.currentProposal?(r(),i(A,{key:0,view:"lHh Lpr lFf"},{default:s(()=>[o(Q),o(E,{elevated:""},{default:s(()=>[o(O,{class:"bg-white text-dark"},{default:s(()=>{var l;return[o(h,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e[0]||(e[0]=n=>t.leftDrawerOpen=!t.leftDrawerOpen)}),o(v,{class:"flex justify-between items-center"},{default:s(()=>{var n,u,$;return[a("div",K,[a("div",X,[t.editMode&&((n=t.$proposalStore.currentProposal)==null?void 0:n.status)=="EDITING"?(r(),i(w,{key:0,style:{"min-width":"20rem"},onBlur:t.editProposalTitle,modelValue:t.formData.title,"onUpdate:modelValue":e[1]||(e[1]=g=>t.formData.title=g),type:"text",outlined:"",dense:""},null,8,["onBlur","modelValue"])):(r(),d("span",{key:1,style:{cursor:"pointer"},onClick:e[2]||(e[2]=g=>t.editMode=!0)},f((u=t.$proposalStore.currentProposal)==null?void 0:u.title),1))]),o(M,{color:"secondary",class:"text-white",size:"md",label:($=t.$proposalStore.currentProposal)==null?void 0:$.status},null,8,["label"])])]}),_:1}),a("div",Y,[((l=t.$proposalStore.currentProposal)==null?void 0:l.status)!="EDITING"?(r(),i(h,{key:0,color:"primary",icon:"download",dense:"",label:"download",onClick:t.downloadProposal},null,8,["onClick"])):c("",!0),o(V)])]}),_:1})]),_:1}),o(z,{modelValue:t.leftDrawerOpen,"onUpdate:modelValue":e[3]||(e[3]=l=>t.leftDrawerOpen=l),class:"bg-grey-2","show-if-above":"",bordered:"",width:220},{default:s(()=>[o(G,{flat:"",class:"q-py-sm"},{default:s(()=>[o(_,{to:"/applicant/proposals"},{default:s(()=>[o(h,{class:"q-mx-sm",block:"",color:"primary",flat:"",icon:"arrow_back",label:"My Proposals"})]),_:1})]),_:1}),o(b),o(W,null,{default:s(()=>[(r(!0),d(I,null,q(t.sections,l=>(r(),d("a",{key:l.id,href:`/applicant/proposals/${t.$route.params.proposal_id}${l.ref}`},[L((r(),i(H,{clickable:""},{default:s(()=>[a("div",tt,[t.validateSection(l)?(r(),i(y,{key:0,size:"sm",color:"green",name:"check_circle_outline"})):(r(),i(y,{key:1,size:"sm",color:"red",name:"dangerous"}))]),o(U,null,{default:s(()=>[F(f(l.title),1)]),_:2},1024)]),_:2},1024)),[[N]]),o(b)],8,Z))),128))]),_:1})]),_:1},8,["modelValue"]),o(j,null,{default:s(()=>{var l;return[a("div",et,[o(v,{class:"flex justify-between"},{default:s(()=>[ot]),_:1}),a("div",null,[o(x,{flat:"",bordered:"",class:"q-ma-sm"},{default:s(()=>{var n;return[a("tbody",null,[a("tr",st,[at,a("td",lt,[((n=t.$proposalStore.currentProposal)==null?void 0:n.status)=="EDITING"?(r(),i(w,{key:0,style:{"min-width":"20rem"},onBlur:t.editProposalTitle,modelValue:t.formData.title,"onUpdate:modelValue":e[4]||(e[4]=u=>t.formData.title=u),type:"text",outlined:"",dense:""},null,8,["onBlur","modelValue"])):(r(),d("label",rt,f(t.$proposalStore.currentProposal.title),1))])]),a("tr",it,[nt,a("td",pt,f(t.$proposalStore.currentProposal.theme_title),1)])])]}),_:1})])]),o(S),((l=t.$proposalStore.currentProposal)==null?void 0:l.status)=="EDITING"?(r(),d("div",dt,[o(_,{class:"q-mx-sm",to:"/applicant/proposals"},{default:s(()=>[o(h,{color:"secondary",outline:"",icon:"check",label:"save and continue later"})]),_:1}),o(T,{disabled:!t.isProposalValid,proposal:t.$proposalStore.currentProposal},null,8,["disabled","proposal"])])):c("",!0)]}),_:1})]),_:1})):c("",!0)}var jt=D(J,[["render",mt]]);export{jt as default};