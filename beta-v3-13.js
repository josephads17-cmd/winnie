const baseScript=document.createElement('script');
baseScript.src='beta-v3-12.js?v=mobile-recap-fix';
baseScript.onload=()=>{
  window.showRecap=function(){
    const isMobile=window.matchMedia('(max-width: 640px)').matches;
    if(isMobile){
      document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.step').forEach(x=>x.classList.remove('active'));
      requestAnimationFrame(()=>{
        const cart=document.querySelector('.cart');
        if(!cart)return;
        const nav=document.querySelector('.nav');
        const offset=(nav?nav.offsetHeight:0)+12;
        const top=cart.getBoundingClientRect().top+window.scrollY-offset;
        window.scrollTo({top,behavior:'smooth'});
      });
      return;
    }
    go(4);
  };

  const originalGo=window.go;
  window.go=function(n){
    if(n===4 && window.matchMedia('(max-width: 640px)').matches){
      showRecap();
      return;
    }
    originalGo(n);
  };

  const originalRender=window.render;
  window.render=function(){
    originalRender();
    const cta=document.getElementById('mobileOrderCta');
    if(cta)cta.textContent='Commander la box de '+st.name;
  };
  render();
};
document.head.appendChild(baseScript);