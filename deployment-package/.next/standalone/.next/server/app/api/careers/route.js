"use strict";(()=>{var e={};e.id=714,e.ids=[714],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2961:(e,t,n)=>{n.r(t),n.d(t,{headerHooks:()=>y,originalPathname:()=>v,patchFetch:()=>O,requestAsyncStorage:()=>p,routeModule:()=>g,serverHooks:()=>w,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>S});var i={};n.r(i),n.d(i,{POST:()=>f});var a=n(884),r=n(6132),s=n(1040),o=n(5798),u=n(2429);async function c(e,t){let n=process.env.DEEPSEEK_API_KEY||"sk-073e99ff73a14eacacedfefa2cbaf7bd",i=`
请分析以下简历内容，针对"${t}"岗位进行评估：

简历内容：
${e}

请按照以下JSON格式返回分析结果，确保返回的是有效的JSON：

{
  "skills": ["技能1", "技能2", "技能3"],
  "experience": "工作经验总结",
  "education": "教育背景总结", 
  "summary": "候选人整体评价",
  "score": 85,
  "suggestions": ["建议1", "建议2", "建议3"]
}

要求：
1. skills：提取候选人的关键技能，最多5个
2. experience：总结工作经验，2-3句话
3. education：总结教育背景，1-2句话
4. summary：对候选人的整体评价，2-3句话
5. score：综合评分（0-100分）
6. suggestions：改进建议，最多3个

请只返回JSON，不要包含其他文字。
`;try{let t=await fetch("https://api.deepseek.com/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"user",content:i}],temperature:.3,max_tokens:1e3})});if(!t.ok)throw Error(`Deepseek API error: ${t.status}`);let a=await t.json(),r=a.choices[0]?.message?.content;if(!r)throw Error("No content returned from Deepseek API");try{let e=JSON.parse(r);if(!e.skills||!e.experience||!e.summary||"number"!=typeof e.score)throw Error("Invalid response structure from Deepseek API");return e}catch(t){return{skills:l(e),experience:"需要进一步分析工作经验",education:"需要进一步分析教育背景",summary:"此简历需要人工审核分析",score:60,suggestions:["建议进行面试进一步了解","可以补充更多项目经验","建议优化简历格式"]}}}catch(t){return{skills:l(e),experience:"需要进一步分析工作经验",education:"需要进一步分析教育背景",summary:"API分析暂不可用，建议人工审核",score:60,suggestions:["建议进行人工审核","可以进行电话沟通","考虑安排面试"]}}}function l(e){let t=["Python","JavaScript","Java","React","Vue","Node.js","SQL","MongoDB","AWS","Docker","Kubernetes","Git","Linux","Machine Learning","AI","数据分析","项目管理","团队协作","沟通能力","领导力"].filter(t=>e.toLowerCase().includes(t.toLowerCase()));return t.slice(0,5)}async function d(e,t,n,i,a){let r=process.env.WECHAT_WEBHOOK_URL;if(!r)return!1;let s=new Date().toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o=`📄 收到新简历投递
👤 姓名：${e}
📧 邮箱：${t}
💼 岗位：${n}
📎 简历：${i}
💬 留言：${a||"无"}
⏰ 时间：${s}
---
请及时查看邮箱获取简历附件`;try{let e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({msgtype:"text",text:{content:o}})});if(e.ok)return!0;return!1}catch(e){return!1}}async function m(e,t,n,i,a){let r=process.env.SERVER_CHAN_KEY;if(!r)return!1;let s=new Date().toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),o=`📄 收到新简历投递 - ${e}`,u=`## 简历投递详情

**👤 姓名：** ${e}

**📧 邮箱：** ${t}

**💼 岗位：** ${n}

**📎 简历：** ${i}

**💬 留言：** ${a||"无"}

**⏰ 时间：** ${s}

---

请及时查看邮箱获取简历附件`;try{let e=await fetch(`https://sctapi.ftqq.com/${r}.send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:o,desp:u})});if(!e.ok)return!1;{let t=await e.json();if(0===t.code)return!0;return!1}}catch(e){return!1}}async function f(e){try{let t=await e.formData(),i=t.get("name"),a=t.get("email"),r=t.get("position"),s=t.get("message")||"",l=t.get("resume");if(!(l instanceof File))return o.Z.json({error:"请上传简历文件"},{status:400});new Date().toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});let f=await (0,u.saveResume)({name:i,email:a,position:r,message:s,resumeFileName:l.name});await (0,u.saveResumeFile)(l,f.id);let g=`姓名: ${i}
邮箱: ${a}
申请岗位: ${r}
自我介绍: ${s}
简历文件: ${l.name}`;c(g,r).then(e=>{let{updateResume:t}=n(2429);t(f.id,{aiAnalysis:{...e,analyzedAt:new Date().toISOString()},resumeContent:g})}).catch(e=>{});let p=await d(i,a,r,l.name,s),h=p;p||(h=await m(i,a,r,l.name,s));let w="简历投递成功！";return h?w+="已发送微信通知。":w+="通知发送可能有延迟。",w+="我们会尽快与您联系。AI分析正在后台进行中。",o.Z.json({success:!0,message:w,resumeId:f.id})}catch(e){return o.Z.json({error:"提交失败，请稍后重试"},{status:500})}}let g=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/careers/route",pathname:"/api/careers",filename:"route",bundlePath:"app/api/careers/route"},resolvedPagePath:"/Users/freeninglu/Desktop/paw-therapeutics-website-main /app/api/careers/route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:p,staticGenerationAsyncStorage:h,serverHooks:w,headerHooks:y,staticGenerationBailout:S}=g,v="/api/careers/route";function O(){return(0,s.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:h})}},2429:(e,t,n)=>{n.r(t),n.d(t,{getAllContacts:()=>y,getAllInterviews:()=>k,getAllResumes:()=>m,getContactById:()=>O,getContactStats:()=>A,getInterviewById:()=>x,getInterviewStats:()=>C,getResumeById:()=>p,getResumeFilePath:()=>w,getResumeStats:()=>$,saveContact:()=>S,saveInterviewData:()=>I,saveResume:()=>f,saveResumeFile:()=>h,updateContact:()=>v,updateInterview:()=>N,updateResume:()=>g});var i=n(7147),a=n(1017),r=n.n(a);let s=r().join(process.cwd(),"data"),o=r().join(s,"resumes.json"),u=r().join(s,"contacts.json"),c=r().join(s,"interviews.json"),l=r().join(s,"uploads");async function d(){try{await i.promises.mkdir(s,{recursive:!0}),await i.promises.mkdir(l,{recursive:!0})}catch(e){}}async function m(){try{await d();let e=await i.promises.readFile(o,"utf-8");return JSON.parse(e)}catch(e){return[]}}async function f(e){await d();let t=await m(),n={...e,id:j(),submittedAt:new Date().toISOString(),status:"new"};return t.push(n),await i.promises.writeFile(o,JSON.stringify(t,null,2)),n}async function g(e,t){let n=await m(),a=n.findIndex(t=>t.id===e);return -1===a?null:(n[a]={...n[a],...t},await i.promises.writeFile(o,JSON.stringify(n,null,2)),n[a])}async function p(e){let t=await m();return t.find(t=>t.id===e)||null}async function h(e,t){await d();let n=r().extname(e.name),a=`${t}${n}`,s=r().join(l,a),o=await e.arrayBuffer();return await i.promises.writeFile(s,Buffer.from(o)),a}function w(e){return r().join(l,e)}async function y(){try{await d();let e=await i.promises.readFile(u,"utf-8");return JSON.parse(e)}catch(e){return[]}}async function S(e){await d();let t=await y(),n={...e,id:j(),submittedAt:new Date().toISOString(),status:"new"};return t.unshift(n),await i.promises.writeFile(u,JSON.stringify(t,null,2)),n}async function v(e,t){let n=await y(),a=n.findIndex(t=>t.id===e);return -1===a?null:(n[a]={...n[a],...t},await i.promises.writeFile(u,JSON.stringify(n,null,2)),n[a])}async function O(e){let t=await y();return t.find(t=>t.id===e)||null}async function A(){let e=await y();return{total:e.length,new:e.filter(e=>"new"===e.status).length,read:e.filter(e=>"read"===e.status).length,replied:e.filter(e=>"replied"===e.status).length,archived:e.filter(e=>"archived"===e.status).length}}function j(){return Math.random().toString(36).substr(2,15)}async function $(){let e=await m();return{total:e.length,new:e.filter(e=>"new"===e.status).length,reviewed:e.filter(e=>"reviewed"===e.status).length,contacted:e.filter(e=>"contacted"===e.status).length,rejected:e.filter(e=>"rejected"===e.status).length,analyzed:e.filter(e=>e.aiAnalysis).length}}async function k(){try{await d();let e=await i.promises.readFile(c,"utf-8");return JSON.parse(e)}catch(e){return[]}}async function I(e){let t=await k(),n={...e,id:j(),status:"new"};return t.push(n),await i.promises.writeFile(c,JSON.stringify(t,null,2)),n}async function N(e,t){let n=await k(),a=n.findIndex(t=>t.id===e);return -1===a?null:(n[a]={...n[a],...t},await d(),await i.promises.writeFile(c,JSON.stringify(n,null,2)),n[a])}async function x(e){let t=await k();return t.find(t=>t.id===e)||null}async function C(){let e=await k(),t=e.length,n=e.filter(e=>"new"===e.status).length,i=e.filter(e=>"reviewed"===e.status).length,a=e.filter(e=>"contacted"===e.status).length,r=e.map(e=>e.evaluation.overallScore).filter(e=>e>0),s=r.length>0?Math.round(r.reduce((e,t)=>e+t,0)/r.length):0,o=e.filter(e=>"recommended"===e.evaluation.recommendation).length,u=e.filter(e=>"consider"===e.evaluation.recommendation).length,c=e.filter(e=>"not_recommended"===e.evaluation.recommendation).length;return{total:t,new:n,reviewed:i,contacted:a,rejected:e.filter(e=>"rejected"===e.status).length,averageScore:s,recommendations:{recommended:o,consider:u,notRecommended:c}}}}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),i=t.X(0,[271,107],()=>n(2961));module.exports=i})();