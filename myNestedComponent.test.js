<template>
    <lightning-card title="Nested Component Demo" icon-name="custom:custom57">
        <div class="slds-var-m-around_medium">
            <c-child-component class="slds-show slds-is-relative" user-detail={userData}></c-child-component>
        </div>
    </lightning-card>
</template>

import { LightningDataElement } from 'lwc';
const DATA = {
    id: '1',
    name: 'David'
};
export default class NestedComponentDemo extends LightningDataElement {
    userData = { ...DATA };
}

import { createElement } from 'lwc';
import NestedComponentDemo from 'c/nestedComponentDemo';
describe('nested-component-demo test suite', () => {
    beforeEach(() => {
        const element = createElement('nested-component-demo', {
            is: NestedComponentDemo
        });
        document.body.appendChild(element);
    });
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.remove(document.body.firstChild);
    });
    test('test child component is rendered', () => {
        const parentComponent = document.querySelector('nested-component-demo');
        const childComponents = parentComponent.shadowRoot.querySelectorAll('c-child-component');
        expect(childComponents.length).toBe(1);
    });
    test('userDetail variable data is correct', () => {
        const parentComponent = document.querySelector('nested-component-demo');
        const childComponent  = parentComponent.shadowRoot.querySelector('c-child-component');
        expect(childComponent.userDetail.name).toBe('David');
    });
});


<template>
    <template if:true={userDetail}>
        <div>{userDetail.name}</div>
    </template>
    <template if:false={userDetail}>
        <p>No user data available.</p>
    </template>
</template>

import { LightningDataElement, api  } from 'lwc';
export default class ChildComponent extends LightningDataElement {
    @api userDetail;
}

import { createElement} from 'lwc';
import ChildComponent from 'c/childComponent';
const USER_DETAIL = {
    id: '1',
    name: 'David'
};
describe('c-child-component test suite', () => {
    beforeEach(() => {
        const element = createElement('c-child-component', {
            is: ChildComponent
        });
        documemt.body.appendChild(element);
    });
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.remove(document.body.firstChild);
        }
    });
    test('name renders correctly', () => {
        const element = document.querySelector('c-child-component');
        element.userDetail = { ...USER_DETAIL };
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe(USER_DETAIL.name);
    });
    test('\'no user data available\' message renders when no data', {
        const element = document.querySelector('c-child-component');
        element.userDetail = {};
        const p = element.shadowRoot.querySelector('p');
        expect(p.textContent).toBe('No user data available.');
    });
});
