const cp = document.getElementById('CafeteriaP');
const cd = document.getElementById('CafeteriaD');
const gp = document.getElementById('GlobalP');
const gd = document.getElementById('GlobalD');
const bp = document.getElementById('BakeryP');
const bd = document.getElementById('BakeryD');
const link = "";

const table = document.getElementById('ordersTable');

function createTable(data, count) {
    table.replaceChildren();
    table.innerHTML = `
    <tr>
        <th>Order ID</th>
        <th>Customer Name</th>
        <th>Customer EPSB</th>
        <th>Price</th>
        <th>Time of Order</th>
        <th>Items</th>
        <th>Delete</th>
    </tr>
    `;
    for (let i = 0; Number(count); i++) {
        var tr = document.createElement('tr');

        var id = document.createElement('tr');
        id.innerHTML = data[i].orderNum;
        tr.appendChild(id);

        var name = document.createElement('td');
        name.innerHTML = data[i].firstname + " " + data[i].lastname;
        tr.appendChild(name);

        var epsb = document.createElement('td');
        epsb.innerHTML = data[i].epsb;
        tr.appendChild(epsb);

        var price = document.createElement('td');
        price.innerHTML = "$" + data[i].price;
        tr.appendChild(price);

        var timeOfOrder = document.createElement('td');
        timeOfOrder.innerHTML = data[i].ordertime;
        tr.appendChild(timeOfOrder);

        var items = document.createElement('td');
        items.innerHTML = data[i].items;
        tr.appendChild(items);

        var del = document.createElement('td');
        var delBtn = document.createElement('button');
        delBtn.innerHTML = "delete order";
        delBtn.classList = "deleteRowBtn";
        delBtn.id = `delBtn${i}`;
        del.appendChild(delBtn);
        tr.appendChild(del);

        table.appendChild(tr);
    }
}

cp.addEventListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/pickup/cafe";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
});

cd.addEvenListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/delivery/cafe";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
}

gp.addEvenListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/pickup/global";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
}
                   
gd.addEvenListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/delivery/global";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
}

bp.addEvenListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/pickup/bakery";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
}

gd.addEvenListener('click', async function() {
    link = "https://jp-menu-psi.vercel.app/api/orders/delivery/bakery";
    const response = await fetch(link);
    const countRes = await fetch(`${link}/count`);
    const data = await response.json();
    const count = await countRes.json();
    createTable(data, count);
}

async function deleteRow(id) {
    const response = await fetch(`${link}:${id}`, {
        method: 'DELETE'
    });
}
