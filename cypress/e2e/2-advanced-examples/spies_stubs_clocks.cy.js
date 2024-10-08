/**
 * This file contains examples of how to use spies, stubs, and clocks in Cypress.
 * @file The file is saved as `cypress/e2e/2-advanced-examples/spies_stubs_clocks.cy.js`.
 */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/// <reference types="cypress" />

context('Spies, Stubs, and Clock', () => {
  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo() {},
    };

    const spy = cy.spy(obj, 'foo').as('anyArgs');

    obj.foo();

    expect(spy).to.be.called;
  });

  it('cy.spy() retries until assertions pass', () => {
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      /**
       * Prints the argument passed.
       * @param {any} x - The argument to be printed.
       * @example This is an example of how to use the foo method.
       * obj.foo('example argument 1', 'example argument 2');
       * obj.foo('example argument');
       */
      foo(x) {
        console.log('obj.foo called with', x);
      },
    };

    cy.spy(obj, 'foo').as('foo');

    setTimeout(() => {
      obj.foo('first');
    }, 500);

    setTimeout(() => {
      obj.foo('second');
    }, 2500);

    cy.get('@foo').should('have.been.calledTwice');
  });

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      /**
       * Prints both arguments to the console.
       * @param {string} a - The first argument.
       * @param {string} b - The second argument.
       * @example This is an example of how to use the isGreaterThan function.
       * obj.foo('example argument 1', 'example argument 2');
       */
      foo(a, b) {
        console.log('a', a, 'b', b);
      },
    };

    const stub = cy.stub(obj, 'foo').as('foo');

    obj.foo('foo', 'bar');

    expect(stub).to.be.called;
  });

  it('cy.clock() - control time in the browser', () => {
    // https://on.cypress.io/clock

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#clock-div').click();
    cy.get('#clock-div').should('have.text', '1489449600');
  });

  it('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick

    // create the date in UTC so it's always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#tick-div').click();
    cy.get('#tick-div').should('have.text', '1489449600');

    cy.tick(10000); // 10 seconds passed
    cy.get('#tick-div').click();
    cy.get('#tick-div').should('have.text', '1489449610');
  });

  it('cy.stub() matches depending on arguments', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const greeter = {
      /**
       * Greets a person.
       * @param {string} name - The name of the person to greet.
       * @returns {string} A greeting message.
       * @example This is an example of how to use the isGreaterThan function.
       * greeter.greet('Alice'); // returns 'Hello, Alice!'
       */
      greet(name) {
        return `Hello, ${name}!`;
      },
    };

    cy.stub(greeter, 'greet')
      .callThrough() // if you want non-matched calls to call the real method
      .withArgs(Cypress.sinon.match.string)
      .returns('Hi')
      .withArgs(Cypress.sinon.match.number)
      .throws(new Error('Invalid name'));

    expect(greeter.greet('World')).to.equal('Hi');
    expect(() => greeter.greet(42)).to.throw('Invalid name');
    expect(greeter.greet).to.have.been.calledTwice;

    // non-matched calls goes the actual method
    expect(greeter.greet()).to.equal('Hello, undefined!');
  });

  it('matches call arguments using Sinon matchers', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const calculator = {
      /**
       * Returns the sum of two arguments.
       * @param {number} a - The first number.
       * @param {number} b - The second number.
       * @returns {number} The sum of the two numbers.
       * @example This is an example of how to use the isGreaterThan function.
       * calculator.add(2, 3); // returns 5
       */
      add(a, b) {
        return a + b;
      },
    };

    const spy = cy.spy(calculator, 'add').as('add');

    expect(calculator.add(2, 3)).to.equal(5);

    // if we want to assert the exact values used during the call
    expect(spy).to.be.calledWith(2, 3);

    // let's confirm "add" method was called with two numbers
    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon.match.number,
    );

    // alternatively, provide the value to match
    expect(spy).to.be.calledWith(
      Cypress.sinon.match(2),
      Cypress.sinon.match(3),
    );

    // match any value
    expect(spy).to.be.calledWith(Cypress.sinon.match.any, 3);

    // match any value from a list
    expect(spy).to.be.calledWith(Cypress.sinon.match.in([1, 2, 3]), 3);

    /**
     * Returns true if the given number is even.
     * @param {number} x - The number to check.
     * @returns {boolean} True if the number is even, false otherwise.
     * @example This is an example of how to use the isGreaterThan function.
     * isEven(2); // returns true
     * isEven(3); // returns false
     */
    const isEven = x => x % 2 === 0;

    // expect the value to pass a custom predicate function
    // the second argument to "sinon.match(predicate, message)" is
    // shown if the predicate does not pass and assertion fails
    expect(spy).to.be.calledWith(Cypress.sinon.match(isEven, 'isEven'), 3);

    /**
     * Returns a function that checks if a given number is larger than the limit.
     * @param {number} limit - The limit to compare against.
     * @returns {(x: number) => boolean} A function that checks if a given number is larger than the limit.
     * @example
     * const greaterThan10 = isGreaterThan(10);
     * console.log(greaterThan10(11)); // true
     * console.log(greaterThan10(9)); // false
     */
    const isGreaterThan = limit => x => x > limit;

    /**
     * Returns a function that checks if a given number is less than the limit.
     * @param {number} limit - The limit to compare against.
     * @returns {(x: number) => boolean} A function that checks if a given number is less than the limit.
     * @example
     * const lessThan10 = isLessThan(10);
     * console.log(lessThan10(5)); // true
     * console.log(lessThan10(15)); // false
     */
    const isLessThan = limit => x => x < limit;

    // you can combine several matchers using "and", "or"
    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(2), '> 2')
        .and(Cypress.sinon.match(isLessThan(4), '< 4')),
    );

    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(200), '> 200')
        .or(Cypress.sinon.match(3)),
    );

    // matchers can be used from BDD assertions
    cy.get('@add').should(
      'have.been.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon.match(3),
    );

    // you can alias matchers for shorter test code
    const { match: M } = Cypress.sinon;

    cy.get('@add').should('have.been.calledWith', M.number, M(3));
  });
});
