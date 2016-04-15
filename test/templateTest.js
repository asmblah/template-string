/*
 * TemplateString - Simple template strings
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/template-string/
 *
 * Released under the MIT license
 * https://github.com/asmblah/template-string/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('microdash'),
    expect = require('chai').expect,
    templateString = require('..');

describe('templateString()', function () {
    _.each({
        'with an empty string': {
            string: '',
            variables: {},
            expectedResult: ''
        },
        'with no placeholders': {
            string: 'hello world',
            variables: {},
            expectedResult: 'hello world'
        },
        'unspecified placeholders should be ignored': {
            string: 'hello ${there} world',
            variables: {},
            expectedResult: 'hello ${there} world'
        },
        'with placeholder specified': {
            string: 'hello world from ${who}',
            variables: {
                who: 'Fred'
            },
            expectedResult: 'hello world from Fred'
        },
        'with same placeholder multiple times': {
            string: 'hello world from ${who}, yes ${who}',
            variables: {
                who: 'John'
            },
            expectedResult: 'hello world from John, yes John'
        },
        'with special patterns in the replacement string': {
            string: 'this has ${first}, ${second}, ${third}, ${fourth} and ${fifth} inside',
            variables: {
                first: '$',
                second: '$&',
                third: '$`', // "$'" is a special replacement for all text up to the matched string
                fourth: '$\'', // "$'" is a special replacement for the rest of the matched string
                fifth: '$1' // "$n" references a capturing group
            },
            expectedResult: 'this has $, $&, $`, $\' and $1 inside'
        },
        'replacements with embedded placeholders should not be recursively processed': {
            string: 'hello ${there} world',
            variables: {
                there: '${myReplacement}',
                myReplacement: 'I should be ignored'
            },
            expectedResult: 'hello ${myReplacement} world'
        },
        'only own properties of the variables object should be used': {
            string: 'my ${stuff} here',
            variables: Object.create({
                stuff: 'I should be ignored'
            }),
            expectedResult: 'my ${stuff} here'
        },
        'replacement variables object should be optional': {
            string: 'my ${stuff} here',
            variables: undefined,
            expectedResult: 'my ${stuff} here'
        }
    }, function (scenario, description) {
        describe(description, function () {
            it('should return the expected result', function () {
                expect(templateString(scenario.string, scenario.variables)).to.equal(scenario.expectedResult);
            });
        });
    });
});
