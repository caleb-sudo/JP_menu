const cp = document.getElementById('CafeteriaP');
const cd = document.getElementById('CafeteriaD');
const gp = document.getElementById('GlobalP');
const gd = document.getElementById('GlobalD');
const bp = document.getElementById('BakeryP');
const bd = document.getElementById('BakeryD');

function createTable() {

}

cp.addEventListener('click', async function(e) {
    e.preventDefault();
    try {
        const response = await fetch('https://jp-menu-psi.vercel.app/api/orders/pickup/cafe');
        const countRes = await fetch('https://jp-menu-psi.vercel.app/api/orders/pickup/cafe/count');
        const count = countRes.text();
        document.getElementById('test').innerHTML = count;
        var data = await response.json();
        var tableRow = document.createElement('tr');
    } catch (error) {
        console.error('Error fetching message:', error);
        document.getElementById('message-area').textContent = 'Failed to load message.';
    }
});

cd.addEventListener('click', async function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/cafe', {
        
    })
});

gp.addEventListener('click', async function(e) {
    e.preventDefault();
    fetch('/api/orders/pickup/global', {
        
    })
});

gd.addEventListener('click', async function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/global', {
        
    })
});

bp.addEventListener('click', async function(e) {
    e.preventDefault();
    fetch('/api/orders/pickup/bakery', {
        
    })
});

bd.addEventListener('click', async function(e) {
    e.preventDefault();
    fetch('/api/orders/delivery/bakery', {
        
    })
});