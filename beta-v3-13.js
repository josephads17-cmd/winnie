const baseScript=document.createElement('script');
baseScript.src='beta-v3-12.js?v=mobile-recap-fix-3';
baseScript.onload=()=>{
  let lastConfiguratorStep=3;

  function applyMobileLayout(){
    const mobile=window.matchMedia('(max-width: 640px)').matches;
    const validation=document.querySelector('.validation-step');
    const steps=document.querySelector('.steps');
    if(validation)validation.style.display=mobile?'none':'';
    if(steps)steps.style.gridTemplateColumns=mobile?'repeat(3,1fr)':'';
  }

  applyMobileLayout();
  window.addEventListener('resize',applyMobileLayout);

  const originalGo=window.go;

  window.showRecap=function(){
    const isMobile=window.matchMedia('(max-width: 640px)').matches;
    if(isMobile){
      const activeScreen=document.querySelector('.screen.active');
      if(activeScreen){
        const current=Number(activeScreen.dataset.screen);
        if(current>=1&&current<=3)lastConfiguratorStep=current;
      }
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
    originalGo(4);
  };

  window.returnToConfigurator=function(){
    const target=(lastConfiguratorStep>=1&&lastConfiguratorStep<=3)?lastConfiguratorStep:3;
    originalGo(target);
  };

  const orderCta=document.getElementById('mobileOrderCta');
  if(orderCta&&!document.getElementById('mobileEditCta')){
    const editCta=document.createElement('button');
    editCta.type='button';
    editCta.id='mobileEditCta';
    editCta.className='btn secondary mobile-order-cta';
    editCta.textContent='Modifier ma box';
    editCta.addEventListener('click',returnToConfigurator);
    orderCta.parentNode.insertBefore(editCta,orderCta);
  }

  window.go=function(n){
    if(n===4 && window.matchMedia('(max-width: 640px)').matches){
      showRecap();
      return;
    }
    if(n>=1&&n<=3)lastConfiguratorStep=n;
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
