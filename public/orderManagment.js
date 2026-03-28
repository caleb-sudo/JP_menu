const menus = [
    document.getElementById('CafeteriaP'),
    document.getElementById('CafeteriaD'),
    document.getElementById('GlobalP'),
    document.getElementById('GlobalD'),
    document.getElementById('BakeryP'),
    document.getElementById('BakeryD'),
]
const links = [
    "https://jp-menu-psi.vercel.app/api/orders/pickup/cafe",
    "https://jp-menu-psi.vercel.app/api/orders/delivery/cafe",
    "https://jp-menu-psi.vercel.app/api/orders/pickup/global",
    "https://jp-menu-psi.vercel.app/api/orders/delivery/global",
    "https://jp-menu-psi.vercel.app/api/orders/pickup/bakery",
    "https://jp-menu-psi.vercel.app/api/orders/delivery/bakery",
];
const table = document.getElementById('ordersTable');

async function build(link) {
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
    `
    const response = await fetch(link);
    const data = await response.json();
    const countRes = await fetch(`${link}/count`);
    const count = await countRes.json();
    for (let i = 0; i < Number(count[0].count); i++) {
        var tr = document.createElement('tr');

        var id = document.createElement('td');
        id.innerHTML = i+1;
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
        items.innerHTML = data[i].items
        tr.appendChild(items);

        var del = document.createElement('td');
        var delBtn = document.createElement('button');
        delBtn.innerHTML = "delete order";
        delBtn.classList = "delRowBtn";
        delBtn.id = "delBtn" + (i + 1);
        delBtn.onclick = async function() {
            const res = await fetch(`https://jp-menu-psi.vercel.app/api/orders/pickup/cafe`, {
                method: 'DELETE'
            });
            if (res.ok) {
                console.log(`row deleted where ordernum = ${i+1}`);
            }
        }
        del.appendChild(delBtn);
        tr.appendChild(del);

        table.appendChild(tr);
    }
}

window.onload = function() {
    build(links[0]);
    menus[0].style.backgroundColor = '#ddd';
    menus[0].style.color = 'black';
}

for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener('click', function() {
        build(links[i]);
        menus[i].style.backgroundColor = '#ddd';
        menus[i].style.color = 'black';
        for (let j = 0; j < menus.length; j++) {
            if (j != i) {
                menus[j].style.backgroundColor = '#333333';
                menus[j].style.color = 'white';
            }
        }
    });
}