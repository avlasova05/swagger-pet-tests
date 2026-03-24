import {test, expect } from '@playwright/test';
import axios from 'axios';

test ('should give available pets @get', async ({request}) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available', { 
    params: {
        status: 'available'
    },
    headers: {
        accept: 'application/json'
    }
});
expect (response.status()).toBe(200);
const pets = await response.json();
console.log(pets);
});

test ('should be pending pets @get', async ({request}) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=pending', {
        params: {
            status: 'pending'
        },
        headers: {
            accept: ' application/json'
        }
    });
    expect (response.status()).toBe(200);
    const pets = await response.json();
    console.log(pets);
});

test('add a new pet to the store @post', async ({request}) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        data: {  
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        },
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    expect(response.status()).toBe(200);
    const new_pet = await response.json();
    expect (new_pet).toHaveProperty('id');
    expect(new_pet).toHaveProperty('name');
    expect (new_pet).toHaveProperty('status');

    expect(new_pet.name).toBe('doggie');
    expect(new_pet.status).toBe('available');
    expect (typeof new_pet.id).toBe('number');
});

test('an error with add a new pet to the store @post', async ({request}) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        data: {  
            "id": 'string',
            "category": {
                "id": 0
            },
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0
                }
            ],
            "status": "error"
        },
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    expect(response.status()).toBe(500);
});

test ('update an existing pet @put', async ({request}) => {
    const createResponse = await request.post('https://petstore.swagger.io/v2/pet', {
        data: {
            "id": 0,  
            "name": "Original Dog",
            "photoUrls": ["string"],
            "status": "available"
        },
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    const petId = createdPet.id;

    const response = await request.put ('https://petstore.swagger.io/v2/pet', {
        data: {
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
},
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    }
    });

    expect(response.status()).toBe(200);
    const existing_pets = await response.json();
    expect(existing_pets).toHaveProperty('id');
    expect(existing_pets.id).toBe(petId);
});

test ('find by status @get', async ({request}) => {
    const response = await request.get ('https://petstore.swagger.io/v2/pet/findByStatus?status=available', {
        params: {
            status: "available"
        },
        headers: {
            accept: 'application/json'
        }
    }); 
    expect(response.status()).toBe(200);
    const StatusResponse = await response.json();
    expect (Array.isArray(StatusResponse)).toBe(true);
    expect(StatusResponse.length).toBeGreaterThan(0);
    for (const status_pet of StatusResponse ) {
        expect (status_pet.status).toBe('available');
    }
});


test ('find pet by ID post + get @get', async () => {
    const newPet = {
        id: Date.now(),
        name: "TestDog",
        status: "available"
    };
    const newPetResponse = await axios.post('https://petstore.swagger.io/v2/pet', newPet, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    expect(newPetResponse.status).toBe(200);
    console.log(newPetResponse.data);

    const getResponse = await axios.get(`https://petstore.swagger.io/v2/pet/${newPet.id}`, {
        params: {petId: '1'},
        headers: {
            accept: 'application/json'
        }
    });
    expect(getResponse.status).toBe(200);
    console.log(getResponse.data);
});




