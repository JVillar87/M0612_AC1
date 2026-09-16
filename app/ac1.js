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

function calculateTax(clientType) {
    let tax;

    if (clientType == "premium") {
        tax = 10;
    } else {
        tax = 21;
    }

    return tax;
}

function calculateBudget() {
    const formData =
        getFormData();

    let hours =
        parseFloat(formData.hours);

    let price =
        parseFloat(formData.price);

    let discount =
        parseInt(formData.discount);

    if (discount === 0 || isNaN(discount) || discount < 0) {
        discount = 0;
    }


    if (formData.clientType == "premium") {
        discount = 20;
    }

    let subtotal =
        hours * price;

    let tax =
        calculateTax(formData.clientType);

    if (
        hours > 10 ||
        price > 50 &&
        formData.clientType == "standard"
    ) {
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
    for (
        let index = 0;
        index < services.length;
        index++
    ) {
        console.log(
            "Servei " +
            (index + 1) +
            ": " +
            services[index] +
            " €"
        );
    }
}

function calculateServicesTotal() {
    let total = 0;

    for (
        let index = 0;
        index < services.length;
        index++
    ) {
        total += services[index];
    }

    return total;
}

function testTaxScope() {
    if (true) {
        let tax = 21;
    }

    console.log(
        "Impost de prova:",
        tax
    );
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