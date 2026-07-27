(() => {
  if (window.__v332SocialProof) return;
    window.__v332SocialProof = true;

      const style = document.createElement("style");
        style.textContent = `
            .v332-guarantee-strip{display:flex;align-items:center;gap:14px;max-width:760px;margin:8px auto 32px;padding:16px 22px;background:#fff;border:1px solid rgba(111,64,50,.14);border-radius:18px;}
                .v332-guarantee-icon{width:42px;height:42px;border-radius:50%;background:#e6efe3;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
                    .v332-guarantee-strip p{margin:0;font-size:.9rem;color:#6f4032;line-height:1.45;}
                        .v332-guarantee-strip strong{color:#341e17;}
                            @media (max-width:600px){.v332-guarantee-strip{margin:8px 20px 28px;padding:14px 16px;}}
                                @media (max-width: 767px) {
                                      #avis .proof-grid { display: flex !important; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 10px; scrollbar-width: none; }
                                            #avis .proof-grid::-webkit-scrollbar { display: none; }
                                                  #avis .proof-grid .proof { flex: 0 0 84%; scroll-snap-align: center; }
                                                      }
                                                        `;
                                                          document.head.appendChild(style);

                                                            const insertGuarantee = () => {
                                                                if (document.getElementById("garantie")) return;
                                                                    const preuves = document.getElementById("preuves");
                                                                        if (!preuves) return;
                                                                            const strip = document.createElement("div");
                                                                                strip.className = "v332-guarantee-strip";
                                                                                    strip.id = "garantie";
                                                                                        strip.setAttribute("role", "note");
                                                                                            strip.innerHTML = `<span class="v332-guarantee-icon" aria-hidden="true">🐇</span><p><strong>Une fleur ne plaît pas à votre lapin ?</strong> Sur votre 1ère commande, remboursement intégral sous 14 jours. Ensuite, avoir de 5,90 € ou sachet ajouté à votre prochain envoi si vous êtes abonné.</p>`;
                                                                                                preuves.insertAdjacentElement("afterend", strip);
                                                                                                  };

                                                                                                    const addGuaranteeBadge = () => {
                                                                                                        const track = document.querySelector(".v324-trust-track");
                                                                                                            if (!track || track.querySelector(".v332-guarantee-badge")) return;
                                                                                                                const item = document.createElement("div");
                                                                                                                    item.className = "v324-trust-item v332-guarantee-badge";
                                                                                                                        item.innerHTML = `<span aria-hidden="true">🐇</span><strong>Remboursé si votre lapin n’aime pas (1ère commande)</strong>`;
                                                                                                                            track.appendChild(item);
                                                                                                                              };
                                                                                                                              
                                                                                                                                const reorder = () => {
                                                                                                                                    const hero = document.querySelector(".hero");
                                                                                                                                        const preuves = document.getElementById("preuves");
                                                                                                                                            const garantie = document.getElementById("garantie");
                                                                                                                                                const avis = document.getElementById("avis");
                                                                                                                                                    if (!hero || !preuves || !garantie || !avis) return;
                                                                                                                                                        if (hero.nextElementSibling !== preuves) hero.insertAdjacentElement("afterend", preuves);
                                                                                                                                                            if (preuves.nextElementSibling !== garantie) preuves.insertAdjacentElement("afterend", garantie);
                                                                                                                                                                if (garantie.nextElementSibling !== avis) garantie.insertAdjacentElement("afterend", avis);
                                                                                                                                                                  };
                                                                                                                                                                  
                                                                                                                                                                    const apply = () => {
                                                                                                                                                                        insertGuarantee();
                                                                                                                                                                            addGuaranteeBadge();
                                                                                                                                                                                reorder();
                                                                                                                                                                                  };
                                                                                                                                                                                  
                                                                                                                                                                                    const scheduleApply = () => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(apply)));
                                                                                                                                                                                    
                                                                                                                                                                                      const currentRender = window.render;
                                                                                                                                                                                        if (typeof currentRender === "function" && !currentRender.__v332Wrapped) {
                                                                                                                                                                                            const wrappedRender = function renderV332SocialProof(...args) {
                                                                                                                                                                                                  const result = currentRender.apply(this, args);
                                                                                                                                                                                                        scheduleApply();
                                                                                                                                                                                                              return result;
                                                                                                                                                                                                                  };
                                                                                                                                                                                                                      wrappedRender.__v332Wrapped = true;
                                                                                                                                                                                                                          window.render = wrappedRender;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            
                                                                                                                                                                                                                              document.addEventListener("DOMContentLoaded", scheduleApply);
                                                                                                                                                                                                                                window.addEventListener("load", scheduleApply);
                                                                                                                                                                                                                                  window.addEventListener("pageshow", scheduleApply);
                                                                                                                                                                                                                                    window.addEventListener("resize", scheduleApply);
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                      apply();
                                                                                                                                                                                                                                        scheduleApply();
                                                                                                                                                                                                                                        })();
                                                                                                                                                                                                                                        
