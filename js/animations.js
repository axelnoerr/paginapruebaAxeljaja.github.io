/* Animaciones JS: menú móvil, header sólido, parallax y scroll reveal (IntersectionObserver) */
/* menú, header, parallax, reveal */
const hd=$("header"),bg=$("#burger"),lk=$("#links");
const setMenu=o=>{lk.classList.toggle("open",o);bg.setAttribute("aria-expanded",o)};
bg.onclick=()=>setMenu(!lk.classList.contains("open"));lk.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,px=$("#parallax");
addEventListener("scroll",()=>{hd.classList.toggle("solid",scrollY>60);if(!rm&&scrollY<innerHeight)px.style.translate=`0 ${scrollY*.15}px`},{passive:true});hd.classList.toggle("solid",scrollY>60);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
