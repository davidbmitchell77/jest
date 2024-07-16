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
