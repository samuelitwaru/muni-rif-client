import{Q as i}from"./QInput.d21a7e16.js";import{Q as r}from"./QSelect.ce14d8d4.js";import{_ as h,r as n,o as V,h as D,a as t,w as m,g as a,j as d,f as b}from"./index.542c6195.js";import{Q as p}from"./QSeparator.d1f4a56a.js";import{Q as w}from"./QForm.1332b4b2.js";import{Q as v}from"./QCard.afc089a4.js";import"./use-key-composition.13c30634.js";import"./use-dark.3250c496.js";import"./use-split-attrs.44f15fb2.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.94504a9c.js";import"./QChip.91c2f2a3.js";import"./QItem.419ce596.js";import"./QItemLabel.d3c0ae79.js";import"./QMenu.349a7bd2.js";import"./selection.8c192d65.js";import"./use-timeout.04e0df1e.js";import"./focusout.e24870b5.js";import"./use-transition.566a6544.js";import"./scroll.652ffd25.js";import"./QDialog.ccae1525.js";import"./use-prevent-scroll.f7d9b58d.js";import"./format.3e32b8d9.js";const q={data(){return{loading:!1,faculties:[],departments:[],qualifications:[],formData:{email:"",first_name:"",last_name:"",phone:"",gender:"",designation:"",faculty:null,department:null,qualification:null,password:"",confirm_password:""},emailRules:[o=>!!o||"Email is required",o=>/.+@.+\..+/.test(o)||"Email must be valid"],nameRules:[o=>!!o||"Field is required"],phoneRules:[o=>!!o||"Telephone number is required",o=>/^[0-9]{10}$/.test(o)||"Telephone number must be 10 digits"],passwordRules:[o=>!!o||"Password is required",o=>o.length>=8||"Password must be at least 8 characters long"],confirmPasswordRules:[o=>!!o||"Confirm Password is required",o=>o===this.formData.password||"Passwords do not match"],errorResponse:{}}},created(){this.getFaculties(),this.getQualifications()},methods:{signup(){this.$utilsStore.setLoading(!0),this.formData.username=this.formData.email,this.$api.post("accounts/signup/",this.formData).then(o=>{this.$utilsStore.setLoading(!1),this.$router.push("/index/account/signin")}).catch(o=>{this.$utilsStore.setLoading(!1),this.errorResponse=o.response})},getFaculties(){this.$api.get("faculties/").then(o=>{this.faculties=o.data})},getQualifications(){this.$api.get("qualifications/").then(o=>{this.qualifications=o.data})},signUpWithGoogle(){},setFormData(){this.formData={email:"samuel@gmail.com",first_name:"Samuel",last_name:"Itwaru",phone:"0781902516",gender:"Male",designation:"",faculty:null,department:null,qualification:null,password:"bratz123",confirm_password:"bratz123"}}}},y={align:"center"},R=a("h2",{class:"text-h6"},"Signup",-1),x={class:"row q-col-gutter-xs"},Q={class:"col"},U={class:"col"},S={class:"row q-col-gutter-xs"},F={class:"col"},P={class:"col"},N={class:"row q-col-gutter-xs q-my-sm"},C={class:"col"},k={class:"col"},B={class:"row q-col-gutter-xs"},E={class:"col"},L={class:"col"},T={class:"flex flex-center q-mb-sm"},I={align:"center",class:"flex justify-between"},M={class:"col"},j=a("span",{class:"col"},"or",-1),z={class:"col"};function G(o,s,A,W,e,f){const c=n("error-message-modal"),_=n("radio-field"),g=n("router-link");return V(),D("div",y,[t(c,{errorResponse:e.errorResponse},null,8,["errorResponse"]),t(v,{class:"q-pa-md",style:{"max-width":"40rem"}},{default:m(()=>[R,t(w,{onSubmit:f.signup},{default:m(()=>{var u;return[a("div",x,[a("div",Q,[t(i,{outlined:"",dense:"",modelValue:e.formData.first_name,"onUpdate:modelValue":s[0]||(s[0]=l=>e.formData.first_name=l),label:"First Name",rules:e.nameRules,required:""},null,8,["modelValue","rules"])]),a("div",U,[t(i,{outlined:"",dense:"",modelValue:e.formData.last_name,"onUpdate:modelValue":s[1]||(s[1]=l=>e.formData.last_name=l),label:"Last Name",rules:e.nameRules,required:""},null,8,["modelValue","rules"])])]),a("div",S,[a("div",F,[t(i,{outlined:"",dense:"",modelValue:e.formData.email,"onUpdate:modelValue":s[2]||(s[2]=l=>e.formData.email=l),label:"Email",type:"email",rules:e.emailRules,required:""},null,8,["modelValue","rules"])]),a("div",P,[t(i,{outlined:"",dense:"",modelValue:e.formData.phone,"onUpdate:modelValue":s[3]||(s[3]=l=>e.formData.phone=l),label:"Telephone Number",type:"tel",rules:e.phoneRules,required:""},null,8,["modelValue","rules"])])]),t(_,{align:"left",label:"Gender",onInput:s[4]||(s[4]=l=>e.formData.gender=l),modelValue:e.formData.gender,"onUpdate:modelValue":s[5]||(s[5]=l=>e.formData.gender=l),options:[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]},null,8,["modelValue"]),a("div",N,[a("div",C,[t(r,{outlined:"",dense:"",modelValue:e.formData.faculty,"onUpdate:modelValue":s[6]||(s[6]=l=>e.formData.faculty=l),options:e.faculties,"option-value":"id","option-label":"name",label:"Faculty","emit-value":"","map-options":""},null,8,["modelValue","options"])]),a("div",k,[t(r,{outlined:"",dense:"",modelValue:e.formData.department,"onUpdate:modelValue":s[7]||(s[7]=l=>e.formData.department=l),options:(u=this.faculties.find(l=>l.id===this.formData.faculty))==null?void 0:u.departments,"option-value":"id","option-label":"name",label:"Department","emit-value":"","map-options":""},null,8,["modelValue","options"])])]),a("div",B,[a("div",E,[t(r,{dense:"",outlined:"",modelValue:e.formData.qualification,"onUpdate:modelValue":s[8]||(s[8]=l=>e.formData.qualification=l),options:e.qualifications,label:"Qualification","option-value":"id","option-label":"name","map-options":"","emit-value":""},null,8,["modelValue","options"])]),a("div",L,[t(i,{outlined:"",dense:"",modelValue:e.formData.designation,"onUpdate:modelValue":s[9]||(s[9]=l=>e.formData.designation=l),label:"Your Designation",rules:e.nameRules,required:""},null,8,["modelValue","rules"])])]),t(i,{outlined:"",dense:"",modelValue:e.formData.password,"onUpdate:modelValue":s[10]||(s[10]=l=>e.formData.password=l),label:"Password",type:"password",rules:e.passwordRules,required:""},null,8,["modelValue","rules"]),t(i,{outlined:"",dense:"",modelValue:e.formData.confirm_password,"onUpdate:modelValue":s[11]||(s[11]=l=>e.formData.confirm_password=l),label:"Confirm Password",type:"password",rules:e.confirmPasswordRules,required:""},null,8,["modelValue","rules"]),a("div",T,[t(d,{type:"submit",color:"primary",label:"Sign Up"})]),a("div",I,[a("div",M,[t(p,{spaced:""})]),j,a("div",z,[t(p,{spaced:""})])]),b(" Already have an account? "),t(g,{to:"/index/account/signin"},{default:m(()=>[t(d,{type:"submit",flat:"",color:"primary",label:"Sign in"})]),_:1})]}),_:1},8,["onSubmit"])]),_:1})])}var ge=h(q,[["render",G]]);export{ge as default};
