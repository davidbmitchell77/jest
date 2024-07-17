<template>
    <lightning-card title="My Accounts" icon-name="standard:account">
        <div class="slds-var-m-around_medium">
            <lightning-button label="Load Accounts" onclick={handleClick}><//lightning-button>
        </div>
        <template for:each={accounts} for:item="account">
            <p class="accountName" key={account.Id}>{account.Name}</p>
        </template>
        <template if:true={error}>
            <p class="error">{error.body.message}</p>
        </template>
    </lightning-card>
</template>


import ( LightningElement ) from 'lwc';
import { showToast        } from 'c/utils';
import getAccounts          from '@salesforce/apex/AccountController.getAccounts';

export default class MyImperativeApexComponent extends LightningElement {

    accounts = [];
    error = undefined;

    handleClick(event) {
        if (event.target.label == 'Load Accounts') {
            this.getAccounts();
        }
    }

    getAccounts()
   .then((data) => {
        console.info(data);
        this.accounts = [ ...data ];
        this.error = undefined;
    })
   .catch((error) => {
        console.error(error);
        this.error = { ...error };
        this.accounts = [];
        showToast('Error retrieving account data.', error.body.message, 'error', 'sticky');
    });
}


public with sharing class AccountController {

    private static final Integer MAX_QUERY_SIZE = Integer.valueOf(AuraSettings__mdt.getInstance('Account').MaxQuerySize__c);

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id,
                       Name,
                       Phone,
                       BillingCity,
                       BillingState,
                       BillingCountry,
                       BillingPostalCode,
                       AnnualRevenue
                  FROM Account
                 LIMIT :MAX_QUERY_SIZE
        ];
    }
}


import { createElement }         fromn 'lwc';
import getAccounts               from '@salesforce/apex/AccountController.getAccounts';
import MyImperativeApexComponent from 'c/MyImperativeApexComponent';

const MOCK_ACCOUNT_DATA = require(./data/accounts.json);
const MOCK_ERROR_OBJECT = require(./data/error.json);

jest.mock('@salesforce/apex/AccountController.getAccounts', () => ({ default: jest.fn() }), { virtual: true });

describe('c-my-imperative-apex-component test suite', () => {
    beforeEach(() => {
        const element = createElement('c-my-imperative-apex-component', {
            is : MyImperativeApexComponent
        });
        document.body.appendChild(element);
    });
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.remove(document.body.firstChild);
        }
    });
    test('account data returned from imperative apex', () => {
        getAccounts.mockResolvedValue(MOCK_ACCOUNT_DATA);
        const element = document.querySelector('c-my-imperative-apex-component');
        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();
        return new Promise(setImmediate).then(() => {
            const details = element.shadowRoot.querySelectorAll('p.accountName');
            expect(details.length).toBe(MOCK_ACCOUNT_DATA.length);
            expect(details[0].textContent).toBe(MOCK_ACCOUNT_DATA[0].Name);
            expect(details[1].textContent).toBe(MOCK_ACCOUNT_DATA[1].Name);
        });
    });
    test('error message returned upon apex method failure', () => {
        getAccounts.mockRejectedValue(MOCK_ERROR_OBJECT);
        const element = document.querySelector('c-my-imperative-apex-component');
        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();
        return new Promise(setImmediate).then(() => {
            const error = element.shadowRoot.querySelectorAll('p.error');
            expect(error.textContent).not.toBeNull();
            expect(error.textContent).toBe(MOCK_ERROR_OBJECT.body.message);
        });
    });
});


./__tests__/data/accounts.json
[
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00},
    { Id: '', Name: '', Phone: '', BillingCity: '', BillingState: '', BillingCountry: '', BillingPostalCode: '', AnnualRevenue: 0.00}
]


./__tests__/data/error.json
{
    status: 500,
    ok: false,
    body: {
        message: 'Error retrieving account record(s).'
    },
    statusText: 'ServerError'
}
