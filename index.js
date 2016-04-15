/*
 * TemplateString - Simple template strings
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/template-string/
 *
 * Released under the MIT license
 * https://github.com/asmblah/template-string/raw/master/MIT-LICENSE.txt
 */

'use strict';

var hasOwn = {}.hasOwnProperty;

/**
 * Replaces placeholders in `string` of the form `${...}`
 * if they are specified as own properties of `variables`
 *
 * @param {string} string
 * @param {Object.<string, string>} variables
 * @returns {string}
 */
function templateString(string, variables) {
    if (!variables) {
        // Nothing to do if no variables object was provided
        return string;
    }

    return string.replace(/\$\{([^}]+)}/g, function (all, name) {
        if (hasOwn.call(variables, name)) {
            return variables[name];
        }

        return all;
    });
}

module.exports = templateString;
