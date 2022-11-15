import{p as w}from"../index/index.cb4e3169.js";import{g as M}from"../article/article.65566d00.js";import{L as N}from"../index/index.54111b5a.js";import{_ as O}from"../../assets/index.5936d80b.js";import{E as D}from"../element-plus/element-plus.84ae470c.js";import{F as R,e as $,p as S,Z as p,_ as e,u as k,al as o,an as j,o as l,a as m,a4 as i,a2 as s,$ as P,a3 as c,c as u,ad as A,R as h}from"../@vue/@vue.5df607be.js";import"../pinia/pinia.eea93de0.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.2bb44a28.js";import"../form-data/form-data.b6b8e2ae.js";import"../geotiff/geotiff.85f1a328.js";import"../vue-router/vue-router.3963f1f9.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../fuse.js/fuse.js.8cd4e865.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../screenfull/screenfull.55a5d770.js";import"../vue-i18n/vue-i18n.6da1d588.js";import"../@intlify/@intlify.4679f647.js";import"../mitt/mitt.fcf4f812.js";import"../lodash-es/lodash-es.67cc1c54.js";import"../@element-plus/@element-plus.40532030.js";import"../@amap/@amap.99378080.js";import"../@vueuse/@vueuse.5679a659.js";import"../qs/qs.8188ecf6.js";import"../side-channel/side-channel.c76b9d93.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.4790b089.js";import"../object-inspect/object-inspect.2ea46dc0.js";import"../nprogress/nprogress.47a88857.js";/* empty css                                 */import"../clipboard/clipboard.37ebffe6.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.e51dc1a1.js";import"../vite-plugin-mock/vite-plugin-mock.ee99d99a.js";import"../mockjs/mockjs.7f7b19f3.js";import"../@popperjs/@popperjs.882fb711.js";import"../@ctrl/@ctrl.d3543c5e.js";import"../dayjs/dayjs.5b7a14e9.js";import"../async-validator/async-validator.d831b986.js";import"../memoize-one/memoize-one.9d6ffe8a.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.636a88c9.js";import"../@floating-ui/@floating-ui.0e2d76f6.js";import"../vue/vue.94571519.js";import"../lodash-unified/lodash-unified.4e0b778c.js";const Q={class:"section-container"},Z={key:1},q={key:1},G=R({name:"EditTable"}),H=Object.assign(G,{setup(J){const v=$(null),f=$(!0),I=S({page:1,limit:10}),y=n=>({published:"success",draft:"info",deleted:"danger"})[n],L=async()=>{f.value=!0;const{data:n}=await M(I),b=n.items;v.value=b.map(_=>({..._,edit:!1,originalTitle:_.title})),f.value=!1},x=n=>{n.title=n.originalTitle,n.edit=!1,D({message:"The title has been restored to the original value",type:"warning"})},C=n=>{n.edit=!1,n.originalTitle=n.title,D({message:"The title has been edited",type:"success"})};return L(),(n,b)=>{const _=o("el-divider"),d=o("el-table-column"),T=o("svg-icon"),V=o("el-tag"),E=o("el-input"),z=o("el-button"),g=o("vxe-button"),B=o("el-table"),r=o("vxe-column"),U=o("vxe-table"),F=j("loading");return l(),p(k(N),{title:"\u53EF\u7F16\u8F91\u8868\u683C"},{body:e(()=>[m("div",Q,[i(_,{"content-position":"left"},{default:e(()=>[s("Element Plus Table")]),_:1}),P((l(),p(B,{data:v.value,border:"",fit:"","highlight-current-row":"",style:{width:"100%"}},{default:e(()=>[i(d,{align:"center",label:"ID",width:"65"},{default:e(({row:t})=>[m("span",null,c(t.id),1)]),_:1}),i(d,{width:"180px",align:"center",label:"Date"},{default:e(({row:t})=>[m("span",null,c(k(w)(t.timestamp,"{y}-{m}-{d} {h}:{i}")),1)]),_:1}),i(d,{width:"110px",align:"center",label:"Author"},{default:e(({row:t})=>[m("span",null,c(t.author),1)]),_:1}),i(d,{width:"100px",label:"Importance"},{default:e(({row:t})=>[(l(!0),u(h,null,A(t.importance,a=>(l(),p(T,{key:a,"icon-class":"star",class:"icon-star"}))),128))]),_:1}),i(d,{align:"center",label:"Readings",width:"95"},{default:e(({row:t})=>[m("span",null,c(t.pageviews),1)]),_:1}),i(d,{"class-name":"status-col",label:"Status",width:"110"},{default:e(({row:t})=>[i(V,{type:y(t.status)},{default:e(()=>[s(c(t.status),1)]),_:2},1032,["type"])]),_:1}),i(d,{"min-width":"300px",label:"Title"},{default:e(({row:t})=>[t.edit?(l(),u(h,{key:0},[i(E,{modelValue:t.title,"onUpdate:modelValue":a=>t.title=a,class:"edit-input",size:"small"},null,8,["modelValue","onUpdate:modelValue"]),i(z,{class:"cancel-btn",size:"small",type:"warning",onClick:a=>x(t)},{default:e(()=>[s(" cancel ")]),_:2},1032,["onClick"])],64)):(l(),u("span",Z,c(t.title),1))]),_:1}),i(d,{align:"center",label:"Actions",width:"120"},{default:e(({row:t})=>[t.edit?(l(),p(g,{key:0,size:"mini",status:"success",icon:"el-icon-circle-check-outline",onClick:a=>C(t)},{default:e(()=>[s("Ok")]),_:2},1032,["onClick"])):(l(),p(g,{key:1,size:"mini",status:"primary",icon:"el-icon-circle-check-outline",onClick:a=>t.edit=!t.edit},{default:e(()=>[s("Edit")]),_:2},1032,["onClick"]))]),_:1})]),_:1},8,["data"])),[[F,f.value]]),i(_,{"content-position":"left"},{default:e(()=>[s("Vxe Table")]),_:1}),i(U,{round:"",border:"",data:v.value,loading:f.value,style:{width:"100%"}},{default:e(()=>[i(r,{align:"center",field:"id",title:"ID",width:"65"}),i(r,{align:"center",field:"timestamp",title:"Date",width:"180px"},{default:e(({row:t})=>[m("span",null,c(k(w)(t.timestamp,"{y}-{m}-{d} {h}:{i}")),1)]),_:1}),i(r,{align:"center",field:"author",title:"Author",width:"110px"}),i(r,{width:"100px",title:"Importance"},{default:e(({row:t})=>[(l(!0),u(h,null,A(t.importance,a=>(l(),p(T,{key:a,"icon-class":"star",class:"icon-star"}))),128))]),_:1}),i(r,{align:"center",title:"Readings",width:"95"},{default:e(({row:t})=>[m("span",null,c(t.pageviews),1)]),_:1}),i(r,{"class-name":"status-col",label:"Status",width:"110"},{default:e(({row:t})=>[i(V,{type:y(t.status)},{default:e(()=>[s(c(t.status),1)]),_:2},1032,["type"])]),_:1}),i(r,{"min-width":"300px",title:"Title"},{default:e(({row:t})=>[t.edit?(l(),u(h,{key:0},[i(E,{modelValue:t.title,"onUpdate:modelValue":a=>t.title=a,class:"edit-input",size:"small"},null,8,["modelValue","onUpdate:modelValue"]),i(z,{class:"cancel-btn",size:"small",type:"warning",onClick:a=>x(t)},{default:e(()=>[s(" cancel ")]),_:2},1032,["onClick"])],64)):(l(),u("span",q,c(t.title),1))]),_:1}),i(r,{align:"center",title:"Actions",width:"120"},{default:e(({row:t})=>[t.edit?(l(),p(g,{key:0,size:"mini",status:"success",icon:"el-icon-circle-check-outline",onClick:a=>C(t)},{default:e(()=>[s("Ok")]),_:2},1032,["onClick"])):(l(),p(g,{key:1,size:"mini",status:"primary",icon:"el-icon-circle-check-outline",onClick:a=>t.edit=!t.edit},{default:e(()=>[s("Edit")]),_:2},1032,["onClick"]))]),_:1})]),_:1},8,["data","loading"])])]),_:1})}}}),Qt=O(H,[["__scopeId","data-v-7ee72d99"]]);export{Qt as default};
