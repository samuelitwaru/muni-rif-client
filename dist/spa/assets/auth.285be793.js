import{d as r}from"./index.542c6195.js";const s=r({id:"auth",state:()=>({user:JSON.parse(localStorage.getItem("user")),token:localStorage.getItem("token")}),getters:{isLoggedIn:e=>!!e.user,currentUser:e=>e.user,Usertoken:e=>e.token},actions:{setUserAndToken(e,t){this.user=e,localStorage.setItem("user",JSON.stringify(e)),this.token=t,localStorage.setItem("token",t)},clearUserAndToken(){this.user=null,this.token=null,localStorage.clear()}}});export{s as a};