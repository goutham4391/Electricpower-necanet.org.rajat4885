document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector('[data-sf-role="login-status-button"]');if(e&&e.addEventListener("click",function(){return"true"===document.querySelector('[data-sf-role="sf-allow-windows-sts-login"]').value.toLowerCase()?location.href="?stsLogin=true":location.href=document.querySelector('[data-sf-role="sf-login-redirect-url"]').value||"#",!1}),"true"!==document.querySelector('[data-sf-role="sf-is-design-mode-value"]').value.toLowerCase()){var r=new XMLHttpRequest;r.open("GET",document.querySelector('[data-sf-role="sf-status-json-endpoint-url"]').value),r.onload=function(){if(200===r.status){var e=JSON.parse(r.responseText);if(e&&e.IsLoggedIn){var t=document.querySelector('[data-sf-role="sf-logged-in-view"]'),o=t.querySelector('[data-sf-role="sf-logged-in-avatar"]');o&&(o.setAttribute("src",e.AvatarImageUrl),o.setAttribute("alt",e.DisplayName)),t.querySelector('[data-sf-role="sf-logged-in-name"]').innerHTML=e.DisplayName;var a=t.querySelector('[data-sf-role="sf-logged-in-email"]');a&&(a.innerHTML=e.Email),t.style.display="block"}else document.querySelector('[data-sf-role="sf-logged-out-view"]').style.display="block"}},r.setRequestHeader("Cache-Control","no-cache, no-store, must-revalidate"),r.setRequestHeader("Pragma","no-cache"),r.setRequestHeader("Expires","0"),r.send()}else document.querySelector('[data-sf-role="sf-logged-out-view"]').style.display="block"});
//# sourceMappingURL=login-status.min.js.map