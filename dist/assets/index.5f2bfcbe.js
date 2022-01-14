import{S as x,W as j,P as M,a as P,V as l,b as S,T as W,R as v}from"./vendor.2769e11f.js";import{OrbitControls as C}from"https://threejs.org/examples/jsm/controls/OrbitControls.js";import{Water as F}from"https://threejs.org/examples/jsm/objects/Water.js";import{Sky as L}from"https://threejs.org/examples/jsm/objects/Sky.js";const R=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}};R();function O(d){const o=a(),s=f(d),i=p(),t=w();h();const r=g();y();function a(){return new x}function f(e){const n=new j;return n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),e.appendChild(n.domElement),n}function p(){const e=new M(55,window.innerWidth/window.innerHeight,1,2e4);return e.position.set(30,30,100),e}function w(){const e=new L;return e.scale.setScalar(1e4),o.add(e),e}function h(){const e=new P(s),n=new l,c=Math.PI*(.500005-.5),u=2*Math.PI*(.205-.5);return n.x=Math.cos(u),n.y=Math.sin(u)*Math.sin(c),n.z=Math.sin(u)*Math.cos(c),t.material.uniforms.sunPosition.value.copy(n),o.environment=e.fromScene(t).texture,n}function g(){const e=new S(1e4,1e4),n=new F(e,{textureWidth:512,textureHeight:512,waterNormals:new W().load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg",function(c){c.wrapS=c.wrapT=v}),alpha:1,sunDirection:new l,sunColor:16777215,waterColor:4227277,distortionScale:3.7,fog:o.fog!==void 0});return n.rotation.x=-Math.PI/2,o.add(n),n.material.uniforms,n}function y(){const e=new C(i,s.domElement);return e.maxPolarAngle=Math.PI*.495,e.target.set(0,10,0),e.minDistance=40,e.maxDistance=200,e.update(),e}this.update=function(){r.material.uniforms.time.value+=.5/60,performance.now()*.001,s.render(o,i)};function b(){i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}window.addEventListener("resize",b)}const E=document.getElementById("canvas"),I=new O(E);function m(){requestAnimationFrame(m),I.update()}m();
