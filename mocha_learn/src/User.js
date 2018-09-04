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
            // var random = (Math.random()*100).toFixed(0);
            // if (random%2 == 0) {
            //     reject(new Error('save fail'));
            // } else {
            //     resolve();
            // }
            resolve();
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
};

export default User;
