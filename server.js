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
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orderTracker.html'));
});

app.get('/api/data', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    res.send(result);
});

app.post('/api/data', async (req, res) => {
    const result = await sql`INSERT INTO playing_with_neon(name, value) VALUES ('bye world', 1.90389);`;
    res.send(result);
});

//bakery delivery
app.get('/api/orders/delivery/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryDelivery";`;
    res.send(result);
});
app.get('/api/orders/delivery/bakery/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "bakeryDelivery";`;
    res.send(result);
});
app.post('/api/orders/delivery/bakery', async (req, res) => {
    const { firstName, lastName, epsbNum, price, roomNum } = req.body;
    const items = { "1": "Hello", "2": "world" };
    const result = await sql`INSERT INTO bakeryDelivery (firstName, lastName, epsb, price, orderTime, items, roomNum) VALUES (${firstName}, ${lastName}, ${epsbNum}, 100, NOW(), ${items}, ${roomNum})`;
    console.log("hello world");
    res.send(result);
});
app.delete('/api/orders/delivery/bakery:id', async (req, res) => {
});

//backery pickup
app.get('/api/orders/pickup/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryPickup";`;
    res.send(result);
});
app.get('/api/orders/pickup/bakery/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "bakeryPickup";`;
    res.send(result);
});
app.post('/api/orders/pickup/bakery', async (req, res) => {
});
app.delete('/api/orders/pickup/bakery:id', async (req, res) => {
});

//cafe delivery
app.get('/api/orders/delivery/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafeDelivery";`;
    res.send(result);
});
app.get('/api/orders/delivery/cafe/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "cafeDelivery";`;
    res.send(result);
});
app.post('/api/orders/delivery/cafe', async (req, res) => {
});
app.delete('/api/orders/delivery/cafe:id', async (req, res) => {
});

//cafe pickup
app.get('/api/orders/pickup/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafePickup";`;
    res.send(result);
});
app.get('/api/orders/pickup/cafe/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "cafePickup";`;
    res.send(result);
});
app.post('/api/orders/pickup/cafe', async (req, res) => {
});
app.delete('/api/orders/pickup/cafe:ordernum', async (req, res) => {
    /*const ORDER_NUM = req.param.ordernum;
    const query = sql`DELETE FROM cafePickup WHERE ordernum = ?`;
    connection.query(query, {error, request, field} => {
        if (error) return console.error("Error: " + error);
        res.send(results);
    });*/
});

//global delivery
app.get('/api/orders/delivery/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalDelivery";`;
    res.send(result);
});
app.get('/api/orders/delivery/global/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "globalDelivery";`;
    res.send(result);
});
app.post('/api/orders/delivery/global', async (req, res) => {
});
app.delete('/api/orders/delivery/global:id', async (req, res) => {
});

//global pickup
app.get('/api/orders/pickup/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalPickup";`;
    res.send(result);
});
app.get('/api/orders/pickup/global/count', async (req, res) => {
    const result = await sql`SELECT COUNT(*) FROM "globalPickup";`;
    res.send(result);
});
app.post('/api/orders/pickup/global', async (req, res) => {
});
app.delete('/api/orders/pickup/global:id', async (req, res) => {
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
