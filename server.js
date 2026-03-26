//require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
const sql = neon(`${process.env.DATABASE_URL}`);

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/orders', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'orderTracker.html'));
});

app.get('/api/data', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    return res.status(200).send(result);
});

app.post('/api/data', async (req, res) => {
    const result = await sql`INSERT INTO playing_with_neon(name, value) VALUES ('bye world', 1.90389);`;
    return res.status(200).send(result);
});

//bakery delivery
app.get('/api/orders/delivery/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryDelivery";`;
    return res.send(result);
});
app.get('/api/orders/delivery/bakery/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "bakeryDelivery";`;
    return res.status(200).send(result);
});
app.post('/api/orders/delivery/bakery/firstName:fn/lastName:ln/epsb:epsb/price:price/numOfitems:numOfItems/items:items/roomNum:roomNum', async (req, res) => {
    const fn = req.param.fn;
    const ln = req.param.ln;
    const epsb = req.param.epsb;
    const numOfItems = req.param.numOfItems.split(',');
    const items = req.param.items.split(',');
    const roomNum = req.param.roomNum;

    let itemsArr = [ ];
    for (let i = 0; i < items.length; i++) {
        itemsJson.push({
            item: items[i],
            amount: numOfItems[i];
        });
    }
    
    const result = await sql`INSERT INTO bakeryDelivery (firstName, lastName, epsb, price, orderTime, items, roomNum) VALUES (${fn}, ${ln}, ${epsb}, ${price}, NOW(), ${itemsArr}, ${roomNum})`;
    return res.status(200).send(result);
});
app.delete('/api/orders/delivery/bakery/ordernum:id', async (req, res) => {
});

//backery pickup
app.get('/api/orders/pickup/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryPickup";`;
    return res.status(200).send(result);
});
app.get('/api/orders/pickup/bakery/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "bakeryPickup";`;
    return res.status(200).send(result);
});
app.post('/api/orders/pickup/bakery', async (req, res) => {
});
app.delete('/api/orders/pickup/bakery/ordernum:id', async (req, res) => {
});

//cafe delivery
app.get('/api/orders/delivery/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafeDelivery";`;
    return res.status(200).send(result);
});
app.get('/api/orders/delivery/cafe/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "cafeDelivery";`;
    return res.status(200).send(result);
});
app.post('/api/orders/delivery/cafe', async (req, res) => {
});
app.delete('/api/orders/delivery/cafe/ordernum:id', async (req, res) => {
});

//cafe pickup
app.get('/api/orders/pickup/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafePickup";`;
    return res.status(200).send(result);
});
app.get('/api/orders/pickup/cafe/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "cafePickup";`;
    return res.status(200).send(result);
});
app.post('/api/orders/pickup/cafe', async (req, res) => {
});
app.delete('/api/orders/pickup/cafe/ordernum:id', async (req, res) => {
    /*const id = req.param.ordernum;
    const result = sql`DELETE FROM cafePickup WHERE ordernum = ${id}`;
    return res.status(200).send(result);*/
});

//global delivery
app.get('/api/orders/delivery/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalDelivery";`;
    return res.send(result);
});
app.get('/api/orders/delivery/global/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "globalDelivery";`;
    return res.status(200).send(result);
});
app.post('/api/orders/delivery/global', async (req, res) => {
});
app.delete('/api/orders/delivery/global/ordernum:id', async (req, res) => {
});

//global pickup
app.get('/api/orders/pickup/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalPickup";`;
    res.status(200).send(result);
});
app.get('/api/orders/pickup/global/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "globalPickup";`;
    res.status(200).send(result);
});
app.post('/api/orders/pickup/global', async (req, res) => {
});
app.delete('/api/orders/pickup/global/ordernum:id', async (req, res) => {
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
