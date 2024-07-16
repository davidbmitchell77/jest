<template>
    <lightning-card title="Nested Component Demo" icon-name="custom:custom57">
        <div class="slds-var-m-around_medium">
            <c-child class="slds-show slds-is-relative" user-detail={userData}></c-child>
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
