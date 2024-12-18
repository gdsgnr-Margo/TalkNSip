const togglemenu = document.querySelector('.btntogglemenu');
const toggleicon = document.querySelector('.btntogglemenu i');
const dropdownmenu = document.querySelector('.btndropdownmenu');
let toggleTimeout;

console.log(togglemenu, toggleicon, dropdownmenu); // Debugging line

function toggleMenu() {
    clearTimeout(toggleTimeout);
    toggleTimeout = setTimeout(() => {
        const isOpen = dropdownmenu.classList.toggle('open');
        toggleicon.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
        togglemenu.setAttribute('aria-expanded', isOpen);
        dropdownmenu.setAttribute('aria-hidden', !isOpen);
        document.body.classList.toggle('noscroll', isOpen);
    }, 200);
}

togglemenu.onclick = toggleMenu;

const logout = document.querySelector('.btnlogout');
if (logout) {
    logout.onclick = function () {
        window.location.href = "index.html";
    };
}
