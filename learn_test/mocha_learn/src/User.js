const save = function (callback) {
    setTimeout(function () {
        var random = (Math.random()*100).toFixed(0);
        if (random%2 == 0) {
            callback(new Error('save fail'));
        } else {
            callback();
        }
    }, 1000);
}

const saveByPromise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var random = (Math.random()*100).toFixed(0);
            if (random%2 == 0) {
                reject(new Error('save fail'));
            } else {
                resolve();
            }
        }, 1000);
    });
}

async function saveByAwait () {
    // 该代码并不会起到 await 的作用, 可以 debug 测试下
    // let response = await setTimeout(() => {}, 1000);

    // async/await 只是配合 Promise 的语法糖。
    let response = await new Promise((resolve, reject) => {
        setTimeout(() => {
            var random = (Math.random()*100).toFixed(0);
            if (random%2 == 0) {
                reject(new Error('saveByAwait fail'));
            } else {
                resolve();
            }
        }, 1000);
    });
}

const User = function (name) {
    if ((typeof name) !== 'string') {
        throw 'name must be a string !';
    }
    this.name = name;
    this.save = save;
    this.saveByPromise = saveByPromise;
    this.saveByAwait = saveByAwait;
};

export default User;
