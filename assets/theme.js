/* ==========================================================================
   Electro Automotive - Shopify 2.0 Theme JavaScript
   Handles Drawer Cart, Vehicle Finder, Gallery Switcher, Accordions, Stepper
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initVehicleCompatibility();
  initProductGallery();
  initAccordions();
  initQuantitySteppers();
  initVariantPickers();
});

// Cart Drawer
function initCartDrawer() {
  const drawer = document.getElementById('CartDrawer');
  const overlay = document.getElementById('CartDrawerOverlay');
  const openBtns = document.querySelectorAll('[data-open-cart]');
  const closeBtns = document.querySelectorAll('[data-close-cart]');

  if (!drawer || !overlay) return;

  function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

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
  const mainImage = document.querySelector('.product-gallery__main img');

  if (!mainImage || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const targetSrc = thumb.getAttribute('data-image-src') || thumb.querySelector('img')?.src;
      if (targetSrc) {
        mainImage.src = targetSrc;
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
