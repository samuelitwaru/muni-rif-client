import{Q as l}from"./QInput.21ead741.js";import{_ as i,o as m,j as p,f as a,w as d,i as r,t as u,l as w}from"./index.3ceec1d0.js";import{Q as c}from"./QForm.568aa704.js";import{Q as f}from"./QCard.6a05c192.js";import"./use-key-composition.be73f6ad.js";import"./use-dark.cdc1981a.js";import"./use-split-attrs.9038d558.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.6d2fe591.js";const _={data(){return{loading:!1,errorResponse:null,formData:{old_password:"",new_password:"",confirm_password:""},formErrors:{old_password:"",new_password:"",confirm_password:""},passwordRules:[s=>!!s||"Password is required",s=>s.length>=8||"Password must be at least 8 characters long"],confirmPasswordRules:[s=>!!s||"Confirm Password is required",s=>s===this.formData.new_password||"Passwords do not match"]}},methods:{changePassword(){this.formErrors={},this.$utilsStore.setLoading(!0),this.$api.post("accounts/change-password/",this.formData).then(s=>{this.$utilsStore.setLoading(!1),this.$router.push("/account/profile"),window.location.reload()}).catch(s=>{this.$utilsStore.setLoading(!1),this.errorResponse=s.response,this.formErrors.old_password=this.errorResponse.data.detail})}}},h={align:"center"},g=r("h4",{class:"text-h6 q-my-sm"},"Change Password",-1),P={class:"text-caption text-red"},q={class:"row"},y={class:"col"},V={class:"col q-ml-sm"};function D(s,e,b,x,o,n){return m(),p("div",h,[g,a(f,{class:"my-card q-ma-sm q-pa-md",style:{"min-width":"20rem"}},{default:d(()=>[a(c,{onSubmit:n.changePassword},{default:d(()=>[r("div",null,[r("small",P,[r("strong",null,u(o.formErrors.old_password),1)])]),a(l,{modelValue:o.formData.old_password,"onUpdate:modelValue":e[0]||(e[0]=t=>o.formData.old_password=t),label:"Current Password",outlined:"",class:"q-my-sm",dense:"",type:"password",required:""},null,8,["modelValue"]),r("div",q,[r("div",y,[a(l,{modelValue:o.formData.new_password,"onUpdate:modelValue":e[1]||(e[1]=t=>o.formData.new_password=t),outlined:"",dense:"",class:"q-my-sm",label:"New Password",type:"password",rules:o.passwordRules,required:""},null,8,["modelValue","rules"])]),r("div",V,[a(l,{modelValue:o.formData.confirm_password,"onUpdate:modelValue":e[2]||(e[2]=t=>o.formData.confirm_password=t),label:"Confirm New Password",outlined:"",rules:o.confirmPasswordRules,dense:"",class:"q-my-sm",type:"password",required:""},null,8,["modelValue","rules"])])]),a(w,{class:"q-my-sm",type:"submit",color:"primary",label:"Change Password"})]),_:1},8,["onSubmit"])]),_:1})])}var k=i(_,[["render",D]]);export{k as default};
