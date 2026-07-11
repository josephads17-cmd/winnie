const baseScript=document.createElement('script');
baseScript.src='beta-v3-12.js';
baseScript.onload=()=>{
  const originalGo=go;
  go=function(n){
    const isMobile=window.matchMedia('(max-width: 640px)').matches;
    if(n===4&&isMobile){
      requestAnimationFrame(()=>{
        const cart=document.querySelector('.cart');
        if(!cart)return;
        const nav=document.querySelector('.nav');
        const offset=(nav?nav.offsetHeight:0)+18;
        window.scrollTo({top:cart.getBoundingClientRect().top+window.scrollY-offset,behavior:'smooth'});
      });
      return;
    }
    originalGo(n);
  };
  const originalRender=render;
  render=function(){
    originalRender();
    const cta=document.getElementById('mobileOrderCta');
    if(cta)cta.textContent='Commander la box de '+st.name;
  };
  render();
};
document.head.appendChild(baseScript);