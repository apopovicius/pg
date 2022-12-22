function isdigit(ch) {
    switch (ch) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return true;
        default:
            return false;
    }
}

function solution(myStr) {
    let stack = [];
    let result = 0,
        pos = 0;

    for (let ch of myStr) {
        if (isdigit(ch)) {
            stack[pos++] = parseInt(ch, 10);
        } else if (ch == '+') {
            // we have 2 items to pop
            if (pos - 2 >= 0) {
                result = stack[pos - 1] + stack[pos - 2];
                pos -= 2; // reduce the stack with 2
                stack[pos++] = result;
            } else {
                return -1;
            }
        } else if (ch == '*') {
            if (pos - 2 >= 0) {
                result = stack[pos - 1] * stack[pos - 2];
                pos -= 2; // reduce the stack with 2
                stack[pos++] = result;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
    return stack[pos - 1];
}

console.log(solution('13+62*7+*'));
