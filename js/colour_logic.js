const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
const root = document.documentElement;

const hueBase = getComputedStyle(root)
  .getPropertyValue('--hue-base')
  .trim();

const saturation = getComputedStyle(root)
  .getPropertyValue('--saturation')
  .trim();

const lightness = getComputedStyle(root)
  .getPropertyValue('--lightness')
  .trim();

function updateBorderColors() {
  const baseHue = parseInt(getComputedStyle(root).getPropertyValue('--hue-base').trim());
  const hueWindow = parseInt(getComputedStyle(root).getPropertyValue('--hue-window').trim()) || 20;
  
  // Update all dark-overlays with border offsets
  document.querySelectorAll('.dark-overlay[data-border-offset]').forEach(overlay => {
    const offset = parseInt(overlay.getAttribute('data-border-offset')) || 0;
    const borderHue = baseHue + offset;
    const endHue = borderHue + hueWindow;
    
    // Update border color
    overlay.style.borderColor = `hsl(${borderHue}, ${saturation}, ${lightness})`;
    
    // Update background gradient for bubble reflection effect
    overlay.style.background = `linear-gradient(135deg, hsla(${borderHue}, ${saturation}, ${lightness}, 0.15), hsla(${endHue}, ${saturation}, ${lightness}, 0.1))`;
    
    // Update inner glow CSS variable
    overlay.style.setProperty('--glow-hue', borderHue);
    
    // Update buttons inside this overlay
    overlay.querySelectorAll('.btn').forEach(btn => {
      if (btn.classList.contains('btn-light')) {
        btn.style.backgroundColor = `hsl(${borderHue}, ${saturation}, ${lightness})`;
        btn.style.borderColor = `hsl(${borderHue}, ${saturation}, ${lightness})`;
      } else if (btn.classList.contains('btn-outline-light')) {
        btn.style.borderColor = `hsl(${borderHue}, ${saturation}, ${lightness})`;
      }
    });
  });
  
  // Update dark-overlays without offset (use base hue)
  document.querySelectorAll('.dark-overlay:not([data-border-offset])').forEach(overlay => {
    const endHue = baseHue + hueWindow;
    
    // Update border color
    overlay.style.borderColor = `hsl(${baseHue}, ${saturation}, ${lightness})`;
    
    // Update background gradient for bubble reflection effect
    overlay.style.background = `linear-gradient(135deg, hsla(${baseHue}, ${saturation}, ${lightness}, 0.15), hsla(${endHue}, ${saturation}, ${lightness}, 0.1))`;
    
    // Update inner glow CSS variable
    overlay.style.setProperty('--glow-hue', baseHue);
    
    // Update buttons inside this overlay
    overlay.querySelectorAll('.btn').forEach(btn => {
      if (btn.classList.contains('btn-light')) {
        btn.style.backgroundColor = `hsl(${baseHue}, ${saturation}, ${lightness})`;
        btn.style.borderColor = `hsl(${baseHue}, ${saturation}, ${lightness})`;
      } else if (btn.classList.contains('btn-outline-light')) {
        btn.style.borderColor = `hsl(${baseHue}, ${saturation}, ${lightness})`;
      }
    });
  });
}

window.addEventListener('scroll', () => {
    const ratio = window.scrollY / maxScroll;
    const baseHue = Math.round(ratio * 180) + parseInt(hueBase);
    // Update gradient system
    document.documentElement.style.setProperty('--hue-base', baseHue);
    // Update border hue to match
    document.documentElement.style.setProperty('--border-hue', baseHue);
    
    // Update all border colors
    updateBorderColors();
  
    // Update Bootstrap primary (optional)
  });

// Initial update
updateBorderColors();
  