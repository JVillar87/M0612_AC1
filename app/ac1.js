"use strict";
const minimumPrice = 100;

const services = [
    50,
    100,
    75
];

function getFormData() {
    const hours =
        document.querySelector("#hoursInput").value;
    console.log(
        "¿hours es propiedad de window?",
        Object.prototype.hasOwnProperty.call(window, "hours")
    );

    console.log(
        "¿hours es propiedad de globalThis?",
        Object.prototype.hasOwnProperty.call(globalThis, "hours")
    );

    console.log(
        "scope:",
        typeof hours,
        hours
    );

    const price =
        document.querySelector("#price").value;

    let discount =
        document.querySelector("#discount").value;

    const clientType =
        document.querySelector("#clientType").value;

    return {
        hours: hours,
        price: price,
        discount: discount,
        clientType: clientType
    };
}

function calculateTax(clientType = "standard") {
    return clientType === "premium" ? 10 : 21;
}

function calculateBudget() {
    const formData =
        getFormData();

    let hours =
        parseFloat(formData.hours);

    let price =
        parseFloat(formData.price);

    const inputDiscount = formData.discount;
    const discountValue = inputDiscount !== "" ? inputDiscount : undefined;

    let discount =
        parseInt(discountValue ?? 0, 10);

    /*if (discount === 0 || isNaN(discount) || discount < 0) {
        discount = 0;*/

    //Validamos descuento que no sea negativo
    if (Number.isNaN(discount) || discount < 0) {
        throw new Error("El descuento no puede ser negativo/invalido.");
    }

    //Validamos horas que no sea negativo
    if (Number.isNaN(hours) || hours < 0) {
        throw new Error("Las horas no pueden ser negativas/invalidas.");
    }

    //Validamos precio que no sea negativo
    if (Number.isNaN(price) || price < 0) {
        throw new Error("El precio no puede ser negativo/invalido.");
    }

    if (formData.clientType === "premium") {
        discount = 20;
    }
    else if (formData.clientType === "VIP") {
        discount = 10;
    }

    let subtotal =
        hours * price;

    let tax =
        calculateTax(formData.clientType);

    const isLargeProject = (hours > 10 || price > 50);

    if (isLargeProject && (formData.clientType === "standard")) {
        tax = 10;
    }

    let discountAmount =
        subtotal *
        discount /
        100;

    const subtotalWithDiscount =
        subtotal -
        discountAmount;

    const taxAmount =
        subtotalWithDiscount *
        tax /
        100;

    let total =
        subtotalWithDiscount +
        taxAmount;

    if (total < minimumPrice) {
        total = minimumPrice;
    }

    return {
        hours: hours,
        price: price,
        discount: discount,
        subtotal: subtotal,
        discountAmount: discountAmount,
        tax: tax,
        taxAmount: taxAmount,
        total: total
    };
}


function processBudget() {
    try {
        const result =
            calculateBudget();

        renderBudget(result);
    } catch (error) {
        renderError(error);
    }
}

function renderBudget(result) {
    const subtotalElement =
        document.querySelector("#subtotal");

    const discountAmountElement =
        document.querySelector("#discountAmount");

    const taxAmountElement =
        document.querySelector("#taxAmount");

    const totalElement =
        document.querySelector("#total");

    if (subtotalElement) {
        subtotalElement.textContent =
            result.subtotal.toFixed(2);
    }

    if (discountAmountElement) {
        discountAmountElement.textContent =
            result.discountAmount.toFixed(2);
    }

    if (taxAmountElement) {
        taxAmountElement.textContent =
            result.taxAmount.toFixed(2);
    }

    if (totalElement) {
        totalElement.textContent =
            result.total.toFixed(2);
    }
}

function renderError(error) {
    const errorElement =
        document.querySelector("#error");

    if (errorElement) {
        errorElement.textContent =
            error.message;
    }

    console.error(error);
}

function listServices() {
    for (const [index, service] of services.entries()) {
        console.log(
            "Servei " +
            (index + 1) +
            ": " +
            service +
            " €"
        );
    }
}

function calculateServicesTotal() {
    return services.reduce(
        (total, service) => total + service,
        0
    );
}

function testTaxScope() {
    if (true) {
        let tax = 21;
    }

    try {
        console.log("Impost de prova:", tax);
    } catch (error) {
        console.warn("Ex. 1.2 - Demostración de ámbito de bloque:", error.message);
    }
}

const calculateButton =
    document.querySelector(
        "#calculateButton"
    );

if (calculateButton) {
    calculateButton.addEventListener(
        "click",
        processBudget
    );
}

console.log(
    "Total serveis:",
    calculateServicesTotal()
);
