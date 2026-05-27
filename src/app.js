/**
 * Presentation Controller (Offline and file:// CORS-proof Local Engine)
 * Manages slide transitions, keyboard controls, swipe events, sidebar navigation, and local Plotly.js chart rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const progressDotsContainer = document.getElementById('progress-dots');
  const slideNumLabel = document.getElementById('slide-num');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  
  // Navigation Drawer elements
  const drawerToggle = document.getElementById('drawer-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerMenuItems = document.querySelectorAll('.drawer-menu-item');

  let currentSlide = 0;

  // Initialize progress indicators
  function initProgressDots() {
    progressDotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('progress-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      progressDotsContainer.appendChild(dot);
    }
  }

  // Slide transition function
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    // Deactivate current slide
    slides[currentSlide].classList.remove('active');
    
    // Update index
    currentSlide = index;
    
    // Activate new slide
    slides[currentSlide].classList.add('active');
    
    // Update progress dots
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update drawer menu active item
    drawerMenuItems.forEach((item, idx) => {
      if (idx === currentSlide) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update HUD controls based on slide theme
    if (slides[currentSlide].classList.contains('cover-theme')) {
      document.body.classList.add('cover-active');
    } else {
      document.body.classList.remove('cover-active');
    }

    // Enable/disable navigation buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Update slide index label
    const paddedCurrent = String(currentSlide + 1).padStart(2, '0');
    const paddedTotal = String(totalSlides).padStart(2, '0');
    slideNumLabel.textContent = `${paddedCurrent} / ${paddedTotal}`;

// Native local Plotly chart rendering on active slide (No iframes, 100% CORS-immune)
    const activeSlideEl = slides[currentSlide];
    const chartDivs = activeSlideEl.querySelectorAll('.plotly-chart-container');
    
    if (chartDivs.length > 0) {
      setTimeout(() => {
        chartDivs.forEach(chartDiv => {
          const chartId = chartDiv.getAttribute('id');
          // Support multiple charts (e.g., plotly-chart-05-locacao -> chart_05_locacao)
          const chartKey = chartId.replace('plotly-chart-', 'chart_');
          
          if (window.Plotly && window.chartsData && window.chartsData[chartKey]) {
            const chartData = window.chartsData[chartKey];
            const layout = chartData.layout;
            
            // Enforce 100% transparent and responsively fluid layout
            layout.autosize = true;
            layout.paper_bgcolor = "rgba(0,0,0,0)";
            layout.plot_bgcolor = "rgba(0,0,0,0)";
            
            // Clean titles inside Plotly (since they are in slide headers already)
            layout.title = { text: "" };
            if (layout.title_old) {
              delete layout.title_old;
            }
            
            // Strip hardcoded dimensions
            if (layout.width) delete layout.width;
            if (layout.height) delete layout.height;
            
            // Prevent legend overlaps by fixing margin and legend positioning
            layout.margin = { t: 40, b: 60, l: 65, r: 20 };
            
            if (layout.legend) {
               layout.legend.orientation = 'h';
               layout.legend.y = -0.15;
               layout.legend.yanchor = 'top';
               layout.legend.x = 0.5;
               layout.legend.xanchor = 'center';
            }
            if (!chartDiv.classList.contains('rendered')) {
              // Render from scratch
              Plotly.newPlot(chartId, chartData.data, layout, {
                responsive: true,
                displayModeBar: false
              }).then(() => {
                chartDiv.classList.add('rendered');
              });
            } else {
              // Already rendered, react with layout update and resize to fit container
              Plotly.react(chartId, chartData.data, layout, {
                responsive: true,
                displayModeBar: false
              });
              Plotly.Plots.resize(chartDiv);
            }
          }
        });
      }, 350);
    }
  }

  // Button Click Handlers
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  });

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        fullscreenBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>';
        fullscreenBtn.setAttribute('title', 'Sair da Tela Cheia');
      } else {
        fullscreenBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
        fullscreenBtn.setAttribute('title', 'Tela Cheia');
      }
    });
  }

  // Drawer (Sidebar Navigation) handlers
  function openDrawer() {
    navDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
  }

  drawerToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  drawerMenuItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      goToSlide(idx);
      closeDrawer();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // If typing in any input, do not trigger navigation
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case ' ':
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
          e.preventDefault();
        }
        break;
      case 'ArrowLeft':
      case 'Backspace':
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1);
          e.preventDefault();
        }
        break;
      case 'PageDown':
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        break;
      case 'PageUp':
        if (currentSlide > 0) goToSlide(currentSlide - 1);
        break;
      case 'Home':
        goToSlide(0);
        break;
      case 'End':
        goToSlide(totalSlides - 1);
        break;
      case 'm':
      case 'M':
        // Toggle menu drawer
        if (navDrawer.classList.contains('open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
        break;
    }
  });

  // Mobile Swipe Gestures Support
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const minDistance = 50; // Minimum swipe distance in pixels
    const swipeDiff = touchStartX - touchEndX;
    
    if (Math.abs(swipeDiff) > minDistance) {
      if (swipeDiff > 0) {
        // Swipe left -> go next
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
      } else {
        // Swipe right -> go prev
        if (currentSlide > 0) goToSlide(currentSlide - 1);
      }
    }
  }

  // Keyboard hint fading
  const keyHint = document.getElementById('keyboard-hint');
  if (keyHint) {
    setTimeout(() => {
      keyHint.style.opacity = '0';
      setTimeout(() => keyHint.remove(), 1000);
    }, 6000);
  }

  // Startup Initialization
  initProgressDots();
  goToSlide(0);
});

// Resize handler to adjust the active rendered chart perfectly
window.addEventListener('resize', () => {
  const activeChart = document.querySelector('.slide.active .plotly-chart-container.rendered');
  if (activeChart && window.Plotly) {
    Plotly.Plots.resize(activeChart);
  }
});
