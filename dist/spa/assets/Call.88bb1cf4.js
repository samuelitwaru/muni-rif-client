import{Q as y,a as p}from"./QBreadcrumbs.18ea6ff7.js";import{Q as C}from"./QPage.7c60fe9d.js";import{Q as D}from"./QInput.ab16fab6.js";import{_ as b,o as i,j as d,i as u,t as c,F as f,k as _,u as V,v as w,h as k,r as M,f as h,l as Y,e as S,w as v}from"./index.f337fba3.js";import"./use-key-composition.89769990.js";import"./use-dark.1793b84e.js";import"./use-split-attrs.26446f80.js";import"./uid.42677368.js";import"./focus-manager.b507780d.js";import"./use-form.e7940d77.js";const F={props:["selectedYear","selectedMonth","monthName","markedDates","selectedDates"],data(){const e=new Date().getFullYear();return new Date().getMonth(),{years:Array.from({length:21},(t,m)=>e-10+m),months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],calendar:[]}},methods:{updateCalendar(){const e=this.selectedYear,t=this.selectedMonth,m=new Date(e,t,1),s=new Date(e,t+1,0);let o=[],l=[];const n=m.getDay();if(n!==0){const r=new Date(e,t,0);for(let g=n-1;g>=0;g--)l.push({date:new Date(r.getFullYear(),r.getMonth(),r.getDate()-g),otherMonth:!0})}for(let r=1;r<=s.getDate();r++)l.length===7&&(o.push(l),l=[]),l.push({date:new Date(e,t,r),otherMonth:!1});const a=7-l.length;for(let r=1;r<=a;r++)l.push({date:new Date(e,t+1,r),otherMonth:!0});o.push(l),this.calendar=o},isMarked(e){return this.markedDates.some(t=>t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate())},isSelected(e){let t="";return{result:Object.entries(this.selectedDates).some(s=>(t=s[0],s[1].getFullYear()===e.getFullYear()&&s[1].getMonth()===e.getMonth()&&s[1].getDate()===e.getDate())),label:t}}},mounted(){this.updateCalendar()}},x={class:"month-year-picker"},N=u("div",{class:"controls"},null,-1),Q={class:"calendar"},U={colspan:"7"},B={key:0,class:"badge"},O={key:0};function T(e,t,m,s,o,l){return i(),d("div",x,[N,u("table",Q,[u("tbody",null,[u("tr",null,[u("th",U,c(m.monthName)+" "+c(m.selectedYear),1)]),u("tr",null,[(i(!0),d(f,null,_(o.weekDays,n=>(i(),d("th",{key:n},c(n),1))),128))]),(i(!0),d(f,null,_(o.calendar,n=>(i(),d("tr",{key:n[0]},[(i(!0),d(f,null,_(n,a=>(i(),d("td",{key:a.date,class:V({"other-month":a.otherMonth,marked:l.isSelected(a.date).result&&!a.otherMonth})},[l.isSelected(a.date).result&&!a.otherMonth?(i(),d("div",B,c(l.isSelected(a.date).label),1)):w("",!0),k(" "+c(a.date.getDate()),1)],2))),128))]))),128)),o.calendar.length==5?(i(),d("tr",O,[(i(!0),d(f,null,_(o.weekDays,n=>(i(),d("td",{key:n}))),128))])):w("",!0)])])])}var R=b(F,[["render",T]]);const E={components:{MonthView:R},data(){return{selectedDates:{Start:new Date(2025,0,2),Submission:new Date(2025,0,5),Review:new Date(2025,0,10),Selection:new Date(2025,0,15),End:new Date(2025,0,31)},formData:{title:"",date_from:"",submission_date:"",review_date:"",selection_date:"",date_to:""},calendarMonths:[],markedDates:[new Date(2025,0,5),new Date(2025,0,15)]}},created(){this.getCall()},methods:{getCall(){this.$api.get(`calls/${this.$route.params.call_id}/`).then(e=>{e.status==200&&(this.call=e.data,this.formData=e.data,this.formData.date_range={from:this.formData.date_from,to:this.formData.date_to},console.log(this.call),this.formData={title:this.call.title,date_from:this.call.date_from,submission_date:this.call.submission_date,review_date:this.call.review_date,selection_date:this.call.selection_date,date_to:this.call.date_to},this.validateDates())})},validateDates(){this.formData.date_from&&this.formData.date_to&&new Date(this.formData.date_from)>new Date(this.formData.date_to)&&(alert("Start Date cannot be later than Stop Date."),this.formData.date_to=""),this.formData.date_from&&this.formData.submission_date&&new Date(this.formData.submission_date)<new Date(this.formData.date_from)&&(alert("Submission Date cannot be before Start Date."),this.formData.submission_date=""),this.formData.submission_date&&this.formData.review_date&&new Date(this.formData.review_date)<new Date(this.formData.submission_date)&&(alert("Review Date cannot be before Submission Date."),this.formData.review_date=""),this.formData.review_date&&this.formData.selection_date&&new Date(this.formData.selection_date)<new Date(this.formData.review_date)&&(alert("Selection Date cannot be before Review Date."),this.formData.selection_date=""),this.formData.selection_date&&this.formData.date_to&&new Date(this.formData.date_to)<new Date(this.formData.selection_date)&&(alert("Stop Date cannot be before Selection Date."),this.formData.date_to=""),this.selectedDates={Start:new Date(this.formData.date_from)||null,Submission:new Date(this.formData.submission_date)||null,Review:new Date(this.formData.review_date)||null,Selection:new Date(this.formData.selection_date)||null,End:new Date(this.formData.date_to)||null},console.log(this.formData.date_to),this.generateCalendar()},generateCalendar(){if(!this.formData.date_from||!this.formData.date_to){this.calendarMonths=[];return}const e=new Date(this.formData.date_from),t=new Date(this.formData.date_to),m=[];for(let s=new Date(e.getFullYear(),e.getMonth(),1);s<=t;s.setMonth(s.getMonth()+1)){const o=new Date(s.getFullYear(),s.getMonth()+1,0).getDate(),l=[];for(let n=1;n<=o;n++){const a=new Date(s.getFullYear(),s.getMonth(),n);let r=null;this.formData.submission_date&&a.toISOString().split("T")[0]===this.formData.submission_date?r="Submission":this.formData.review_date&&a.toISOString().split("T")[0]===this.formData.review_date?r="Review":this.formData.selection_date&&a.toISOString().split("T")[0]===this.formData.selection_date&&(r="Selection"),l.push({date:n,event:r})}m.push({name:s.toLocaleString("default",{month:"long"}),month:s.getMonth(),year:s.getFullYear(),days:l})}this.calendarMonths=m},updateCall(){console.log(this.formData),this.$utilsStore.setLoading(!0),this.$api.put(`calls/${this.$route.params.call_id}/`,this.formData).then(e=>{e.status==200&&(this.call=e.data,this.$router.push("/calls/"),this.$utilsStore.setLoading(!1))})}}},I={class:"row q-gutter-sm"},L={class:"row q-gutter-sm"};function q(e,t,m,s,o,l){const n=M("MonthView");return i(),d("div",null,[u("div",I,[h(D,{modelValue:o.formData.title,"onUpdate:modelValue":t[0]||(t[0]=a=>o.formData.title=a),label:"Title of your call",outlined:"",required:""},null,8,["modelValue"]),h(D,{type:"date",label:"Start Date",outlined:"",modelValue:o.formData.date_from,"onUpdate:modelValue":t[1]||(t[1]=a=>o.formData.date_from=a),onChange:l.validateDates},null,8,["modelValue","onChange"]),h(D,{label:"Submission Date",type:"date",outlined:"",modelValue:o.formData.submission_date,"onUpdate:modelValue":t[2]||(t[2]=a=>o.formData.submission_date=a),onChange:l.validateDates},null,8,["modelValue","onChange"]),h(D,{label:"Review Date",outlined:"",type:"date",modelValue:o.formData.review_date,"onUpdate:modelValue":t[3]||(t[3]=a=>o.formData.review_date=a),onChange:l.validateDates},null,8,["modelValue","onChange"]),h(D,{label:"Selection Date",outlined:"",type:"date",modelValue:o.formData.selection_date,"onUpdate:modelValue":t[4]||(t[4]=a=>o.formData.selection_date=a),onChange:l.validateDates},null,8,["modelValue","onChange"]),h(D,{label:"End Date",type:"date",outlined:"",modelValue:o.formData.date_to,"onUpdate:modelValue":t[5]||(t[5]=a=>o.formData.date_to=a),onChange:l.validateDates},null,8,["modelValue","onChange"]),h(Y,{color:"primary",label:"Update",onClick:l.updateCall},null,8,["onClick"])]),u("div",L,[(i(!0),d(f,null,_(o.calendarMonths,a=>(i(),S(n,{key:a.name,selectedYear:a.year,selectedMonth:a.month,monthName:a.name,markedDates:o.markedDates,selectedDates:o.selectedDates},null,8,["selectedYear","selectedMonth","monthName","markedDates","selectedDates"]))),128))])])}var G=b(E,[["render",q]]);const A={name:"UpdateCall",components:{CalendarGrid2:G},data(){return{loading:!1,showDialog:!1,call:null}},computed:{},created(){this.getCall()},methods:{getCall(){this.$api.get(`calls/${this.$route.params.call_id}/`).then(e=>{e.status==200&&(this.call=e.data)})}},watch:{showPopup(e,t){this.showDialog=e},showDialog(e,t){this.$emit("showPopupChanged",e)}}},J={class:"q-my-md"};function P(e,t,m,s,o,l){const n=M("CalendarGrid2");return o.call?(i(),S(C,{key:0,padding:""},{default:v(()=>[u("div",J,[h(y,null,{default:v(()=>[h(p,{icon:"home",to:"/",label:"Home"}),h(p,{label:"Calls",to:"/calls",icon:"campaign"}),h(p,{label:o.call.title,icon:"campaign"},null,8,["label"])]),_:1})]),h(n)]),_:1})):w("",!0)}var ae=b(A,[["render",P]]);export{ae as default};
