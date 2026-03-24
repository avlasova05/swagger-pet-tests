import {test, expect } from '@playwright/test';
import axios from 'axios';

test ('get Petstore orders @get', async () => {
    const response = await axios.get('https://petstore.swagger.io/v2/store/inventory', {
        headers: { Accept: 'application/json'}
    });
    expect (response.status).toBe(200);
    console.log(response.data);
});

test ('place an order for a pet @post', async () => {
    const orderData = {
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2026-03-24T14:10:14.991Z",
  "status": "placed",
  "complete": true
};
    const response = await axios.post ('https://petstore.swagger.io/v2/store/order', orderData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    );
    expect(response.status).toBe(200);
    console.log(response.data);
});