const baseScript=document.createElement('script');
baseScript.src='beta-v3-12.js?v=product-images-2';
baseScript.onload=()=>{
  function isMobile(){return window.matchMedia('(max-width: 640px)').matches}

  const imageFiles=[
    'calendula.png','Rose.png','Bleuet.png','Mauve.png','Hibiscus blanc.png','Pétales de tournesol.png',
    'Plantain.png','Pissenlit.png','Framboisier.png','Fraisier.png','Ortie.png','Noisetier.png',
    'Courgette séchée.png','Carotte séchée.png','Fraise lyophilisée.png'
  ];
  products.forEach((product,index)=>{product.img='assets/products/'+encodeURIComponent(imageFiles[index]).replace(/%2F/g,'/')});

  const visualStyles=document.createElement('style');
  visualStyles.textContent=`
    .thumb{overflow:hidden;background:#fff;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}
    .thumb:hover{transform:scale(1.04);box-shadow:0 8px 20px rgba(52,30,23,.14)}
    .thumb img{display:block;width:100%;height:100%;object-fit:cover}
    .product-modal-image{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;margin:8px 0 18px;border:1px solid var(--border);border-radius:22px;background:#fff}
    .product-modal-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:-7px 0 6px;color:#8e5b48;font-size:13px;font-weight:800}
    @media(min-width:981px){.item{grid-template-columns:68px 1fr 126px 96px}.thumb{width:68px;height:68px}}
    @media(max-width:980px){.thumb{width:62px;height:62px}.item{grid-template-columns:62px 1fr}}
    @media(max-width:640px){.product-modal-image{aspect-ratio:4/3}.modalbox{padding:22px}.modalbox h3{font-size:28px}}
  `;
  document.head.appendChild(visualStyles);

  function imageMarkup(product){
    return `<img src="${product.img}" alt="${product.name} séché" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.style.background='${product.c}'">`;
  }

  window.rows=function(cat,id){
    $(id).innerHTML=products.map((p,i)=>({p,i})).filter(x=>x.p.cat===cat).map(({p,i})=>`
      <article class="item">
        <div class="thumbwrap">
          <div class="thumb" onclick="openInfo(${i})" role="button" tabindex="0" aria-label="Voir la fiche de ${p.name}">${imageMarkup(p)}</div>
          <button class="info" onclick="openInfo(${i})" aria-label="Informations sur ${p.name}">i</button>
        </div>
        <div><h4>${p.name}</h4><div class="meta">${p.w}</div><div class="price">${money(p.p)}</div></div>
        <select class="mode" onchange="modeP(${i},this.value)"><option value="unique" ${st.p[i].m==='unique'?'selected':''}>Livraison unique</option><option value="mensuel" ${st.p[i].m==='mensuel'?'selected':''}>Mensuel</option></select>
        <div class="qty"><button onclick="changeP(${i},-1)">−</button><span>${st.p[i].q}</span><button onclick="changeP(${i},1)">+</button></div>
      </article>`).join('');

    $(id).querySelectorAll('.thumb').forEach((thumb)=>{
      thumb.addEventListener('keydown',event=>{
        if(event.key==='Enter'||event.key===' '){event.preventDefault();thumb.click()}
      });
    });
  };

  const modalBox=document.querySelector('#infoModal .modalbox');
  let modalImage=document.getElementById('productModalImage');
  if(modalBox&&!modalImage){
    modalImage=document.createElement('img');
    modalImage.id='productModalImage';
    modalImage.className='product-modal-image';
    modalImage.alt='';
    const title=document.getElementById('infoTitle');
    modalBox.insertBefore(modalImage,title);

    const meta=document.createElement('div');
    meta.className='product-modal-meta';
    meta.innerHTML='<span id="productModalWeight"></span><strong id="productModalPrice"></strong>';
    title.insertAdjacentElement('afterend',meta);
  }

  const originalOpenInfo=window.openInfo;
  window.openInfo=function(i){
    originalOpenInfo(i);
    const product=products[i];
    const image=document.getElementById('productModalImage');
    if(image){
      image.style.display='block';
      image.src=product.img;
      image.alt=product.name+' séché';
      image.onerror=()=>{image.style.display='none'};
    }
    const weight=document.getElementById('productModalWeight');
    const price=document.getElementById('productModalPrice');
    if(weight)weight.textContent=product.w;
    if(price)price.textContent=money(product.p);
  };

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

  window.returnToConfigurator=function(){activateConfiguratorStep(3)};

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