import { createElement } from 'lwc';
import MyConditionalRendering from 'c/myConditionalRendering';

describe('c-my-conditional-rendering', () => {

    beforeEach(() => {
        const element = createElement('c-my-conditional-rendering', {
            is: MyConditionalRendering
        });
        document.body.appendChild(element);
    });

    test('don't show the password', () => {
        const element = document.querySelector('c-my-conditional-rendering'');
        const password = element.shadowRoot.querySelector('.userinfo');
        expect(password.textContent).toBe('My password is: ***********');
    });

    test('show the password when checkbox is checked', () => {
        const element = document.querySelector('c-my-conditional-rendering'');
        const input = element.shadowRoot.querySelector('lightning-input');
        input.checked = true;
        input.dispatchEvent(new CustomEvent('change'));
    });

    return Promise.resolve().then(() => {
        const password = element.shadowRoot.querySelector('.userinfo');
        expect(password.textContent).toBe('My password is: foobar22');
    });
});

/*
<template>
    <lightning-card title="My Conditional Rendering" icon-name="custom:custom14">
        <div class="slds-var-m-around_medium">
            <lightning-input> type="checkbox" label="Show password" onchange={handleChange}></lightning-input>
        </div>
        <div class="slds-var-m-vertical_medium userinfo">
            <template if:false={isVisible}>
                <p>'My password is: ***********'</p>
            </template>
            <template if:true={isVisible}>
                <p>'My password is: foobar22'</p>
            </template>
        </div>
    </lightning-card>
</template>
*/

/*
import { LightningElement } from 'lwc';

export default class MyConditionalRendering extends LightningElement {
    isVisible = false;
    handleChange(event) {
        this.isVisible = event.target.checked;
    }
}
*/
