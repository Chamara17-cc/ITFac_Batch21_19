const { test, expect } = require('@playwright/test');
const {getAdminAuthContext,getUserAuthContext} = require('../../../../utils/apiAuthHelper');

test('Verify User cannot create sale using existing plant - 403 Forbidden', async ({ request }) => {


    const adminRequest = await getAdminAuthContext(request);

    const plantName = `RosePlant_${Math.floor(Math.random() * 1000000)}`.slice(0, 15);
    const subCategoryId = 13; 

    const plantPayload = {
        name: plantName,
        price: 120,
        quantity: 10,
        stock: 10
    };

    const plantResponse = await adminRequest.post(
        `/api/plants/category/${subCategoryId}`,
        { data: plantPayload }
    );

    console.log('PLANT STATUS:', plantResponse.status());
    console.log('PLANT BODY:', await plantResponse.text());

    expect(plantResponse.status()).toBe(201);

    const plant = await plantResponse.json();
    const plantId = plant.id;

    expect(plantId).toBeDefined();


    const userRequest = await getUserAuthContext(request);

    const quantity = 1;

    const saleResponse = await userRequest.post(
        `/api/sales/plant/${plantId}?quantity=${quantity}`
    );

    console.log('SALE STATUS:', saleResponse.status());
    console.log('SALE BODY:', await saleResponse.text());

    expect(saleResponse.status()).toBe(403);
});


//Bug