const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const P={truck:'<path d="M1 6h13v10H1zM14 9h5l3 3v4h-8"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/>',boxes:'<path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8"/>',pkg:'<path d="M21 8l-9-5-9 5 9 5zM3 8v8l9 5 9-5V8M12 13v8"/>',map:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',leaf:'<path d="M17 8C8 10 6 16 4 20M20 4c0 9-5 14-13 14 0-8 5-14 13-14z"/>',recycle:'<path d="M7 19H4l3-5M17 5h3l-3 5M12 3l3 5H9zM4 19h10M20 5H10"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',heart:'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2 4.5 4.5 0 0 1 8 2c0 6-8 11-8 11z"/>'};
const icon=n=>`<div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${P[n]||P.truck}</svg></div>`;
const wa=t=>`https://wa.me/${CONFIG.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(t)}`;
const ph=(o,i)=>`<div class="ph" style="--h:${110+i*14}">${o.img?`<img src="${esc(o.img)}" alt="${esc(o.alt||o.name)}" loading="lazy">`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">${P.truck}</svg><small>Foto provisional</small>`}</div>`;
/* marca y textos */
document.title=CONFIG.name+" · Transporte y Logística";
const brand=`<span class="logo">${CONFIG.logo?`<img src="${esc(CONFIG.logo)}" alt="">`:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 6h13v10H1zM14 9h5l3 3v4h-8"/></svg>`}</span>${esc(CONFIG.name)}`;
$("#brand").innerHTML=brand;$("#fbrand").innerHTML=brand;$("#fbrand .logo").style.cssText="";
document.querySelectorAll("[data-t]").forEach(e=>e.textContent=CONFIG.t[e.dataset.t]);
$(".hero h1").textContent=CONFIG.slogan;
$("#links").innerHTML=CONFIG.nav.map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join("")+`<li><a class="btn" href="#contacto">Contáctanos</a></li>`;
$("#flinks").innerHTML=CONFIG.nav.map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join("");
$("#mv").innerHTML=CONFIG.about.map(([t,x])=>`<div><span class="todo">Provisional</span><h3>${t}</h3><p>${x}</p></div>`).join("");
const cards=(a,rv)=>a.map(([i,t,d],k)=>`<article class="card rv" style="transition-delay:${k*70}ms">${icon(i)}<h3>${t}</h3>${d?`<p>${d}</p>`:""}</article>`).join("");
$("#services").innerHTML=cards(CONFIG.services);$("#env").innerHTML=cards(CONFIG.env);$("#adv").innerHTML=cards(CONFIG.adv);
$("#fserv").innerHTML=CONFIG.services.map(s=>`<li><a href="#servicios">${s[1]}</a></li>`).join("");
$("#s").innerHTML=`<option value="">Selecciona…</option>`+CONFIG.services.map(s=>`<option>${s[1]}</option>`).join("");
/* contacto */
const waLink=wa(CONFIG.waMessage);$("#waMain").href=waLink;$("#fab").href=waLink;
const ci=[];if(CONFIG.phone)ci.push(`Tel: <a href="tel:${esc(CONFIG.phone)}">${esc(CONFIG.phone)}</a>`);if(CONFIG.email)ci.push(`<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>`);
ci.push(`<a href="${waLink}" target="_blank" rel="noopener">WhatsApp</a>`);CONFIG.socials.forEach(s=>ci.push(`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`));
$("#cinfo").innerHTML=ci.map(x=>`<li>${x}</li>`).join("");$("#fcont").innerHTML=$("#cinfo").innerHTML;
$("#copy").textContent=`© ${new Date().getFullYear()} ${CONFIG.name}. Todos los derechos reservados.`;
/* carruseles */
function carousel(root,html,onclick){
 root.innerHTML=`<div class="track">${html}</div><div class="ctl"><button class="arr" aria-label="Anterior">‹</button><div class="dots"></div><button class="arr" aria-label="Siguiente">›</button></div>`;
 const tr=$(".track",root),sl=[...tr.children],dots=$(".dots",root);
 dots.innerHTML=sl.map((_,i)=>`<button aria-label="Ir a ${i+1}"></button>`).join("");
 const go=i=>tr.scrollTo({left:sl[Math.max(0,Math.min(i,sl.length-1))].offsetLeft-tr.offsetLeft,behavior:"smooth"});
 const cur=()=>{let b=0,m=1e9;sl.forEach((s,i)=>{const d=Math.abs(s.offsetLeft-tr.offsetLeft-tr.scrollLeft);if(d<m){m=d;b=i}});return b};
 const upd=()=>{const c=cur();[...dots.children].forEach((d,i)=>d.classList.toggle("on",i===c))};
 tr.addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});upd();
 root.querySelectorAll(".arr")[0].onclick=()=>go(cur()-1);root.querySelectorAll(".arr")[1].onclick=()=>go(cur()+1);
 [...dots.children].forEach((d,i)=>d.onclick=()=>go(i));
 tr.addEventListener("keydown",e=>{if(e.key==="ArrowRight")go(cur()+1);if(e.key==="ArrowLeft")go(cur()-1)});tr.tabIndex=0;
 if(onclick)sl.forEach((s,i)=>{s.tabIndex=0;s.onclick=()=>onclick(i);s.onkeydown=e=>{if(e.key==="Enter")onclick(i)}});
}
carousel($("#fleet"),CONFIG.fleet.map((u,i)=>`<article class="slide">${ph(u,i)}<div class="body"><span class="tag">${esc(u.cat)}</span><h3>${esc(u.name)}</h3><p>${esc(u.desc)}</p>${u.cap?`<p><strong>${esc(u.cap)}</strong></p>`:""}<ul>${(u.specs||[]).map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div></article>`).join(""));
let li=0;const lb=$("#lb"),G=CONFIG.gallery;
const show=i=>{li=(i+G.length)%G.length;$("#lbbox").innerHTML=ph(G[li],li)};
carousel($("#gallery"),G.map((g,i)=>`<figure class="slide" style="margin:0" aria-label="${esc(g.alt)}">${ph(g,i)}</figure>`).join(""),i=>{show(i);lb.classList.add("open");$(".x",lb).focus()});
$(".x",lb).onclick=()=>lb.classList.remove("open");$(".p",lb).onclick=()=>show(li-1);$(".n",lb).onclick=()=>show(li+1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove("open")};
document.addEventListener("keydown",e=>{if(!lb.classList.contains("open"))return;if(e.key==="Escape")lb.classList.remove("open");if(e.key==="ArrowRight")show(li+1);if(e.key==="ArrowLeft")show(li-1)});
let sx=0;lb.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(li+(d<0?1:-1))});
/* formulario */
$("#form").addEventListener("submit",e=>{e.preventDefault();const f=e.target;let ok=true;
 const chk=(el,bad,msg)=>{el.nextElementSibling.textContent=bad?msg:"";if(bad)ok=false};
 chk(f.nombre,f.nombre.value.trim().length<2,"Escribe tu nombre.");chk(f.tel,f.tel.value.replace(/\D/g,"").length<8,"Teléfono no válido.");chk(f.mail,!/^\S+@\S+\.\S+$/.test(f.mail.value),"Correo no válido.");
 if(!ok)return;
 const t=`¡Hola! Quisiera información sobre sus servicios de transporte y logística.\nNombre: ${f.nombre.value}\nEmpresa: ${f.empresa.value||"-"}\nTeléfono: ${f.tel.value}\nCorreo: ${f.mail.value}\nServicio de interés: ${f.servicio.value||"-"}\nMensaje: ${f.msg.value||"-"}`;
 window.open(wa(t),"_blank","noopener");});
