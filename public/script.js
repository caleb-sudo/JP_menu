const cafe = document.getElementById('Cafeteria');
const glob = document.getElementById('Global');
const bake = document.getElementById('Bakery');
const itemsCont = document.getElementById('itemsCont');
const priceCont = document.getElementById('priceCont');
var activeMenu = cafeMenu;
var activeMenuName = "Cafe";
var totalPrice = 0;
var isDrink = false;

async function fetchMessage() {
    try {
        const response = await fetch('http://localhost:3000/message');
        const data = await response.json();
        document.getElementById('message-area').textContent = data.message;
    } catch (error) {
        console.error('Error fetching message:', error);
        document.getElementById('message-area').textContent = 'Failed to load message.';
    }
}

async function sendData() {
    const dataToSend = { username: 'testuser', value: 100 };
    try {
        const response = await fetch('http://localhost:3000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        const result = await response.json();
        document.getElementById('response-area').textContent = 'Backend response: ' + result.status;
    } catch (error) {
        console.error('Error sending data:', error);
        document.getElementById('response-area').textContent = 'Failed to send data.';
    }
}

fetchMessage();

function hide(element, hide) {
    if (hide == true) return element.style.display = "none";
    if (hide == false) return element.style.display = "block";
}

addItemsToPage(activeMenu);
addItemsToPage(drinks);

cafe.addEventListener("click", function() {
    itemsCont.replaceChildren();
    totalPrice = 0;
    activeMenu = cafeMenu;
    activeMenuName = "Cafe";
    cafe.style.backgroundColor = "#ddd";
    cafe.style.color = "black";
    glob.style.backgroundColor = "#333333";
    glob.style.color = "white";
    bake.style.backgroundColor = "#333333";
    bake.style.color = "white";
    addItemsToPage(activeMenu);
    addItemsToPage(drinks);
});
glob.addEventListener("click", function() {
    itemsCont.replaceChildren();
    totalPrice = 0;
    activeMenu = globalMenu;
    activeMenuName = "Global";
    glob.style.backgroundColor = "#ddd";
    glob.style.color = "black";
    cafe.style.backgroundColor = "#333333";
    cafe.style.color = "white";
    bake.style.backgroundColor = "#333333";
    bake.style.color = "white";
    addItemsToPage(activeMenu);
    addItemsToPage(drinks);
});
bake.addEventListener("click", function() {
    itemsCont.replaceChildren();
    totalPrice = 0;
    activeMenu = bakeryMenu;
    activeMenuName = "Bakery";
    bake.style.backgroundColor = "#ddd";
    bake.style.color = "black";
    glob.style.backgroundColor = "#333333";
    glob.style.color = "white";
    cafe.style.backgroundColor = "#333333";
    cafe.style.color = "white";
    addItemsToPage(activeMenu);
    addItemsToPage(drinks);
});

if (activeMenu.length == 0) {
    itemsCont.innerHTML = "There are currently no items available, check the Global Cafe, and Bakery."
}

function isElementDrink(element) {
	if (element.isDrink) return true;
	else return false;
}

function addItemsToPage(items) {
    if (items.length == 0) {
        itemsCont.innerHTML = "There are currently no items available, check the Global Cafe, and Bakery."
    }
    for (let i = 0; i < items.length; i++) {
        itemsCont.appendChild(document.createElement('br'));
        var cont = document.createElement('div');
        cont.classList = "itemCont";
        itemsCont.appendChild(cont);
        var itemName = document.createElement('h2');
        itemName.innerHTML = items[i].name;
        cont.appendChild(itemName);
        cont.appendChild(document.createElement('hr'));
        var price = document.createElement('span');
        price.innerHTML = "Individual Price: $" + items[i].price + "<br>";
        cont.appendChild(price);
        if (items[i].multiOption == false) {
            let add = document.createElement('button');
            add.classList = "addItemBtns";
            add.id = items[i].id + "add";
            add.innerHTML = "+";
            add.style.marginLeft = "10px";
            cont.appendChild(add);
            let rem = document.createElement('button');
            rem.classList = "remItemBtns";
            rem.id = items[i].id + "rem";
            rem.innerHTML = "-";
            cont.appendChild(rem);
			let quantitiesP = document.createElement('span');
			quantitiesP.classList = "quantitiesNum";
			quantitiesP.id = "quantitiesP" + items[i].id;
			quantitiesP.innerHTML = " Quantity: " + items[i].quantity;
			cont.appendChild(quantitiesP);
			
            let addBtn = document.getElementById(`${items[i].id}add`);
            addBtn.onclick = function() {
				if (items[i].quantity < items[i].max) items[i].quantity += 1;
				updateCart("quantitiesP" + items[i].id, items[i].quantity);
                showPrice(priceCont);
            }
			let remBtn = document.getElementById(`${items[i].id}rem`);
			remBtn.onclick = function() {
				if (items[i].quantity > 0) items[i].quantity -= 1;
				updateCart("quantitiesP" + items[i].id, items[i].quantity);
                showPrice(priceCont);
			}
        } else {
            for (let j = 0; j < items[i].options.length; j++) {
                let optName = document.createElement('h3');
                optName.classList = "optNames";
                optName.innerHTML = items[i].options[j].name;
                cont.appendChild(optName);
                let optAdd = document.createElement('button');
                optAdd.classList = "addItemsBtns" + items[i].id;
                optAdd.id = items[i].options[j].optId + "add"
                optAdd.innerHTML = "+";
                cont.appendChild(optAdd);
                let optRem = document.createElement('button');
                optRem.classList = "remItemsBtns" + items[i].id;
                optRem.id = items[i].options[j].optId + "rem";
                optRem.innerHTML = "-";
                cont.appendChild(optRem);
                let optQuantity = document.createElement('span');
                optQuantity.classList = "quantitiesNum";
                optQuantity.id = "optQuantities" + items[i].options[j].optId;
                optQuantity.innerHTML = " Quantity: " + items[i].options[j].quantity;
                cont.appendChild(optQuantity);
                let optAddBtn = document.getElementById(`${items[i].options[j].optId}add`);
                optAddBtn.onclick = function() {
                    if (items[i].quantity < items[i].max) {
                        items[i].quantity += 1;
                        items[i].options[j].quantity += 1;
                    }
                    updateCart("optQuantities" + items[i].options[j].optId, items[i].options[j].quantity);
                    showPrice(priceCont);
                }
                let optRemBtn = document.getElementById(`${items[i].options[j].optId}rem`);
                optRemBtn.onclick = function() {
                    if (items[i].quantity > 0 && items[i].options[j].quantity > 0) {
                        items[i].quantity -= 1;
                        items[i].options[j].quantity -= 1;
                    }
                    updateCart("optQuantities" + items[i].options[j].optId, items[i].options[j].quantity);
                    showPrice(priceCont);
                }
            }
        }
    }
}

function updateCart(id, quant) {
	let element = document.getElementById(id);
	element.innerHTML = " Quantity: " + quant;
}

function showPrice(element) {
    totalPrice = 0;
	for (let i = 0; i < activeMenu.length; i++) {
		if (activeMenu[i].quantity <= activeMenu[i].max) totalPrice += activeMenu[i].price * activeMenu[i].quantity;
	}
	for (let i = 0; i < drinks.length; i++) {
		if (drinks[i].quantity <= drinks[i].max) totalPrice += drinks[i].price * drinks[i].quantity;
	}
	if (totalPrice == 0) element.innerHTML = "$0";
	else element.innerHTML = "$" + totalPrice;
}

const orderModal = document.getElementById('orderModal');
const informationModal = document.getElementById('informationModal');
const itemsList = document.getElementById('itemsList');
const totalL = document.getElementById('totalPrice');

function isInIdRange(epsb) {
    /* psudo code
    if (epsb is from Jasper Place) return true;
    else return false;
    */
}

function isBlackListedId(epsb) {
    /* psudo code
    if (epsb id is black lissed) return true;
    else return false;
    */
}

function isValidRoomNum(room) {
    /* psudo code
    if (room is a real room in jp) return true;
    else return false;
    */
}

function buildOrder() {
    document.body.style.overflow = "hidden";
    var modal = document.getElementsByClassName('modal');
    itemsList.replaceChildren();
	for (let i = 0; i < activeMenu.length; i++) {
        showPrice(totalL);
		if (activeMenu[i].quantity > 0) {
			let li = document.createElement('li');
            li.style.padding = "none";
			itemsList.appendChild(li);
			let div = document.createElement('div');
            div.classList = "orderItem";
			li.appendChild(div);

            let itemName = document.createElement('p');
            itemName.classList = "itemProperties";
            itemName.innerHTML = activeMenu[i].name;

            let price = document.createElement('p');
            price.classList = "itemProperties";
            price.innerHTML = "ItemPrice: $" + activeMenu[i].price;

            let amount = document.createElement('p');
            amount.classList = "itemProperties";
            amount.innerHTML = "Quantity: " + activeMenu[i].quantity;

            div.appendChild(itemName);
            div.appendChild(amount);
            div.appendChild(price);
            itemsList.appendChild(document.createElement('br'));
		}
	}
}

const verifyBtn = document.getElementById('verifyBtn');
verifyBtn.onClick = function() {
    hide(orderModal, true);
    hide(informationModal, false);
}

function openOrder() {
	hide(orderModal, false);
    buildOrder();
}

function closeOrder() {
    hide(orderModal, true);
    document.body.style.overflow = "auto";
}

function openInformation() {
    hide(informationModal, false);
    closeOrder();
    document.body.style.overflow = "hidden";
}

function closeInformation() {
    hide(informationModal, true);
    document.body.style.overflow = "auto";
}

const form = document.getElementById('form');
const fn = document.getElementById('firstName');
const ln = document.getElementById('lastName');
const id = document.getElementById('epsb');
const pickup = document.getElementById('pickup');
const delivery = document.getElementById('delievery');
const roomNum = document.getElementById('roomNum');

/*form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (pickup.checked == true && roomNum.value != "") alert("You do not need a room number when picking the food up.");
    //else if (delivery.checked == true && roomNum.value == "") alert("You have picked for your food to be delivered, you need a room number, or else we won't know where you are");
    else {
        //alert("You have finished your order");
        //alert("If you have set it to pickup and preordered the food, please go to the place you have ordered the food from and pick it up.");
        //alert("If you have set it to deliver, please wait in the room and wait for someone to deliver your food.");
        console.log(fn.value);
        let arr = [];
        for (let i = 0; i < activeMenu.length; i++) {
            if (activeMenu[i].quantity > 0) {
                arr.push(activeMenu[i].name);
                arr.push(activeMenu[i].quantity);
            }
        }
        let fullArr = [fn.value, ln.value, 2, arr, 2];
        console.log(fullArr);
    }
});

function removeOrder() {

}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("orders.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});*/
