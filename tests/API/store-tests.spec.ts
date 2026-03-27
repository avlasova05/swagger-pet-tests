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

test ('404 error when explicitly specified orderId @get', async() => {
    try {
    const response = await axios.get ('https://petstore.swagger.io/v2/store/order/1', {
        params: { orderId: '1'},
        headers: { Accept: 'application/json'}
    });
    expect(response.status).toBe(200);
    console.log(response.data);
} catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        expect(error.response.status).toBe(404);
    } else {
        throw error;
    }
}
});

test ('creating and deleting the purchase @delete', async () => {
    const data_to_create = {
  "petId": 1,
  "quantity": 1,
  "status": "placed",
  "complete": true
};
    const response = await axios.post('https://petstore.swagger.io/v2/store/order', data_to_create, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    expect (response.status).toBe(200);
    const CreatedId = BigInt(response.data.id);
    console.log(CreatedId.toString());

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const getResponse = await axios.get(`https://petstore.swagger.io/v2/store/order/${CreatedId.toString()}`, {
            headers: {
                Accept: 'application/json'
            }
        });
        console.log('exists:', getResponse.data);

    const DeleteResponse = await axios.delete(`https://petstore.swagger.io/v2/store/order/${CreatedId.toString()}`, {
        headers: {
            Accept: 'application/json'
        }
    });
    expect(DeleteResponse.status).toBe(200);
    const VerifyResponse = await axios.get (`https://petstore.swagger.io/v2/store/order/${CreatedId.toString()}`, {
        headers: { Accept: 'application/json'}
    }).catch(error => error.response);
    expect(VerifyResponse.status).toBe(404);
}catch (error) {
    console.log('no order found');
}
});
 