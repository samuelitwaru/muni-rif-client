import{Q as T}from"./QToolbarTitle.3cc2e02b.js";import{_ as U,o as n,h as d,a as l,j as y,w as s,g as o,f as g,F as b,i as k,c as Q,t as f,u as w,s as C,r as V}from"./index.542c6195.js";import{Q as S}from"./QMarkupTable.131caeae.js";import{Q as _}from"./QCardSection.2e3c7736.js";import{Q as D}from"./QSeparator.d1f4a56a.js";import{Q as F}from"./QItemLabel.d3c0ae79.js";import{Q as R,a as v}from"./QItem.419ce596.js";import{Q as A}from"./QList.39042cc1.js";import{Q as B}from"./QUploader.5a0f8807.js";import{Q as q}from"./QChip.91c2f2a3.js";import{Q as x}from"./QCard.afc089a4.js";import{Q as I}from"./QDialog.ccae1525.js";import"./use-dark.3250c496.js";import"./QCircularProgress.81b1c16a.js";import"./format.3e32b8d9.js";import"./use-file.f2235cec.js";import"./use-prevent-scroll.f7d9b58d.js";import"./scroll.652ffd25.js";import"./use-timeout.04e0df1e.js";import"./focusout.e24870b5.js";import"./focus-manager.b507780d.js";import"./use-transition.566a6544.js";const P={name:"FileUploader",props:["uploadUrl","multiple","formData"],data(){return{modalVisible:!1,uploadHeaders:{},filesToUpload:[],uploadedFiles:[]}},methods:{onFileAdded(e){e.forEach(t=>{this.uploadFile(t)}),this.filesToUpload=[...this.filesToUpload,...e]},onBrowse(e){var t=Array.from(e.target.files);console.log(t),this.onFileAdded(t)},uploadFile(e){const t=new FormData;t.append("file",e);for(const a in this.formData)this.formData.hasOwnProperty(a)&&t.append(a,this.formData[a]);t.append("name",e.name),t.append("attachment",this.attachment_id),t.append("proposal",this.$route.params.proposal_id),this.$api.post(this.uploadUrl,t,{headers:this.uploadHeaders}).then(a=>{this.uploadedFiles.push(e),this.filesToUpload=this.filesToUpload.filter(m=>m.key!=e.key),console.log(e),console.log(this.filesToUpload),this.uploadedFiles=[],this.modalVisible=!1,this.$emit("file-uploaded")}).catch(a=>{console.log(a)})}}},N={key:0},L=o("div",{class:"text-h6"},"Attachments",-1),E=o("div",{class:"text-center q-my-auto q-py-lg",style:{"background-color":"#ffffff",color:"#000000"}}," Drag and drop files here ",-1),G={class:"text-center",style:{"background-color":"#ffffff",color:"#000000"}},H=o("br",null,null,-1),z=o("br",null,null,-1),j=["multiple"],M=o("label",{for:"files",class:"button-label"}," Browse ",-1);function O(e,t,a,m,p,u){var c,i;return((c=e.$proposalStore.currentProposal)==null?void 0:c.status)=="EDITING"&&e.$authStore.currentUser.id==((i=e.$proposalStore.currentProposal)==null?void 0:i.user)?(n(),d("div",N,[l(y,{color:"primary",icon:"attachment",label:"Add",dense:"",flat:"",onClick:t[0]||(t[0]=r=>p.modalVisible=!0)}),l(I,{modelValue:p.modalVisible,"onUpdate:modelValue":t[3]||(t[3]=r=>p.modalVisible=r)},{default:s(()=>[l(x,{style:{width:"400px"}},{default:s(()=>[l(_,{class:"q-pa-sm text-center"},{default:s(()=>[L]),_:1}),l(D,{spaced:""}),l(_,{class:"q-pa-sm"},{default:s(()=>[o("div",null,[l(B,{url:a.uploadUrl,multiple:a.multiple,onAdded:u.onFileAdded,style:{width:"100%"}},{header:s(()=>[E,o("div",G,[g(" or "),H,z,o("input",{onChange:t[1]||(t[1]=(...r)=>u.onBrowse&&u.onBrowse(...r)),type:"file",id:"files",class:"hidden",multiple:a.multiple},null,40,j),M])]),list:s(()=>[l(A,{separator:""},{default:s(()=>[(n(!0),d(b,null,k(p.filesToUpload,r=>(n(),Q(R,{key:r.__key},{default:s(()=>[l(v,null,{default:s(()=>[l(F,{class:"full-width ellipsis"},{default:s(()=>[g(f(r.name),1)]),_:2},1024),l(F,{caption:""},{default:s(()=>[g(f(r.__sizeLabel)+" / "+f(r.__progressLabel),1)]),_:2},1024)]),_:2},1024),l(v,{top:"",side:""},{default:s(()=>[l(w,{size:"20px",color:"primary"})]),_:1})]),_:2},1024))),128))]),_:1})]),_:1},8,["url","multiple","onAdded"])])]),_:1}),l(_,{class:"q-pa-sm"},{default:s(()=>[(n(!0),d(b,null,k(p.uploadedFiles,r=>(n(),Q(q,{dense:"",key:r.__key,class:"glossy",icon:"check",label:r.name},null,8,["label"]))),128))]),_:1}),l(D,{spaced:""}),l(_,{align:"right"},{default:s(()=>[l(y,{color:"primary",label:"Done",onClick:t[2]||(t[2]=r=>{p.uploadedFiles=[],p.modalVisible=!1})})]),_:1})]),_:1})]),_:1},8,["modelValue"])])):C("",!0)}var J=U(P,[["render",O]]);const K={components:{FileUploader:J},data(){return{reportingDates:[],loading:!1}},created(){this.getReportingDates()},methods:{getReportingDates(){this.$api.get("reporting-dates/").then(e=>{this.reportingDates=e.data,this.getReports()})},getReports(){for(let e=0;e<this.reportingDates.length;e++){const t=this.reportingDates[e];this.$api.get(`reports/?proposal_id=${this.$route.params.proposal_id}&reporting_date_id=${t.id}`).then(a=>{var m=a.data;console.log(t.title+">>"+m),this.reportingDates.filter(p=>p.id==t.id)[0].files=m})}},deleteFile(e){confirm("Delete this Report?")&&this.$api.delete(`reports/${e}/`).then(t=>{this.getReports()})},openFile(e){window.open(e)}}},W={class:"q-pa-md"},X=o("thead",null,[o("tr",null,[o("th",{align:"left"},"Title"),o("th",{align:"left"},"Deadline"),o("th",{align:"left"},"Reports")])],-1),Y={key:0,class:"flex"};function Z(e,t,a,m,p,u){const c=V("FileUploader");return n(),d("div",null,[o("div",W,[l(T,null,{default:s(()=>[g("Reports")]),_:1}),l(S,{class:"q-my-sm",flat:"",bordered:""},{default:s(()=>[X,o("tbody",null,[(n(!0),d(b,null,k(p.reportingDates,i=>{var r;return n(),d("tr",{key:i.id},[o("td",null,f(i.title),1),o("td",null,f(i.date),1),o("td",null,[(r=i==null?void 0:i.files)!=null&&r.length?(n(),d("div",Y,[(n(!0),d(b,null,k(i.files,h=>(n(),d("div",{key:h.id},[l(y,{color:"primary",flat:"",icon:"book",label:h.title,removable:e.$userHasAnyGroups(["applicant"])&&e.$authStore.currentUser.id==e.$proposalStore.currentProposal.user&&e.$proposalStore.currentProposal.status=="EDITING",onClick:$=>u.openFile(h.file)},null,8,["label","removable","onClick"]),l(y,{color:"primary",flat:"",icon:"close",onClick:$=>u.deleteFile(h.id)},null,8,["onClick"])]))),128))])):(n(),Q(c,{key:1,multiple:!1,uploadUrl:"reports/",formData:{title:i.title,proposal:e.$proposalStore.currentProposal.id,reporting_date:i.id},onFileUploaded:u.getReports},null,8,["formData","onFileUploaded"]))])])}),128))])]),_:1})])])}var De=U(K,[["render",Z]]);export{De as default};
