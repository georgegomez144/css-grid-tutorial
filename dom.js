(()=>{
  document.querySelectorAll('[margin]')
    .forEach(function(v) {
      v.style.margin = v.getAttribute('margin')
    })
  document.querySelectorAll('[layout-align]')
    .forEach(function(v) {
      const alignment = v.getAttribute('layout-align').split(' ').map(function(a) { if(a === 'start' || a === 'end') return a = `flex-${a}`; else return a; })
      v.style.justifyContent = alignment[0];
      v.style.alignItems = (alignment[1]) ? alignment[1] : 'center';
    })

  document.querySelectorAll('.input-container')
    .forEach(function(v) {
      const input = v.querySelector('input')
      if( input.value && input.value !== '' ) v.classList.add('has-content')
      input.addEventListener('focus', function() {
        if( this.value !== '' || this.value !== null) this.parentNode.classList.add('has-content')
        this.parentNode.classList.add('active')
      })
      input.addEventListener('blur', function() {
        if( this.value === '' || this.value === null ) this.parentNode.classList.remove('has-content')
        this.parentNode.classList.remove('active')
      })
      input.addEventListener('update', function() {
        if( this.value === '' || this.value === null ) this.parentNode.classList.remove('has-content')
        this.parentNode.classList.remove('active')
      })
      input.addEventListener('keyup', function(e) {
        const enter = 13
        const esc = 27
        const space = 32
        const key = e.which || e.keyCode
        if( key === enter ) findOccurances();
        if( key === esc ) input.value = '';
      })
    })

  findOccurances()
})();

class Menu {
  constructor() {}

  toggle(elementID) {
    const sidebar = document.querySelector(elementID)
    const toggle = document.querySelector('#menu_toggle')
    const screen = document.querySelector('#screen')
    if( sidebar.classList.contains('active') ) {
      sidebar.classList.remove('active')
      toggle.classList.remove('active')
      screen.classList.remove('active')
    } else {
      sidebar.classList.add('active')
      toggle.classList.add('active')
      screen.classList.add('active')
    }
  }
}
const menu = new Menu()