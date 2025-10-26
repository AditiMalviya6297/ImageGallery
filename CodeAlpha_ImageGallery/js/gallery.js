// Gallery JS: lightbox, next/prev, filters
document.addEventListener('DOMContentLoaded', ()=>{
  const gallery = document.querySelector('.gallery');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  const filterButtons = Array.from(document.querySelectorAll('.filter-controls button'));

  let currentIndex = -1;

  function openLightbox(index){
    currentIndex = index;
    const img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  function showNext(){
    if(items.length===0) return;
    currentIndex = (currentIndex +1)%items.length;
    openLightbox(currentIndex);
  }
  function showPrev(){
    if(items.length===0) return;
    currentIndex = (currentIndex -1 + items.length)%items.length;
    openLightbox(currentIndex);
  }

  // Attach click on items
  items.forEach((it, idx)=>{
    it.addEventListener('click', ()=> openLightbox(idx));
    it.setAttribute('tabindex','0');
    it.addEventListener('keydown', e=>{ if(e.key==='Enter') openLightbox(idx) });
  });

n  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // keyboard
  document.addEventListener('keydown', e=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight') showNext();
    if(e.key==='ArrowLeft') showPrev();
  });

  // Filters
  filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it=>{
        if(f==='all' || it.dataset.category===f){
          it.style.display='block';
        } else {
          it.style.display='none';
        }
      });
    });
  });

  // Simple responsive re-index after DOM changes
  const observer = new MutationObserver(()=>{ /* re-calc items if needed */ });
  observer.observe(gallery,{childList:true,subtree:true});
});
