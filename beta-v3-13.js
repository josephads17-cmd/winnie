const baseScript=document.createElement('script');
baseScript.src='beta-v3-12.js?v=mobile-recap-edit-fix-4';
baseScript.onload=()=>{
  function isMobile(){return window.matchMedia('(max-width: 640px)').matches}

  function applyMobileLayout(){
    const mobile=isMobile();
    const validation=document.querySelector('.validation-step');
    const steps=document.querySelector('.steps');
    if(validation)validation.style.display=mobile?'none':'';
    if(steps)steps.style.gridTemplateColumns=mobile?'repeat(3,1fr)':'';
  }

  function scrollToElement(element,extra=12){
    if(!element)return;
    const nav=document.querySelector('.nav');
    const offset=(nav?nav.offsetHeight:0)+extra;
    const top=element.getBoundingClientRect().top+window.scrollY-offset;
    window.scrollTo({top,behavior:'smooth'});
  }

  function activateConfiguratorStep(stepNumber){
    document.querySelectorAll('.screen').forEach(screen=>{
      screen.classList.toggle('active',Number(screen.dataset.screen)===stepNumber);
    });
    document.querySelectorAll('.step').forEach(step=>{
      step.classList.toggle('active',Number(step.dataset.s)===stepNumber);
    });
    requestAnimationFrame(()=>scrollToElement(document.querySelector('.panel'),18));
  }

  applyMobileLayout();
  window.addEventListener('resize',applyMobileLayout);

  const originalGo=window.go;

  window.showRecap=function(){
    if(isMobile()){
      document.querySelectorAll('.screen').forEach(screen=>screen.classList.remove('active'));
      document.querySelectorAll('.step').forEach(step=>step.classList.remove('active'));
      requestAnimationFrame(()=>scrollToElement(document.querySelector('.cart'),12));
      return;
    }
    originalGo(4);
  };

  window.returnToConfigurator=function(){
    activateConfiguratorStep(3);
  };

  window.go=function(n){
    if(n===4&&isMobile()){
      window.showRecap();
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

  window.render();
};
document.head.appendChild(baseScript);