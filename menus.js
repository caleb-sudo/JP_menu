const cafeMenu = [
];

const globalMenu = [
    {
        id: 0,
        name: "Grilled Cheese",
        price: 3.50,
        multiOption: false,
        quantity: 0,
        max: 5,
		isDrink: false,
    },
    {
        id: 1,
        name: "Grilled Panini",
        price: 5.00,
        multiOption: false,
        quantity: 0,
        max: 5,
		isDrink: false,
    },
    {
        id: 2,
        name: "Small Baked Goods",
        price: 1.00,
        multiOption: true,
        quantity: 0,
        options: [

        ],
        max: 5,
		isDrink: false,
    },
    {
        id: 3,
        name: "Fruit Cup",
        price: 1.00,
        multiOption: false,
        quantity: 0,
        max: 5,
		isDrink: false,
    },
];

const bakeryMenu = [
    {
        id: 0,
        name: "Pizza",
        price: 5.00,
        multiOption: true,
        quantity: 0,
        options: [
            {
                optId: "P0",
                name: "Cheese Pizza",
                quantity: 0
            },
            {
                optId: "P1",
                name: "Pepporoni Pizza",
                quantity: 0
            },
        ],
        max: 2,
		isDrink: false,
    },
    {
        id: 1,
        name: "Cheesebread",
        price: 3.00,
        multiOption: false,
        quantity: 0,
        max: 2,
		isDrink: false,
    },
    {
        id: 2,
        name: "Cookie",
        price: 1.00,
        multiOption: false,
        quantity: 0,
        max: 5,
		isDrink: false,
    },
    {
        id: 3,
        name: "Large Cookie",
        price: 3.00,
        multiOption: false,
        quantity: 0,
        max: 2,
		isDrink: false,
    },
    {
        id: 4,
        name: "Parait",
        price: 1.00,
        multiOption: false,
        quantity: 0,
        max: 3,
		isDrink: false,
    },
];

const drinks = [
    {
        id: "d0",
        name: "Orange Juice",
        price: 2.00,
        multiOption: false,
        quantity: 0,
        max: 2,
		isDrink: true,
    },
    {
        id: "d1",
        name: "Apple Juice",
        price: 2.00,
        multiOption: false,
        quantity: 0,
        max: 2,
		isDrink: true,
    },
    {
        id: "d2",
        name: "Icetea",
        price: 2.00,
        multiOption: false,
        quantity: 0,
        max: 2,
		isDrink: true,
    },
    {
        id: "d3",
        name: "Gatorade",
        price: 3.00,
        multiOption: true,
        quantity: 0,
        options: [
            {
                opId: "G0",
                name: "Blue Gatorade",
                quantity: 0,
            },
        ],
        max: 2,
		isDrink: true,
    },
];
