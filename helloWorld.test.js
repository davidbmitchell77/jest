<template>
    <lightning-card title="2-Way Data Binding" icon-name="utility:bucket">
        <div class="slds-var-m-around_medium">
            <lightning-input type="text" label="Enter course name:" placeholder={title} onkeyup={changeHandler}></lightning-input>
            <div>"<strong>{fullname}</strong>" is a course of <strong>{title}</strong>.</div>
        </div>
    </lightning-card>
    <lightning-card title="@track properties" icon-name="utility:case">
        <div class="slds-var-m-around_medium">
            <lightning-input type="text" label="Enter city name:" placeholder={address.city} onkeyup={trackHandler}></lightning-input>
            <div>"<strong>{address.city},&nbsp;{address.state}&nbsp;{address.zip}</strong>" is a city in <strong>{address.country}</strong>.</div>
        </div>
    </lightning-card>
    <lightning-card title="Getter Example" icon-name="utility:metrics">
        <div class="slds-var-m-around_medium">
            <lightning-input type="number" label="Enter 1st number:" placeholder=0 step=1 onkeyup={num1Handler}></lightning-input>
            <lightning-input type="number" label="Enter 2nd number:" placeholder=0 step=1 onkeyup={num2Handler}></lightning-input>
            <div><strong>{num1} ** {num2} = {result}</strong></div>
        </div>
    </lightning-card>
</template>


import { createElement } from 'lwc';
import HelloWorld from 'c/helloWorld';

describe('c-hello-world test suite', () => {

    beforeEach(() => {
        const element = createElement('c-hello-world', {
            is: HelloWorld
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while(document.body.firstChild) {
            document.body.remove(document.body.firstChild);
        }
    });

    test('1 + 1 equals 2', () => {
        let n = 1 + 1;
        expect(n).toBe(2);
    });

    test('text equals \'Hello, world!\'', () => {
        const element = document.querySelector('div')[0];
        const div = element.shadowRoot('div');
        expect(div.textContent).toBe('Hello, world!');
    });

    test('text not equals \'Hello, Joe!\'', () => {
        const element = document.querySelector('div')[0];
        const div = element.shadowRoot('div');
        expect(div.textContent).not.toBe('Hello, Joe, what do you know?!');
    });

    test('validate input', () => {
        const element = document.querySelector('c-hello-world');
        const input = element.shadowRoot('lightning-input');
        input.value = 'Hello again!';
        input.dispatchEvent(new CustomEvent('change'));
        const text = element.shadowRoot('p');
        return Promise.resolve.then(() => {
            expect(text.textContent).toBe('Hello again!');
        }
    });
});


import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
}
