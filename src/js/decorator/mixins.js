export function mixinsIn(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    }
}

