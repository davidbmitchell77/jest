<template>
    <lightning-card title="User List" icon:name="standard:user">
        <div class="slds-var-m-around_medium">
            <div class="forEach" for:each={userDetails} for:item="u">
                <li key={id}>{u.name}</li>
            </div>
        </div>
            <div class="iterator" iterator:user={userDetails}>
                <li key={user.value.id}>
                    <div class="slds-text-heading_large" if:true={user.first}>BEGIN LIST</div>
                    <div class="slds-text-body">{user.value.name}</div>
                    <div class="slds-text-heading_large" if:true={user.last}>END LIST</div>
                </li>
            </div>
        </div>
    </lightning-card>
</template>

import { createElement } from 'lwc';
import MyLoopingComponent from 'c/my-looping-component';

describe('my-looping-component test suite', () => {

    beforeEach(() => {
        const element = createElement('c-my-looping-component', {
            is: MyLoopingComponent
        });
        document.body.appendChild(element);
    });

    test('check user list length', () => {
        const element = document.querySelector('c-my-looping-component');
        const userDetails = Array.from(element.shadowRoot.querySelectorAll('.forEach>li'));
        expect(userDetails.length).toBe(4);
    });

    test('display user list is in specific order', () => {
        const element = document.querySelector('c-my-looping-component');
        const userDetails = Array.from(element.shadowRoot.querySelectorAll('.iterator>p'));
        expect(userDetails).toEqual(DATA);
    });

    test('display first and last headings in iterator loop', () => {
        const element  = document.querySelector('c-my-looping-component');
        const divFirst = element.shadowRoot.querySelector('.iterator>li:first-child>div:first-child');
        const divLast  = element.shadowRoot.querySelector('.iterator>li:last-child>div:last-child'  );
        expect(divFirst.textContent).toBe('BEGIN LIST');
        expect(divLast.textContent ).toBe('END LIST'  );
    });
});


import { LightningElement } from 'lwc';

const DATA = [
    { id: '1', name: 'Gene'  },
    { id: '2', name: 'Paul'  },
    { id: '3', name: 'Ace'   },
    { id: '4', name: 'Peter' }
];

export default class MyLoopingComponent extends LightningElement {
    userDetails = [ ...DATA ];
}
