/**
 * @author LinWei
 * @copyright LinWei 2019
 * @description The function encode a set of form elements as string for submission.
 */
var serialize = (function() {
		"use strict";

		var empty = [];
		var nativeForEach = empty.forEach;

		/** Encode the key-value pair. */
		var join = function(key, value) {
			return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
		};

		/** The base implementation. */
		var baseSerialize = function(form) {
			var result = [];
			nativeForEach.call(form.elements, function(field) {
				if (field.type === 'submit' || field.type === 'button' || field.type === 'image' || field.type === 'file' || field.type === 'reset' || field.type === 'fieldset' || !field.name.length) {
					return;
				}
				if (field.type === 'select-one' || field.type === 'select-multiple') {
					nativeForEach.call(field.options, function(option) {
						if (option.selected) {
							result.push(join(field.name, option.hasAttribute('value') ? option.value : option.text));
						}
					});
				} else {
					if ((field.type === 'radio' || field.type === 'checkbox') && !field.checked) {
						return;
					}
					result.push(join(field.name, field.value));
				}
			});
			return result.join('&');
		};

		return function(form) {
			if (!(form instanceof HTMLFormElement)) {
				throw new TypeError("The argument is not type of 'HTMLFormElement'");
			}
			return baseSerialize(form);
		};
})();