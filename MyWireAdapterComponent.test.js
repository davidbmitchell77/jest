<template>
    <lightning-card title="All Contacts" icon-name="standard.contact">
        <div class="slds-var-m-around_medium">
            <template if:true={contacts}>
                <template for:each={contacts} for:item="contact">
                    <div key={contact.Id}>
                        <li>{contact.Name}</li>
                    </div>
                </template>
            </template>
            <template if:true={error}>
                <div class="error">{error.body.message}</div>
            </template>
        </div>
    </lightning-card>
</template>

import { LightningElement, wire } from 'lwc';
import { showToast              } from 'c/utils';
import getContacts                from '@salesforce/apex/ContactController.getContacts';

export default class MyWireAdapterComponent extends LightningElement {
    contacts = [];
    error = undefined;

    @wire(getContacts, {})
    handle(response) {
        const { data, error } = response;
        if (data) {
           this.contacts = [ ...data ];
           this.error = undefined;
        }
        else if (error) {
            console.error(error);
            this.error = { ...error };
            this.contacts = [];
            showToast('Error retrieving contact data!', error.body.message, 'error', 'sticky');
        }
    }
}

import { createElement               } from 'lwc';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getContacts                     from '@salesforce/apex/ContactController.getContacts';
import MyWireAdapterComponent          from 'c/myWireAdapterComponent';

const MOCK_WIRE_ADAPTER = registerApexTestWireAdapter(getContacts);
const MOCK_CONTACT_DATA = require('./data/contacts.json');

describe('LWC Wire Adapter Test Suite', () => {

    beforeEach(() => {
        const element = createElement('c-my-wire-adapter-component', {
            is: MyWireAdapterComponent
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.remove(document.body.firstChild);
        }
    });

    test('return expected data', () => {
        const element = document.querySelector('c-my-wire-adapter-component');
        MOCK_WIRE_ADAPTER.emit(MOCK_CONTACT_DATA);
        return Promise.resolve().then(() => {
            const p = element.shadowRoot.querySelectorAll('p');
            expect(p.length).toBe(MOCK_CONTACT_DATA.length);
            expect(p[0].textContent).toBe(MOCK_CONTACT_DATA[0].Name);
        });
    });

    test('test @wire adapter error handling', () => {
        const element = document.querySelector('c-my-wire-adapter-component');
        MOCK_WIRE_ADAPTER.error();
        return Promise.resolve.then(() => {
            const div = element.shadowRoot.querySelector(.error);
            expect(div.textContent).not.toBeNull();
        });
    });
});


public with sharing class ContactController {
    private static final MAX_QUERY_SIZE = 200;
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id,
                       Name,
                       Title,
                       Phone,
                       Email,
                       Account.Name
                  FROM Contact
              ORDER BY Name
                 LIMIT :MAX_QUERY_SIZE
        ];
    }
}


./__tests__/data/contacts.json:
[
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } },
    { Id: '', Name: '', Title: '', Phone: '', Email: '', Account: { Id: '', Name: '' } }
]
