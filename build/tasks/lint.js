var runSequence = require('run-sequence');

module.exports = function (callback) {
	runSequence('lint:build', 'lint:source', callback);
};
