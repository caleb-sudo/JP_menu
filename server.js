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

app.get('/api/data', async (req, res) => {
    const result = await sql`SELECT name FROM playing_with_neon;`;
    return res.send(result);
});

app.post('/api/data', async (req, res) => {
    const result = await sql`INSERT INTO playing_with_neon(name, value) VALUES ('bye world', 1.90389);`;
    return res.send(result);
});

//bakery deliveries
app.get('/api/orders/deliveries/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryDelivery";`;
    return res.send(result);
});
app.post('/api/orders/deliveries/bakery', async (req, res) => {
    const { firstName, lastName, epsbNum, price, roomNum } = req.body;
    const items = { "1": "Hello", "2": "world" };
    await sql`INSERT INTO bakeryDelivery (firstName, lastName, epsb, price, orderTime, items, roomNum) VALUES (${firstName}, ${lastName}, ${epsbNum}, ${price}, NOW(), ${items}, ${roomNum})`;
    return res.send("Order recived!!");
});
app.delete('/api/orders/deliveries/bakery', async (req, res) => {
});

//backery pickup
app.get('/api/orders/pickup/bakery', async (req, res) => {
    const result = await sql`SELECT * FROM "bakeryPickup";`;
    return res.send(result);
});
app.post('/api/orders/pickup/bakery', async (req, res) => {
});
app.delete('/api/orders/pickup/bakery', async (req, res) => {
});

//cafe deliveries
app.get('/api/orders/deliveries/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafeDelivery";`;
    return res.send(result);
});
app.post('/api/orders/deliveries/cafe', async (req, res) => {
});
app.delete('/api/orders/deliveries/cafe', async (req, res) => {
});

//cafe pickup
app.get('/api/orders/pickup/cafe', async (req, res) => {
    const result = await sql`SELECT * FROM "cafePickup";`;
    return res.send(result);
});
app.post('/api/orders/pickup/cafe', async (req, res) => {
});
app.delete('/api/orders/pickup/cafe', async (req, res) => {
});

//global deliveries
app.get('/api/orders/deliveries/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalDelivery";`;
    return res.send(result);
});
app.post('/api/orders/deliveries/global', async (req, res) => {
});
app.delete('/api/orders/deliveries/global', async (req, res) => {
});

//global pickup
app.get('/api/orders/pickup/global', async (req, res) => {
    const result = await sql`SELECT * FROM "globalPickup";`;
    return res.send(result);
});
app.post('/api/orders/pickup/global', async (req, res) => {
});
app.delete('/api/orders/pickup/global', async (req, res) => {
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));