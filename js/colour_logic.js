const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
const root = document.documentElement;

const hueBase = getComputedStyle(root)
  .getPropertyValue('--hue-base')
  .trim();
window.addEventListener('scroll', () => {
    const ratio = window.scrollY / maxScroll;
    const baseHue = Math.round(ratio * 180) + parseInt(hueBase);
    // Update gradient system
    document.documentElement.style.setProperty('--hue-base', baseHue);
  
    // Update Bootstrap primary (optional)
  });
  