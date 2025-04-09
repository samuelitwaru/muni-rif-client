import{Q as U}from"./QToolbarTitle.2734d12e.js";import{_ as q,o as a,j as l,f as m,w as $,i as t,v as y,g as v,H as b,t as n,F as f,k as g,l as P,aM as F,aN as B,aV as C,r as S,h as Q,e as T,Q as V}from"./index.bedc03b0.js";import{Q as x}from"./QCard.bbe5bc56.js";import{Q as N}from"./QCardSection.e02d2dca.js";import{Q as w}from"./QMarkupTable.c0307db7.js";import{Q as G}from"./QEditor.98ed0955.js";import{Q as A}from"./QForm.e807d490.js";import{c as M}from"./index.5ce110aa.js";import{Q as W}from"./QChip.cffa1c6f.js";import"./use-dark.efa299d0.js";import"./QBtnDropdown.17cf1504.js";import"./QBtnGroup.0eb3eb9a.js";import"./QMenu.016265da.js";import"./selection.06496e30.js";import"./use-timeout.4ebc94f9.js";import"./focusout.95943440.js";import"./focus-manager.b507780d.js";import"./use-transition.d4fcd429.js";import"./scroll.5d411e84.js";import"./uid.42677368.js";import"./QItem.881097d0.js";import"./use-split-attrs.11b1e3e4.js";const H={name:"BudgetEditor",data(){return{formData:{item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id},updateFormData:{id:0,item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id},items:[]}},computed:{totalBudget(){var e=0;for(let s=0;s<this.items.length;s++){const d=this.items[s];e+=d.unit_cost*d.quantity}return e}},created(){this.init()},methods:{init(){this.getBudgets()},getBudgets(){this.$api.get(`budgets/?proposal=${this.$route.params.proposal_id}`).then(e=>{this.items=e.data})},createBudget(){this.$api.post("budgets/",this.formData).then(e=>{(e.status=201)&&(this.items.unshift(e.data),this.resetFormData(),this.$bus.emit("proposal-updated",!0))})},deleteItem(e){confirm("Delete this budget?")&&this.$api.delete(`budgets/${e}`).then(s=>{s.status==204&&(this.init(),this.$bus.emit("proposal-updated",!0))})},resetFormData(){this.formData={item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id}}}},k=e=>(F("data-v-34a02e97"),e=e(),B(),e),L=k(()=>t("th",{align:"left"},"Item",-1)),R=k(()=>t("th",{align:"left"},"Quantity",-1)),X=k(()=>t("th",{align:"left"},"Units",-1)),j=k(()=>t("th",{align:"left"},"Unit Cost (UGX)",-1)),O=k(()=>t("th",{align:"left"},"Total Cost (UGX)",-1)),z={key:0,align:"left"},J={key:0,class:"q-tr--no-hover"},K={key:0},Y={class:"q-tr--no-hover"},Z=k(()=>t("th",{class:"text-left",colspan:"4"},"Total",-1)),tt={class:"text-left"},et=k(()=>t("td",null,null,-1));function st(e,s,d,D,o,u){return a(),l("div",null,[m(w,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>{var h,p;return[t("thead",null,[t("tr",null,[L,R,X,j,O,((h=e.$proposalStore.currentProposal)==null?void 0:h.status)=="EDITING"?(a(),l("th",z," Actions ")):y("",!0)])]),t("tbody",null,[((p=e.$proposalStore.currentProposal)==null?void 0:p.status)=="EDITING"?(a(),l("tr",J,[t("td",null,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=r=>o.formData.item=r),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.item]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[1]||(s[1]=r=>o.formData.quantity=r),style:{display:"block",width:"100%"},type:"number"},null,512),[[b,o.formData.quantity]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[2]||(s[2]=r=>o.formData.units=r),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.units]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[3]||(s[3]=r=>o.formData.unit_cost=r),style:{display:"block",width:"100%"},type:"number"},null,512),[[b,o.formData.unit_cost]])]),t("td",null,n(e.$commaSeparator(o.formData.unit_cost*o.formData.quantity)),1),t("td",null,[t("button",{onClick:s[4]||(s[4]=(...r)=>u.createBudget&&u.createBudget(...r))},"Add")])])):y("",!0),(a(!0),l(f,null,g(o.items,r=>{var _;return a(),l("tr",{class:"q-tr--no-hover",key:r.id},[t("td",null,n(r.item),1),t("td",null,n(r.quantity),1),t("td",null,n(r.units),1),t("td",null,n(e.$commaSeparator(r.unit_cost))+" UGX",1),t("td",null,n(e.$commaSeparator(r.unit_cost*r.quantity))+" UGX",1),((_=e.$proposalStore.currentProposal)==null?void 0:_.status)=="EDITING"?(a(),l("td",K,[m(P,{icon:"delete",flat:"",color:"negative",onClick:c=>u.deleteItem(r.id)},null,8,["onClick"])])):y("",!0)])}),128)),t("tr",Y,[Z,t("th",tt,n(e.$commaSeparator(u.totalBudget))+" UGX",1),et])])]}),_:1})])}var ot=q(H,[["render",st],["__scopeId","data-v-34a02e97"]]);const at={name:"TeamEditor",data(){return{formData:{full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id,role:"PI"},formErrors:{},items:[],options:[{name:"PI",value:"PI"},{name:"Co PI",value:"Co PI"},{name:"MEMBER",value:"MEMBER"}]}},created(){this.init()},methods:{init(){this.getTeams()},getTeams(){this.$api.get(`teams/?proposal=${this.$route.params.proposal_id}`).then(e=>{this.items=e.data})},createTeam(){this.$api.post("teams/",this.formData).then(e=>{(e.status=201)&&(this.formErrors={},this.items.push(e.data),this.resetFormData(),this.$bus.emit("proposal-updated",!0))}).catch(e=>{this.formErrors=e.response.data,this.$utilsStore.setLoading(!1)})},deleteItem(e){confirm("Delete this team?")&&this.$api.delete(`teams/${e}`).then(s=>{s.status==204&&(this.init(),this.$bus.emit("proposal-updated",!0))})},resetFormData(){this.formData={full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id}}}},lt=t("th",{align:"left"},"Full Name",-1),it=t("th",{align:"left"},"Email",-1),rt=t("th",{align:"left"},"Telephone",-1),nt=t("th",{align:"left"},"Role",-1),dt={key:0,align:"left"},ut={key:0,class:"q-tr--no-hover"},pt={class:"text-red"},mt={class:"q-ma-xs"},ct={class:"text-red"},ht={class:"q-ma-xs"},_t={class:"text-red"},ft={class:"q-ma-xs"},gt=["value"],yt={key:0};function $t(e,s,d,D,o,u){return a(),l("div",null,[m(w,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>{var h,p,r,_,c;return[t("thead",null,[t("tr",null,[lt,it,rt,nt,((h=e.$proposalStore.currentProposal)==null?void 0:h.status)=="EDITING"?(a(),l("th",dt," Actions ")):y("",!0)])]),t("tbody",null,[((p=e.$proposalStore.currentProposal)==null?void 0:p.status)=="EDITING"&&o.items.length<5?(a(),l("tr",ut,[t("td",null,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=i=>o.formData.full_name=i),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.full_name]]),t("div",pt,[t("ul",mt,[(a(!0),l(f,null,g((r=o.formErrors)==null?void 0:r.full_name,i=>(a(),l("li",{key:i},n(i),1))),128))])])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[1]||(s[1]=i=>o.formData.email=i),style:{display:"block",width:"100%"},type:"email"},null,512),[[b,o.formData.email]]),t("div",ct,[t("ul",ht,[(a(!0),l(f,null,g((_=o.formErrors)==null?void 0:_.email,i=>(a(),l("li",{key:i},n(i),1))),128))])])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[2]||(s[2]=i=>o.formData.telephone=i),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.telephone]]),t("div",_t,[t("ul",ft,[(a(!0),l(f,null,g((c=o.formErrors)==null?void 0:c.telephone,i=>(a(),l("li",{key:i},n(i),1))),128))])])]),t("td",null,[v(t("select",{"onUpdate:modelValue":s[3]||(s[3]=i=>o.formData.role=i)},[(a(!0),l(f,null,g(o.options,i=>(a(),l("option",{key:i.name,value:i.name},n(i.value),9,gt))),128))],512),[[C,o.formData.role]])]),t("td",null,[t("button",{onClick:s[4]||(s[4]=(...i)=>u.createTeam&&u.createTeam(...i))},"Add")])])):y("",!0),(a(!0),l(f,null,g(o.items,i=>{var I;return a(),l("tr",{class:"q-tr--no-hover",key:i.id},[t("td",null,n(i.full_name),1),t("td",null,n(i.email),1),t("td",null,n(i.telephone),1),t("td",null,n(i.role),1),((I=e.$proposalStore.currentProposal)==null?void 0:I.status)=="EDITING"?(a(),l("td",yt,[m(P,{icon:"delete",flat:"",color:"negative",onClick:E=>u.deleteItem(i.id)},null,8,["onClick"])])):y("",!0)])}),128))])]}),_:1})])}var vt=q(at,[["render",$t]]);const Dt={name:"SectionEditor2",props:{proposal:{type:Object,required:!0},section:{type:Object,required:!0}},data(){return{loading:!1,showDialog:!1,formData:{}}},computed:{numWords(){return this.countWordsInHtml(this.formData[this.section.name]||"")}},methods:{updateSection(){this.$api.patch(`proposals/${this.$route.params.proposal_id}/`,this.formData).then(e=>{this.$emit("proposal-updated",e.data),this.$bus.emit("proposal-updated",e.data)})},countWordsInHtml(e){return M.load(e)("body").text().split(/\s+/).length-1}},mounted(){this.formData[this.section.name]=this.proposal[this.section.name]||""},watch:{proposal(e){this.formData[this.section.name]=e[this.section.name]||""}}},bt={key:0},kt={class:"scroll"},It={class:"text-caption text-grey-8",align:"right"},St={key:0,class:"text-red text-caption"},qt={key:1,class:"text-right"};function Tt(e,s,d,D,o,u){var h,p;return((h=d.proposal)==null?void 0:h.status)=="EDITING"&&e.$authStore.currentUser.id==((p=d.proposal)==null?void 0:p.user)?(a(),l("div",bt,[m(A,{onSubmit:u.updateSection,class:"q-gutter-md"},{default:$(()=>[t("div",kt,[m(G,{modelValue:o.formData[d.section.name],"onUpdate:modelValue":s[0]||(s[0]=r=>o.formData[d.section.name]=r),label:"Title of your proposal",outlined:"",required:"","min-height":"30vh",onBlur:u.updateSection},null,8,["modelValue","onBlur"]),t("div",It,[u.numWords>d.section.word_limit?(a(),l("small",St," Exceeded word limit ("+n(u.numWords)+"/"+n(d.section.lower_limit)+"-"+n(d.section.word_limit)+") ",1)):(a(),l("div",qt," Number of Words ("+n(u.numWords)+"/"+n(d.section.lower_limit)+"-"+n(d.section.word_limit)+") ",1))])])]),_:1},8,["onSubmit"])])):y("",!0)}var Et=q(Dt,[["render",Tt]]);const wt={name:"AttachmentEditor",data(){return{formData:{full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id},attachments:[],attachmentsValid:!1}},created(){this.init()},methods:{init(){this.getAttachments()},getAttachments(){this.$api.get("attachments/").then(e=>{this.attachments=e.data,this.getFiles()})},getFiles(){for(let e=0;e<this.attachments.length;e++){const s=this.attachments[e];this.$api.get(`files/?proposal_id=${this.$route.params.proposal_id}&attachment_id=${s.id}`).then(d=>{var D=d.data;if(this.attachments.filter(o=>o.id==s.id)[0].files=D,e==this.attachments.length-1){let o=this.validateAttachments();this.$bus.emit("attachments-updated",o)}})}},validateAttachments(){let e=this.attachments.filter(s=>{var d;return s.is_required&&((d=s.files)==null?void 0:d.length)==0});return console.log("invalidAttach",e),!e.length},deleteFile(e){confirm("Delete this File?")&&this.$api.delete(`files/${e}/`).then(s=>{s.status==204&&this.getFiles()})},openFile(e){window.open(e)}}},xt=t("thead",null,[t("tr",null,[t("th",{align:"left"},"Title"),t("th",{align:"left",colspan:"2"},"Files")])],-1),Pt={key:0,class:"text-red"},Ut={class:"flex"};function Ft(e,s,d,D,o,u){const h=S("proposal-file-attachment");return a(),l("div",null,[m(w,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>[xt,t("tbody",null,[(a(!0),l(f,null,g(o.attachments,p=>(a(),l("tr",{key:p.id},[t("td",null,[Q(n(p.title)+" ",1),p.is_required?(a(),l("span",Pt,"*")):y("",!0)]),t("td",null,[t("div",Ut,[(a(!0),l(f,null,g(p.files,r=>(a(),T(W,{dense:"",key:r.id,class:"glossy",icon:"attachment",label:r.name,removable:e.$userHasAnyGroups(["applicant"])&&e.$authStore.currentUser.id==e.$proposalStore.currentProposal.user&&e.$proposalStore.currentProposal.status=="EDITING",clickable:"",onRemove:_=>u.deleteFile(r.id),onClick:_=>u.openFile(r.file)},null,8,["label","removable","onRemove","onClick"]))),128))])]),t("td",null,[m(h,{attachment_id:p.id,onFileUploaded:s[0]||(s[0]=r=>u.getFiles())},null,8,["attachment_id"])])]))),128))])]),_:1})])}var Bt=q(wt,[["render",Ft]]);const Ct={components:{budgeteditor:ot,teameditor:vt,sectioneditor2:Et,attachmentseditor:Bt},data(){return{sections:[],proposal:{},score:null,content:`
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`}},created(){this.getProposal(),this.getSections()},methods:{getProposal(){this.$api.get(`proposals/${this.$route.params.proposal_id}/`).then(e=>{this.proposal=e.data,this.$proposalStore.setProposal(this.proposal),this.getScore()})},getScore(){var e;this.$api.get(`scores/?user=${((e=this.$authStore.currentUser)==null?void 0:e.id)||0}&proposal=${this.$route.params.proposal_id}`).then(s=>{s.data.length==1&&(this.score=s.data[0])})},getSections(){this.$api.get("sections/").then(e=>{this.sections=e.data})}}},Qt={class:"q-pa-sm"},Vt=["id"],Nt={class:"q-pa-sm"},Gt={class:"flex"},At={class:"bg-grey-0"},Mt={class:"text-caption text-grey-8"},Wt={class:"q-pt-sm"},Ht={key:0},Lt={key:1},Rt={key:2},Xt={key:3},jt=["innerHTML"],Ot=t("hr",{id:"solution",class:"section-separator"},null,-1);function zt(e,s,d,D,o,u){const h=S("budgeteditor"),p=S("teameditor"),r=S("attachmentseditor"),_=S("sectioneditor2");return a(),l("div",Qt,[(a(!0),l(f,null,g(o.sections,c=>{var i,I;return a(),l("div",{key:c.id},[t("hr",{id:c.name,class:"section-separator"},null,8,Vt),t("div",Nt,[m(U,{class:"flex justify-between"},{default:$(()=>[t("div",Gt,n(c.title),1)]),_:2},1024),((i=e.$proposalStore.currentProposal)==null?void 0:i.status)=="EDITING"?(a(),T(x,{key:0,class:"flex no-wrap q-pa-sm",flat:"",bordered:""},{default:$(()=>[m(V,{size:"md",class:"q-pr-sm",name:"info_outline"}),t("div",At,[t("small",Mt,n(c.description),1)])]),_:2},1024)):y("",!0),t("div",Wt,[c.ref=="#summary_budget"?(a(),l("div",Ht,[m(h)])):c.ref=="#team"?(a(),l("div",Lt,[m(p)])):c.ref=="#attachments"?(a(),l("div",Rt,[m(r)])):(a(),l("div",Xt,[((I=e.$proposalStore.currentProposal)==null?void 0:I.status)=="EDITING"?(a(),T(_,{key:0,proposal:o.proposal,section:c,onProposalUpdated:s[0]||(s[0]=E=>{o.proposal=E,e.$proposalStore.setProposal(E)})},null,8,["proposal","section"])):(a(),T(x,{key:1,class:"my-card",flat:"",bordered:""},{default:$(()=>[m(N,null,{default:$(()=>[t("div",{innerHTML:o.proposal[c.name]},null,8,jt)]),_:2},1024)]),_:2},1024))]))])])])}),128)),Ot])}var ye=q(Ct,[["render",zt]]);export{ye as default};
