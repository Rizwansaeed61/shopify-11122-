/* ==========================================================================
   Electro Automotive - Shopify 2.0 Theme JavaScript
   Handles Drawer Cart, Quick Buy, Review Modal, Gallery Switcher, Accordions
   ========================================================================== */

function initAllComponents() {
  initCartDrawer();
  initVehicleCompatibility();
  initProductGallery();
  initAccordions();
  initQuantitySteppers();
  initVariantPickers();
  initReviewModal();
}

document.addEventListener('DOMContentLoaded', initAllComponents);
document.addEventListener('shopify:section:load', initAllComponents);
document.addEventListener('shopify:section:select', initAllComponents);
document.addEventListener('shopify:block:select', initAllComponents);

// Cart Drawer with Dynamic Quick Buy Item Transfer
function initCartDrawer() {
  const drawer = document.getElementById('CartDrawer');
  const overlay = document.getElementById('CartDrawerOverlay');
  const openBtns = document.querySelectorAll('[data-open-cart]');
  const closeBtns = document.querySelectorAll('[data-close-cart]');

  if (!drawer || !overlay) return;

  function openCart(e) {
    if (e && e.currentTarget) {
      const btn = e.currentTarget;
      const title = btn.getAttribute('data-item-title');
      const price = btn.getAttribute('data-item-price');
      const img = btn.getAttribute('data-item-image');

      const drawerTitle = document.getElementById('DrawerItemTitle');
      const drawerPrice = document.getElementById('DrawerItemPrice');
      const drawerImg = document.getElementById('DrawerItemImage');

      if (title && drawerTitle) drawerTitle.textContent = title;
      if (price && drawerPrice) drawerPrice.textContent = price;
      if (img && drawerImg) drawerImg.src = img;
    }

    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.removeEventListener('click', openCart);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart(e);
    });
  });

  closeBtns.forEach(btn => btn.addEventListener('click', closeCart));
  overlay.addEventListener('click', closeCart);
}

// Vehicle Compatibility Finder
function initVehicleCompatibility() {
  const searchForms = document.querySelectorAll('.compatibility-form');

  searchForms.forEach(form => {
    const btn = form.querySelector('button');
    const resultBox = form.closest('.compatibility-box')?.querySelector('.compatibility-result') ||
                      document.querySelector('.compatibility-result');

    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selects = form.querySelectorAll('select');
      const year = selects[0]?.value || '2024';
      const make = selects[1]?.value || 'Toyota';
      const model = selects[2]?.value || 'Camry';

      btn.disabled = true;
      btn.innerHTML = '<span>Checking...</span>';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span>CHECK FITMENT</span>';

        if (resultBox) {
          resultBox.style.display = 'block';
          resultBox.innerHTML = `
            <div style="background: rgba(40, 169, 86, 0.15); border: 1px solid #28a956; padding: 14px 20px; border-radius: 12px; margin-top: 16px; display: flex; align-items: center; gap: 12px;">
              <span class="material-symbols-outlined" style="color: #28a956; font-size: 24px;">check_circle</span>
              <div>
                <strong style="color: #28a956; font-size: 14px; text-transform: uppercase;">100% Guaranteed Fitment!</strong>
                <p style="color: #ffffff; font-size: 13px; margin-top: 2px;">Electro NightEye LED is plug & play compatible with <strong>${year} ${make} ${model}</strong> low-beam & high-beam housings.</p>
              </div>
            </div>
          `;
        } else {
          alert(`100% Guaranteed Fit! Electro NightEye LED is plug & play compatible with ${year} ${make} ${model}.`);
        }
      }, 500);
    });
  });
}

// Product Media Gallery Switcher
function initProductGallery() {
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  const mainImage = document.getElementById('ProductMainImage') || document.querySelector('.product-gallery__main img');

  if (!mainImage || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => {
        t.classList.remove('active');
        t.style.borderColor = 'var(--color-border)';
      });
      thumb.classList.add('active');
      thumb.style.borderColor = 'var(--color-primary)';

      const targetSrc = thumb.getAttribute('data-image-src') || thumb.querySelector('img')?.src;
      if (targetSrc) {
        mainImage.style.opacity = '0.3';
        setTimeout(() => {
          mainImage.src = targetSrc;
          mainImage.style.opacity = '1';
        }, 150);
      }
    });
  });
}

// Accordion Collapsible Tabs
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Quantity Steppers
function initQuantitySteppers() {
  const steppers = document.querySelectorAll('.quantity-stepper');

  steppers.forEach(stepper => {
    const input = stepper.querySelector('input');
    const minus = stepper.querySelector('[data-action="minus"]');
    const plus = stepper.querySelector('[data-action="plus"]');

    if (!input || !minus || !plus) return;

    minus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });

    plus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      input.value = val + 1;
    });
  });
}

// Product Variant Pickers
function initVariantPickers() {
  const pills = document.querySelectorAll('.variant-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.closest('.variant-pills');
      if (!parent) return;
      parent.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const label = parent.previousElementSibling?.querySelector('[data-selected-variant]');
      if (label) {
        label.textContent = pill.textContent.trim();
      }
    });
  });
}

// Customer Reviews Modal & Star Selector
function initReviewModal() {
  const modal = document.getElementById('ReviewModal');
  const openBtn = document.getElementById('OpenReviewModalBtn');
  const closeBtn = document.getElementById('CloseReviewModalBtn');
  const starBtns = document.querySelectorAll('.review-star-select');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Star selector
  starBtns.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-val')) || 5;
      starBtns.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-val')) || 1;
        if (sVal <= val) {
          s.style.color = 'var(--color-primary)';
          s.style.fontVariationSettings = "'FILL' 1";
        } else {
          s.style.color = 'var(--color-text-muted)';
          s.style.fontVariationSettings = "'FILL' 0";
        }
      });
    });
  });
}

// Shopify Theme Editor Iframe Safety Guard
// Prevents accidental top-level redirects and ensures smooth editor loading
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('click', function(e) {
    const a = e.target.closest('a');
    if (a) {
      const href = a.getAttribute('href');
      if (href && (href.startsWith('/checkout') || href.startsWith('http://') || href.startsWith('https://'))) {
        e.preventDefault();
      }
    }
  }, true);
}

