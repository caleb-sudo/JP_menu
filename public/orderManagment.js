const cp = document.getElementById('CafeteriaP');
const cd = document.getElementById('CafeteriaD');
const gp = document.getElementById('GlobalP');
const gd = document.getElementById('GlobalD');
const bp = document.getElementById('BakeryP');
const bd = document.getElementById('BakeryD');

cp.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/pickup/cafe', {

    })
});

cd.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/cafe', {
        
    })
});

gp.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/pickup/global', {
        
    })
});

gd.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/global', {
        
    })
});

bp.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/pickup/bakery', {
        
    })
});

bd.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/bakery', {
        
    })
});