const { leftPad, arrowHead } = require('../headStar');

let result = [];
console.log = function (msg) {
    result.push(msg);
};

describe('ArrowHead', () => {
    const seven = ['*', ' *', '  *', '   *', '  *', ' *', '*'];
    const ten = [
        '*',
        ' *',
        '  *',
        '   *',
        '    *',
        '    *',
        '   *',
        '  *',
        ' *',
        '*',
    ];

    beforeEach(() => {
        result = [];
    });

    it('validate left pad function', () => {
        expect(leftPad(3)).toEqual('  *');
    });

    it('validate display arrow for 7', () => {
        arrowHead(7);
        expect(result).toEqual(seven);
    });

    it('validate display arrow for 10', () => {
        arrowHead(10);
        expect(result).toEqual(ten);
    });
});
