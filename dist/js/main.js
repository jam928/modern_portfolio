// Select dom items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Inital State of menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        // Set menu state
        showMenu = true;

    }else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        // Set menu state
        showMenu = false;
    }
}

// init on dom load
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = ["Backend Developer", "Java Programmer"];
    const wait = txtElement.getAttribute('data-wait');

    // init typewriter
    new TypeWriter(txtElement, words, wait);
}

// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait,10);
        this.type();
        this.isDeleting = false;
    }

    type() {

        // current index of word
        const current = this.wordIndex % this.words.length;
    
        // full txt of the current word
        const fullTxt = this.words[current];
    
        // check if deleting
        if(this.isDeleting) {
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
            
        } else {
            // add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
            
        }
    
        // Insert txt into element
        this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`;
    
        // Initial Type speed
        let typeSpeed = 200;
    
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
    
        // If word is complete
        if(!this.isDeleting && this.txt == fullTxt) {
            // Make a pause at end
            typeSpeed = this.wait;
            
            // set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
    
            // move to next word
            this.wordIndex++;
    
            // pause before its start typing
            this.typeSpeed = 300;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}