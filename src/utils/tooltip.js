// Global Tooltip Engine for Xeni
export function initTooltips() {
  if (typeof document === 'undefined') return;

  let tooltip = document.getElementById('xeni-global-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'xeni-global-tooltip';
    document.body.appendChild(tooltip);
  }

  let activeTarget = null;
  let hideTimer = null;

  function hideTooltip() {
    clearTimeout(hideTimer);
    activeTarget = null;
    if (tooltip) {
      tooltip.classList.remove('show');
    }
  }

  function showTooltip(el) {
    const text = el.getAttribute('data-tooltip') || el.getAttribute('title');
    if (!text || text.trim() === '') return;

    // Prevent browser native tooltip
    if (el.hasAttribute('title')) {
      el.setAttribute('data-tooltip', text);
      el.removeAttribute('title');
    }

    activeTarget = el;
    tooltip.textContent = text;

    // Measure element & tooltip
    const rect = el.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const pos = el.getAttribute('data-tooltip-pos') || 'top';

    let top = 0;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

    if (pos === 'bottom') {
      top = rect.bottom + 6;
    } else if (pos === 'left') {
      left = rect.left - tooltipRect.width - 6;
      top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
    } else if (pos === 'right') {
      left = rect.right + 6;
      top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
    } else {
      // Top by default
      top = rect.top - tooltipRect.height - 6;
      if (top < 8) {
        top = rect.bottom + 6; // Flip to bottom if clipping top
      }
    }

    // Keep horizontally inside viewport
    left = Math.max(8, Math.min(window.innerWidth - tooltipRect.width - 8, left));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.classList.add('show');
  }

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target || !(target instanceof Element)) return;
    const el = target.closest('[data-tooltip], [title]');
    if (!el) {
      if (activeTarget) hideTooltip();
      return;
    }
    if (el === activeTarget) return;
    showTooltip(el);
  }, true);

  document.addEventListener('mouseout', (e) => {
    if (activeTarget && (!e.relatedTarget || !activeTarget.contains(e.relatedTarget))) {
      hideTooltip();
    }
  }, true);

  document.addEventListener('mousedown', () => {
    hideTooltip();
  }, true);

  window.addEventListener('scroll', () => {
    hideTooltip();
  }, { passive: true });
}

// Auto init on import if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltips);
  } else {
    initTooltips();
  }
}
