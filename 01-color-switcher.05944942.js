!function(){var t,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");function n(){var t=document.body,e="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.style.backgroundColor=e}e.addEventListener("click",(function(){t=setInterval(n,1e3),e.disabled=!0})),a.addEventListener("click",(function(){clearInterval(t),e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.05944942.js.map
