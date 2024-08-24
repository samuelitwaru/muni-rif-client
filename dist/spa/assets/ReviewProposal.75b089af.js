import{Q as V}from"./QToolbarTitle.3cc2e02b.js";import{Q as B}from"./QBtnToggle.743b4d29.js";import{Q as f}from"./QCard.afc089a4.js";import{_ as g,o as r,h as n,a as o,w as m,f as C,t as p,g as a,s as x,r as c,F as M,i as L,e as u,aS as _,c as h,Q as E}from"./index.542c6195.js";import{p as H,B as N,T as D}from"./BudgetItems.c1bc9929.js";import{P as I}from"./ProposalHeader.4703ce61.js";import{Q as $}from"./QCircularProgress.81b1c16a.js";import{Q as z}from"./QCardSection.2e3c7736.js";import"./QBtnGroup.6ea4cb74.js";import"./use-form.94504a9c.js";import"./use-dark.3250c496.js";import"./QChip.91c2f2a3.js";import"./QMarkupTable.131caeae.js";import"./format.3e32b8d9.js";const O={props:["score","section"],name:"ScoreView"},U={key:0};function F(i,l,s,w,t,b){return s.score?(r(),n("div",U,[o(f,{class:"flex q-my-sm items-center",flat:"",bordered:""},{default:m(()=>[o(z,null,{default:m(()=>[o($,{"show-value":"","font-size":"12px",value:s.score[s.section.name]/s.section.max_score*100,size:"50px",thickness:.22,color:"teal","track-color":"grey-3",class:"q-ma-md"},{default:m(()=>[C(p(s.score[s.section.name])+"/"+p(s.section.max_score),1)]),_:1},8,["value"])]),_:1}),a("div",null,p(s.score[`${s.section.name}_comment`]||"No comment"),1)]),_:1})])):x("",!0)}var R=g(O,[["render",F]]);const j={name:"ReviewProposal",components:{proposalattachments:H,BudgetItems:N,TeamMembers:D,ProposalHeader:I,ScoreView:R},data(){return{tab:"content",sections:[],proposal:{},score:null,content:`
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`}},created(){this.getProposal(),this.getSections()},methods:{getProposal(){this.$api.get(`proposals/${this.$route.params.proposal_id}/`).then(i=>{this.proposal=i.data,this.$proposalStore.setProposal(this.proposal),this.getScore()})},getScore(){var i;this.$api.get(`scores/?user=${((i=this.$authStore.currentUser)==null?void 0:i.id)||0}&proposal=${this.$route.params.proposal_id}`).then(l=>{l.data.length==1&&(this.score=l.data[0])})},getSections(){this.$api.get("sections/").then(i=>{this.sections=i.data.map(l=>(l.view="proposal",l))})}}},G=["id"],A={class:"q-pa-sm"},J={class:"flex"},K={key:0},W={key:3},X=["innerHTML"],Y={class:"q-my-sm"},Z={class:"bg-grey-0"},ee={class:"text-caption text-grey-8"},oe=a("hr",{id:"solution",class:"section-separator"},null,-1);function se(i,l,s,w,t,b){const y=c("accept-review"),S=c("ProposalHeader"),q=c("proposalattachments"),k=c("BudgetItems"),P=c("TeamMembers"),Q=c("score-editor"),T=c("ScoreView");return r(),n("div",null,[o(y,{proposal:t.proposal,score:t.score},null,8,["proposal","score"]),o(S),(r(!0),n(M,null,L(t.sections,e=>{var v;return r(),n("div",{key:e.id},[a("hr",{id:e.name,class:"section-separator"},null,8,G),a("div",A,[o(V,{class:"flex justify-between"},{default:m(()=>[a("div",J,p(e.title),1)]),_:2},1024),e.max_score>0?(r(),n("div",K,[o(B,{class:"q-mt-xs",square:"",style:{border:"1px #dddddd solid"},glossy:"",padding:"5px 30px",modelValue:e.view,"onUpdate:modelValue":d=>e.view=d,color:"white","text-color":"black","toggle-text-color":"white",unelevated:"",bordered:"","toggle-color":"red",options:[{label:"Proposal",value:"proposal"},{label:"Guidelines",value:"guidelines"},{label:"Scores",value:"scores"}]},null,8,["modelValue","onUpdate:modelValue"])])):x("",!0),u(a("div",null,[e.name=="attachments"?(r(),h(q,{key:0})):e.name=="summary_budget"?(r(),h(k,{key:1})):e.name=="team"?(r(),h(P,{key:2})):(r(),n("div",W,[o(f,{flat:"",bordered:"",class:"q-pa-sm q-my-sm"},{default:m(()=>{var d;return[a("div",{style:{overflow:"auto","min-height":"5rem"},innerHTML:((d=t.proposal)==null?void 0:d[e.name])||""},null,8,X)]}),_:2},1024)]))],512),[[_,e.view=="proposal"]]),u(o(Q,{min:0,max:e.max_score,proposal:t.proposal,section:e,score:t.score},null,8,["max","proposal","section","score"]),[[_,e.view=="scores"]]),u(o(T,{section:e,score:t.score},null,8,["section","score"]),[[_,e.view=="scores"&&((v=t.score)==null?void 0:v.status)=="COMPLETED"]]),u(a("div",Y,[o(f,{class:"flex no-wrap q-pa-sm",flat:"",bordered:""},{default:m(()=>[o(E,{size:"md",class:"q-pr-sm",name:"info_outline"}),a("div",Z,[a("small",ee,p(e.description),1)])]),_:2},1024)],512),[[_,e.view=="guidelines"&&t.score.status=="COMPLETED"]])])])}),128)),oe])}var ve=g(j,[["render",se]]);export{ve as default};
