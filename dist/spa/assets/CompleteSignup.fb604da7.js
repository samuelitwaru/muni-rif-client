import{Q as i}from"./QInput.d21a7e16.js";import{Q as f}from"./QSelect.ce14d8d4.js";import{_ as c,r as n,o as h,h as _,a as r,w as u,g as l,j as g}from"./index.542c6195.js";import{Q as w}from"./QForm.1332b4b2.js";import{Q as q}from"./QCard.afc089a4.js";import"./use-key-composition.13c30634.js";import"./use-dark.3250c496.js";import"./use-split-attrs.44f15fb2.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.94504a9c.js";import"./QChip.91c2f2a3.js";import"./QItem.419ce596.js";import"./QItemLabel.d3c0ae79.js";import"./QMenu.349a7bd2.js";import"./selection.8c192d65.js";import"./use-timeout.04e0df1e.js";import"./focusout.e24870b5.js";import"./use-transition.566a6544.js";import"./scroll.652ffd25.js";import"./QDialog.ccae1525.js";import"./use-prevent-scroll.f7d9b58d.js";import"./format.3e32b8d9.js";const V={data(){return{loading:!1,faculties:[],departments:[],qualifications:[],user:null,formData:{token:this.$route.params.token,first_name:"",last_name:"",phone:"",gender:"",designation:"",faculty:null,department:null,qualification:null,password:"",confirm_password:""},emailRules:[e=>!!e||"Email is required",e=>/.+@.+\..+/.test(e)||"Email must be valid"],nameRules:[e=>!!e||"Field is required"],phoneRules:[e=>!!e||"Telephone number is required",e=>/^[0-9]{10}$/.test(e)||"Telephone number must be 10 digits"],passwordRules:[e=>!!e||"Password is required",e=>e.length>=8||"Password must be at least 8 characters long"],confirmPasswordRules:[e=>!!e||"Confirm Password is required",e=>e===this.formData.password||"Passwords do not match"],errorResponse:{}}},created(){this.getFaculties(),this.getQualifications(),this.getUser()},methods:{getUser(){this.$api.get(`users/get-user-by-token/${this.$route.params.token}`).then(e=>{this.user=e.data,this.setFormData()})},completeSignup(){this.$utilsStore.setLoading(!0),this.$api.post("accounts/complete-signup/",this.formData).then(e=>{const o=e.data.token,a=e.data.user;this.$authStore.setUserAndToken(a,o),this.$utilsStore.setLoading(!1),this.$router.push("/proposal-reviews")}).catch(e=>{this.$utilsStore.setLoading(!1),this.errorResponse=e.response})},getFaculties(){this.$api.get("faculties/").then(e=>{this.faculties=e.data})},getQualifications(){this.$api.get("qualifications/").then(e=>{this.qualifications=e.data})},signUpWithGoogle(){},setFormData(){this.formData={token:this.$route.params.token,email:this.user.email,first_name:this.user.first_name,last_name:this.user.last_name,phone:this.user.profile.phone,gender:this.user.profile.gender,faculty:this.user.profile.faculty,department:this.user.profile.department,qualification:this.user.profile.qualification,password:"",confirm_password:""}}}},D={align:"center"},b=l("h2",{class:"text-h6"},"Complete Signup",-1),v={class:"row q-col-gutter-xs"},R={class:"col"},x={class:"col"},Q={class:"row q-col-gutter-xs"},U={class:"col-12"},k={class:"col-12"},S={class:"row q-col-gutter-xs"},y={class:"col"},F={class:"col"},C={class:"row q-col-gutter-xs q-mt-xs"},P={class:"col"},N={class:"col"},B={class:"flex flex-center"};function L(e,o,a,T,s,m){const d=n("error-message-modal"),p=n("radio-field");return h(),_("div",D,[r(d,{errorResponse:s.errorResponse},null,8,["errorResponse"]),r(q,{class:"q-ma-sm q-pa-md",style:{"max-width":"40rem"}},{default:u(()=>[b,r(w,{onSubmit:m.completeSignup},{default:u(()=>[l("div",v,[l("div",R,[r(i,{outlined:"",dense:"",modelValue:s.formData.first_name,"onUpdate:modelValue":o[0]||(o[0]=t=>s.formData.first_name=t),label:"First Name",rules:s.nameRules,required:""},null,8,["modelValue","rules"])]),l("div",x,[r(i,{outlined:"",dense:"",modelValue:s.formData.last_name,"onUpdate:modelValue":o[1]||(o[1]=t=>s.formData.last_name=t),label:"Last Name",rules:s.nameRules,required:""},null,8,["modelValue","rules"])])]),l("div",Q,[l("div",U,[r(i,{outlined:"",dense:"",modelValue:s.formData.phone,"onUpdate:modelValue":o[2]||(o[2]=t=>s.formData.phone=t),label:"Telephone Number",type:"tel",rules:s.phoneRules,required:""},null,8,["modelValue","rules"])]),l("div",k,[r(p,{align:"left",label:"Gender",onInput:o[3]||(o[3]=t=>s.formData.gender=t),modelValue:s.formData.gender,"onUpdate:modelValue":o[4]||(o[4]=t=>s.formData.gender=t),options:[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]},null,8,["modelValue"])])]),l("div",S,[l("div",y,[r(f,{dense:"",outlined:"",modelValue:s.formData.qualification,"onUpdate:modelValue":o[5]||(o[5]=t=>s.formData.qualification=t),options:s.qualifications,label:"Qualification","option-value":"id","option-label":"name","map-options":"","emit-value":""},null,8,["modelValue","options"])]),l("div",F,[r(i,{outlined:"",dense:"",modelValue:s.formData.designation,"onUpdate:modelValue":o[6]||(o[6]=t=>s.formData.designation=t),label:"Your Designation",required:""},null,8,["modelValue"])])]),l("div",C,[l("div",P,[r(i,{outlined:"",dense:"",modelValue:s.formData.password,"onUpdate:modelValue":o[7]||(o[7]=t=>s.formData.password=t),label:"Password",type:"password",rules:s.passwordRules,required:""},null,8,["modelValue","rules"])]),l("div",N,[r(i,{outlined:"",dense:"",modelValue:s.formData.confirm_password,"onUpdate:modelValue":o[8]||(o[8]=t=>s.formData.confirm_password=t),label:"Confirm Password",type:"password",rules:s.confirmPasswordRules,required:""},null,8,["modelValue","rules"])])]),l("div",B,[r(g,{type:"submit",color:"primary",label:"Continue"})])]),_:1},8,["onSubmit"])]),_:1})])}var ae=c(V,[["render",L]]);export{ae as default};