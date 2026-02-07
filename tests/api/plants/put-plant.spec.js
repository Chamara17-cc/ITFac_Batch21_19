const { test, expect } = require('@playwright/test');
const { getAdminAuthContext, getUserAuthContext } = require('../helpers/api-auth.helper');

const PLANT_ID = 1;          // Correct plant ID from your DB
const CATEGORY_ID = 6;       // Existing category ID for the plant

test('PUT-PLANT-16 Admin updates plant with valid data', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);

    const response = await authRequest.put(`/api/plants/${PLANT_ID}`, {
        data: {
            name: 'Plant 1',       // Required field
            price: 500,
            quantity: 10,
            categoryId: CATEGORY_ID // Required field
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', PLANT_ID);
    expect(body.price).toBe(500);
    expect(body.quantity).toBe(10);
});

test('PUT-PLANT-17 Update plant without authentication', async ({ request }) => {
    const response = await request.put(`/api/plants/${PLANT_ID}`, {
        data: {
            name: 'Plant 1',
            price: 100,
            quantity: 5,
            categoryId: CATEGORY_ID
        }
    });

    expect(response.status()).toBe(401);
});

test('PUT-PLANT-18 User cannot update plant', async ({ request }) => {
    const authRequest = await getUserAuthContext(request);

    const response = await authRequest.put(`/api/plants/${PLANT_ID}`, {
        data: {
            name: 'Plant 1',
            price: 200,
            quantity: 5,
            categoryId: CATEGORY_ID
        }
    });

    expect(response.status()).toBe(403);
});

test('PUT-PLANT-19 Negative price', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);

    const response = await authRequest.put(`/api/plants/${PLANT_ID}`, {
        data: {
            name: 'Plant 1',
            price: -10,
            quantity: 5,
            categoryId: CATEGORY_ID
        }
    });

    expect(response.status()).toBe(400);
});

test('PUT-PLANT-20 Negative quantity', async ({ request }) => {
    const authRequest = await getAdminAuthContext(request);

    const response = await authRequest.put(`/api/plants/${PLANT_ID}`, {
        data: {
            name: 'Plant 1',
            price: 100,
            quantity: -5,
            categoryId: CATEGORY_ID
        }
    });

    expect(response.status()).toBe(400);
});

//run these tests with: npx playwright test tests/api/plants/put-plant.spec.js
