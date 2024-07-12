import { createElement } from '/lwc/;
import HelloWorld from 'c/helloWorld';

describe('c-hello-world test suite', () => {

    beforeEach(() => {
        const element = createElement('c-hello-world', {
            is: HelloWorld
        });
        document.body.appendChild(element);
        const div = element.shadowRoot.querySelectorAll('div')[0];
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

    test('text not equals \'Hello, Joe\'', () => {
        const element = document.querySelector('div')[0];
        const div = element.shadowRoot('div');
        expect(div.textContent).not.toBe('Hello, Joe, what do you know?!');
    });

    test('validate input', () => {
        const element = document.querySelector('c-hello-world');
        const input = element.shadowRoot('lightning-input');
        input.value = 'Hello again!';
        input.dispatchEvent(new CustomEvent('change'));
        const text = element.shadowRoot('lightning-input');
        return Promise.resolve.then(() => {
            expect(text.textContent).toBe('Hello again!');
        }
    });
});
