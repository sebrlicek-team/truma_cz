/* No WordPress API, analytics, forms, or third-party runtime required. */
(()=>{
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const escapeHtml=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=new URL('../../',document.currentScript.src);
 const dialog=document.createElement('dialog');dialog.className='cz-modal';document.body.append(dialog);
 let returnFocus;
 function openModal(html){returnFocus=document.activeElement;dialog.innerHTML='<button class="cz-close" aria-label="Zavřít">×</button>'+html;$('.cz-close',dialog).addEventListener('click',()=>dialog.close());dialog.showModal();$('input, a, button:not(.cz-close)',dialog)?.focus();}
 dialog.addEventListener('close',()=>returnFocus?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 const menu=$$('.e-n-menu-item');
 function closeMenus(){menu.forEach(li=>{li.classList.remove('cz-open');$$('button[aria-expanded]',li).forEach(b=>b.setAttribute('aria-expanded','false'));});}
 menu.forEach(li=>{const title=$('.e-n-menu-title',li),content=$('.e-n-menu-content',li);if(!title||!content)return;title.addEventListener('click',e=>{if(e.target.closest('a'))return;e.preventDefault();const open=li.classList.contains('cz-open');closeMenus();if(!open){li.classList.add('cz-open');$('button',title)?.setAttribute('aria-expanded','true');}});});
 document.addEventListener('click',e=>{if(!e.target.closest('.e-n-menu-item'))closeMenus();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenus();});
 let searchData;
 async function search(){
  openModal('<h2>Vyhledávání produktů</h2><label for="cz-query">Název produktu nebo kategorie</label><input id="cz-query" type="search" placeholder="Např. Combi, Aventa, pojezdy…" autocomplete="off"><div class="cz-results" aria-live="polite">Načítání katalogu…</div>');
  const input=$('#cz-query',dialog),results=$('.cz-results',dialog);
  try{searchData??=await fetch(new URL('assets/truma-search.json',base)).then(r=>{if(!r.ok)throw Error();return r.json();});}catch{results.textContent='Katalog se nepodařilo načíst. Obnovte stránku a zkuste to znovu.';return;}
  const normalized=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function render(){const query=normalized(input.value.trim()),items=searchData.filter(p=>p.path.startsWith('/products/')&&p.path!='/products/'&&!p.path.includes('/page/')&&query.split(/\s+/).every(w=>normalized(p.title).includes(w))).slice(0,20);results.innerHTML=items.length?items.map(p=>'<a href="'+new URL(p.path.replace(/^\//,''),base).href+'">'+escapeHtml(p.title)+'<small>'+escapeHtml(p.path)+'</small></a>').join(''):'Nenalezen žádný produkt. Zkuste jiný název.';}
  input.addEventListener('input',render);render();
 }
 $$('.cz-search-button,.elementor-search-form__toggle').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();search();}));
 $$('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();search();}));
 $('.cz-menu-button')?.addEventListener('click',()=>{
  const nav=$('.e-n-menu-content');const links=nav?$$('a[href]',nav).map(a=>({href:a.getAttribute('href'),text:a.textContent.trim()})).filter(a=>a.text):[];
  const seen=new Set();openModal('<h2>Menu</h2><nav class="cz-mobile-nav" aria-label="Hlavní navigace"><a href="'+base.href+'">Úvod</a><h3>Produkty</h3>'+links.filter(a=>{if(seen.has(a.href))return false;seen.add(a.href);return true;}).map(a=>'<a href="'+escapeHtml(a.href)+'">'+escapeHtml(a.text)+'</a>').join('')+'<h3>Společnost a servis</h3><a href="'+new URL('about-truma/',base).href+'">O společnosti Truma</a><a href="'+new URL('dealer-search/',base).href+'">Najít prodejce</a><a href="https://support.truma.com/" target="_blank" rel="noopener">Podpora Truma ↗</a></nav>');
 });
 // Native scrolling galleries replace the original WooCommerce runtime.
 $$('.woocommerce-product-gallery__image a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const img=$('img',a);if(img)openModal('<img src="'+escapeHtml(img.currentSrc||img.src)+'" alt="'+escapeHtml(img.alt)+'" style="max-width:100%;height:auto">');}));
 $$('[role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{const group=tab.closest('[role="tablist"]'),id=tab.getAttribute('aria-controls');if(!group||!id)return;$$('[role="tab"]',group).forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel)panel.hidden=!active;});}));
 const specs=$('#content-product-details'),toggle=$('#button-product-details');
 if(specs&&toggle){const change=()=>{specs.hidden=!specs.hidden;toggle.setAttribute('aria-expanded',String(!specs.hidden));};toggle.addEventListener('click',change);toggle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();change();}});}
})();
