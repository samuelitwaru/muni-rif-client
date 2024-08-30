import{Q as U}from"./QToolbarTitle.07383659.js";import{_ as S,o as a,j as r,f as m,w as $,i as t,v as y,g as v,H as b,t as d,F as f,k as g,l as P,aM as F,aN as B,aV as C,r as q,h as Q,e as T,Q as N}from"./index.3ceec1d0.js";import{Q as w}from"./QCard.6a05c192.js";import{Q as G}from"./QCardSection.c5fd739f.js";import{Q as x}from"./QMarkupTable.0526bcd7.js";import{Q as V}from"./QEditor.6d87f990.js";import{Q as A}from"./QForm.568aa704.js";import{c as M}from"./index.5ce110aa.js";import{Q as W}from"./QChip.992f8412.js";import"./use-dark.cdc1981a.js";import"./QBtnDropdown.0bf88a3c.js";import"./QBtnGroup.fa193a84.js";import"./QMenu.e361c0a0.js";import"./selection.6ac5d2d4.js";import"./use-timeout.a878214f.js";import"./focusout.b7dd7394.js";import"./focus-manager.b507780d.js";import"./use-transition.0c217553.js";import"./scroll.1f71a2f6.js";import"./uid.42677368.js";import"./QItem.0066d918.js";import"./use-split-attrs.9038d558.js";const H={name:"BudgetEditor",data(){return{formData:{item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id},updateFormData:{id:0,item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id},items:[]}},computed:{totalBudget(){var e=0;for(let s=0;s<this.items.length;s++){const n=this.items[s];e+=n.unit_cost*n.quantity}return e}},created(){this.init()},methods:{init(){this.getBudgets()},getBudgets(){this.$api.get(`budgets/?proposal=${this.$route.params.proposal_id}`).then(e=>{this.items=e.data})},createBudget(){this.$api.post("budgets/",this.formData).then(e=>{(e.status=201)&&(this.items.unshift(e.data),this.resetFormData(),this.$bus.emit("proposal-updated",!0))})},deleteItem(e){confirm("Delete this budget?")&&this.$api.delete(`budgets/${e}`).then(s=>{s.status==204&&(this.init(),this.$bus.emit("proposal-updated",!0))})},resetFormData(){this.formData={item:"",quantity:1,units:"",unit_cost:0,proposal:this.$route.params.proposal_id}}}},k=e=>(F("data-v-34a02e97"),e=e(),B(),e),L=k(()=>t("th",{align:"left"},"Item",-1)),R=k(()=>t("th",{align:"left"},"Quantity",-1)),X=k(()=>t("th",{align:"left"},"Units",-1)),j=k(()=>t("th",{align:"left"},"Unit Cost (UGX)",-1)),O=k(()=>t("th",{align:"left"},"Total Cost (UGX)",-1)),z={key:0,align:"left"},J={key:0,class:"q-tr--no-hover"},K={key:0},Y={class:"q-tr--no-hover"},Z=k(()=>t("th",{class:"text-left",colspan:"4"},"Total",-1)),tt={class:"text-left"},et=k(()=>t("td",null,null,-1));function st(e,s,n,D,o,u){return a(),r("div",null,[m(x,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>{var h,p;return[t("thead",null,[t("tr",null,[L,R,X,j,O,((h=e.$proposalStore.currentProposal)==null?void 0:h.status)=="EDITING"?(a(),r("th",z," Actions ")):y("",!0)])]),t("tbody",null,[((p=e.$proposalStore.currentProposal)==null?void 0:p.status)=="EDITING"?(a(),r("tr",J,[t("td",null,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=i=>o.formData.item=i),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.item]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[1]||(s[1]=i=>o.formData.quantity=i),style:{display:"block",width:"100%"},type:"number"},null,512),[[b,o.formData.quantity]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[2]||(s[2]=i=>o.formData.units=i),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.units]])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[3]||(s[3]=i=>o.formData.unit_cost=i),style:{display:"block",width:"100%"},type:"number"},null,512),[[b,o.formData.unit_cost]])]),t("td",null,d(e.$commaSeparator(o.formData.unit_cost*o.formData.quantity)),1),t("td",null,[t("button",{onClick:s[4]||(s[4]=(...i)=>u.createBudget&&u.createBudget(...i))},"Add")])])):y("",!0),(a(!0),r(f,null,g(o.items,i=>{var _;return a(),r("tr",{class:"q-tr--no-hover",key:i.id},[t("td",null,d(i.item),1),t("td",null,d(i.quantity),1),t("td",null,d(i.units),1),t("td",null,d(e.$commaSeparator(i.unit_cost))+" UGX",1),t("td",null,d(e.$commaSeparator(i.unit_cost*i.quantity))+" UGX",1),((_=e.$proposalStore.currentProposal)==null?void 0:_.status)=="EDITING"?(a(),r("td",K,[m(P,{icon:"delete",flat:"",color:"negative",onClick:c=>u.deleteItem(i.id)},null,8,["onClick"])])):y("",!0)])}),128)),t("tr",Y,[Z,t("th",tt,d(e.$commaSeparator(u.totalBudget))+" UGX",1),et])])]}),_:1})])}var ot=S(H,[["render",st],["__scopeId","data-v-34a02e97"]]);const at={name:"TeamEditor",data(){return{formData:{full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id,role:"PI"},formErrors:{},items:[],options:[{name:"PI",value:"PI"},{name:"Co PI",value:"Co PI"},{name:"MEMBER",value:"MEMBER"}]}},created(){this.init()},methods:{init(){this.getTeams()},getTeams(){this.$api.get(`teams/?proposal=${this.$route.params.proposal_id}`).then(e=>{this.items=e.data})},createTeam(){this.$api.post("teams/",this.formData).then(e=>{(e.status=201)&&(this.formErrors={},this.items.push(e.data),this.resetFormData(),this.$bus.emit("proposal-updated",!0))}).catch(e=>{this.formErrors=e.response.data,this.$utilsStore.setLoading(!1)})},deleteItem(e){confirm("Delete this team?")&&this.$api.delete(`teams/${e}`).then(s=>{s.status==204&&(this.init(),this.$bus.emit("proposal-updated",!0))})},resetFormData(){this.formData={full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id}}}},rt=t("th",{align:"left"},"Full Name",-1),lt=t("th",{align:"left"},"Email",-1),it=t("th",{align:"left"},"Telephone",-1),nt=t("th",{align:"left"},"Role",-1),dt={key:0,align:"left"},ut={key:0,class:"q-tr--no-hover"},pt={class:"text-red"},mt={class:"q-ma-xs"},ct={class:"text-red"},ht={class:"q-ma-xs"},_t={class:"text-red"},ft={class:"q-ma-xs"},gt=["value"],yt={key:0};function $t(e,s,n,D,o,u){return a(),r("div",null,[m(x,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>{var h,p,i,_,c;return[t("thead",null,[t("tr",null,[rt,lt,it,nt,((h=e.$proposalStore.currentProposal)==null?void 0:h.status)=="EDITING"?(a(),r("th",dt," Actions ")):y("",!0)])]),t("tbody",null,[((p=e.$proposalStore.currentProposal)==null?void 0:p.status)=="EDITING"&&o.items.length<5?(a(),r("tr",ut,[t("td",null,[v(t("input",{"onUpdate:modelValue":s[0]||(s[0]=l=>o.formData.full_name=l),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.full_name]]),t("div",pt,[t("ul",mt,[(a(!0),r(f,null,g((i=o.formErrors)==null?void 0:i.full_name,l=>(a(),r("li",{key:l},d(l),1))),128))])])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[1]||(s[1]=l=>o.formData.email=l),style:{display:"block",width:"100%"},type:"email"},null,512),[[b,o.formData.email]]),t("div",ct,[t("ul",ht,[(a(!0),r(f,null,g((_=o.formErrors)==null?void 0:_.email,l=>(a(),r("li",{key:l},d(l),1))),128))])])]),t("td",null,[v(t("input",{"onUpdate:modelValue":s[2]||(s[2]=l=>o.formData.telephone=l),style:{display:"block",width:"100%"},type:"text"},null,512),[[b,o.formData.telephone]]),t("div",_t,[t("ul",ft,[(a(!0),r(f,null,g((c=o.formErrors)==null?void 0:c.telephone,l=>(a(),r("li",{key:l},d(l),1))),128))])])]),t("td",null,[v(t("select",{"onUpdate:modelValue":s[3]||(s[3]=l=>o.formData.role=l)},[(a(!0),r(f,null,g(o.options,l=>(a(),r("option",{key:l.name,value:l.name},d(l.value),9,gt))),128))],512),[[C,o.formData.role]])]),t("td",null,[t("button",{onClick:s[4]||(s[4]=(...l)=>u.createTeam&&u.createTeam(...l))},"Add")])])):y("",!0),(a(!0),r(f,null,g(o.items,l=>{var I;return a(),r("tr",{class:"q-tr--no-hover",key:l.id},[t("td",null,d(l.full_name),1),t("td",null,d(l.email),1),t("td",null,d(l.telephone),1),t("td",null,d(l.role),1),((I=e.$proposalStore.currentProposal)==null?void 0:I.status)=="EDITING"?(a(),r("td",yt,[m(P,{icon:"delete",flat:"",color:"negative",onClick:E=>u.deleteItem(l.id)},null,8,["onClick"])])):y("",!0)])}),128))])]}),_:1})])}var vt=S(at,[["render",$t]]);const Dt={name:"SectionEditor2",props:{proposal:{type:Object,required:!0},section:{type:Object,required:!0}},data(){return{loading:!1,showDialog:!1,formData:{}}},computed:{numWords(){return this.countWordsInHtml(this.formData[this.section.name]||"")}},methods:{updateSection(){this.$api.patch(`proposals/${this.$route.params.proposal_id}/`,this.formData).then(e=>{this.$emit("proposal-updated",e.data),this.$bus.emit("proposal-updated",e.data)})},countWordsInHtml(e){return M.load(e)("body").text().split(/\s+/).length-1}},mounted(){this.formData[this.section.name]=this.proposal[this.section.name]||""},watch:{proposal(e){this.formData[this.section.name]=e[this.section.name]||""}}},bt={key:0},kt={class:"scroll"},It={class:"text-caption text-grey-8",align:"right"},qt={key:0,class:"text-red text-caption"},St={key:1,class:"text-right"};function Tt(e,s,n,D,o,u){var h,p;return((h=n.proposal)==null?void 0:h.status)=="EDITING"&&e.$authStore.currentUser.id==((p=n.proposal)==null?void 0:p.user)?(a(),r("div",bt,[m(A,{onSubmit:u.updateSection,class:"q-gutter-md"},{default:$(()=>[t("div",kt,[m(V,{modelValue:o.formData[n.section.name],"onUpdate:modelValue":s[0]||(s[0]=i=>o.formData[n.section.name]=i),label:"Title of your proposal",outlined:"",required:"","min-height":"30vh",onBlur:u.updateSection},null,8,["modelValue","onBlur"]),t("div",It,[u.numWords>n.section.word_limit?(a(),r("small",qt," Exceeded word limit ("+d(u.numWords)+"/"+d(n.section.word_limit)+") ",1)):(a(),r("div",St," Number of Words ("+d(u.numWords)+"/"+d(n.section.word_limit)+") ",1))])])]),_:1},8,["onSubmit"])])):y("",!0)}var Et=S(Dt,[["render",Tt]]);const xt={name:"AttachmentEditor",data(){return{formData:{full_name:"",email:"",telephone:"",proposal:this.$route.params.proposal_id},attachments:[]}},created(){this.init()},methods:{init(){this.getAttachments()},getAttachments(){this.$api.get("attachments/").then(e=>{this.attachments=e.data,this.getFiles()})},getFiles(){for(let e=0;e<this.attachments.length;e++){const s=this.attachments[e];this.$api.get(`files/?proposal_id=${this.$route.params.proposal_id}&attachment_id=${s.id}`).then(n=>{var D=n.data;this.attachments.filter(o=>o.id==s.id)[0].files=D,e==this.attachments.length-1&&this.$bus.emit("attachments-updated",this.validateAttachments())})}},validateAttachments(){var e;for(let s=0;s<this.attachments.length;s++){const n=this.attachments[s];if(console.log(n.is_required),((e=n==null?void 0:n.files)==null?void 0:e.length)==0&&n.is_required)return!1}return!0},deleteFile(e){confirm("Delete this File?")&&this.$api.delete(`files/${e}/`).then(s=>{s.status==204&&this.getFiles()})},openFile(e){window.open(e)}}},wt=t("thead",null,[t("tr",null,[t("th",{align:"left"},"Title"),t("th",{align:"left",colspan:"2"},"Files")])],-1),Pt={key:0,class:"text-red"},Ut={class:"flex"};function Ft(e,s,n,D,o,u){const h=q("proposal-file-attachment");return a(),r("div",null,[m(x,{class:"q-my-sm",flat:"",bordered:""},{default:$(()=>[wt,t("tbody",null,[(a(!0),r(f,null,g(o.attachments,p=>(a(),r("tr",{key:p.id},[t("td",null,[Q(d(p.title)+" ",1),p.is_required?(a(),r("span",Pt,"*")):y("",!0)]),t("td",null,[t("div",Ut,[(a(!0),r(f,null,g(p.files,i=>(a(),T(W,{dense:"",key:i.id,class:"glossy",icon:"attachment",label:i.name,removable:e.$userHasAnyGroups(["applicant"])&&e.$authStore.currentUser.id==e.$proposalStore.currentProposal.user&&e.$proposalStore.currentProposal.status=="EDITING",clickable:"",onRemove:_=>u.deleteFile(i.id),onClick:_=>u.openFile(i.file)},null,8,["label","removable","onRemove","onClick"]))),128))])]),t("td",null,[m(h,{attachment_id:p.id,onFileUploaded:s[0]||(s[0]=i=>u.getFiles())},null,8,["attachment_id"])])]))),128))])]),_:1})])}var Bt=S(xt,[["render",Ft]]);const Ct={components:{budgeteditor:ot,teameditor:vt,sectioneditor2:Et,attachmentseditor:Bt},data(){return{sections:[],proposal:{},score:null,content:`
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`}},created(){this.getProposal(),this.getSections()},methods:{getProposal(){this.$api.get(`proposals/${this.$route.params.proposal_id}/`).then(e=>{this.proposal=e.data,this.$proposalStore.setProposal(this.proposal),this.getScore()})},getScore(){var e;this.$api.get(`scores/?user=${((e=this.$authStore.currentUser)==null?void 0:e.id)||0}&proposal=${this.$route.params.proposal_id}`).then(s=>{s.data.length==1&&(this.score=s.data[0])})},getSections(){this.$api.get("sections/").then(e=>{this.sections=e.data})}}},Qt={class:"q-pa-sm"},Nt=["id"],Gt={class:"q-pa-sm"},Vt={class:"flex"},At={class:"bg-grey-0"},Mt={class:"text-caption text-grey-8"},Wt={class:"q-pt-sm"},Ht={key:0},Lt={key:1},Rt={key:2},Xt={key:3},jt=["innerHTML"],Ot=t("hr",{id:"solution",class:"section-separator"},null,-1);function zt(e,s,n,D,o,u){const h=q("budgeteditor"),p=q("teameditor"),i=q("attachmentseditor"),_=q("sectioneditor2");return a(),r("div",Qt,[(a(!0),r(f,null,g(o.sections,c=>{var l,I;return a(),r("div",{key:c.id},[t("hr",{id:c.name,class:"section-separator"},null,8,Nt),t("div",Gt,[m(U,{class:"flex justify-between"},{default:$(()=>[t("div",Vt,d(c.title),1)]),_:2},1024),((l=e.$proposalStore.currentProposal)==null?void 0:l.status)=="EDITING"?(a(),T(w,{key:0,class:"flex no-wrap q-pa-sm",flat:"",bordered:""},{default:$(()=>[m(N,{size:"md",class:"q-pr-sm",name:"info_outline"}),t("div",At,[t("small",Mt,d(c.description),1)])]),_:2},1024)):y("",!0),t("div",Wt,[c.ref=="#summary_budget"?(a(),r("div",Ht,[m(h)])):c.ref=="#team"?(a(),r("div",Lt,[m(p)])):c.ref=="#attachments"?(a(),r("div",Rt,[m(i)])):(a(),r("div",Xt,[((I=e.$proposalStore.currentProposal)==null?void 0:I.status)=="EDITING"?(a(),T(_,{key:0,proposal:o.proposal,section:c,onProposalUpdated:s[0]||(s[0]=E=>{o.proposal=E,e.$proposalStore.setProposal(E)})},null,8,["proposal","section"])):(a(),T(w,{key:1,class:"my-card",flat:"",bordered:""},{default:$(()=>[m(G,null,{default:$(()=>[t("div",{innerHTML:o.proposal[c.name]},null,8,jt)]),_:2},1024)]),_:2},1024))]))])])])}),128)),Ot])}var ye=S(Ct,[["render",zt]]);export{ye as default};
