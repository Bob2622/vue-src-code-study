/*------------------------------------*\
    Tips:
    1. assert 为 NODEJS 自带的断言库
    2. describe 一组测试用例
    3. it 一个测试用例
    4. window.setImmediate 参考本目录下 readme
    5. TODO 被测代码异常/测试代码异常/业务逻辑异常 此三种情况如何测
\*------------------------------------*/

import assert from 'assert';
import User from './src/User';

// 同步
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            /**
             * 以下下两种测试结果都为正常 ?
             */
            // ----------------------
            assert.equal([1, 2, 3].indexOf(4), -1);
            // !assert.equal([1, 2, 3].indexOf(4), -1);
            // ----------------------

            /**
             * 以上结果出现原因为
             * 是否测试通过的判断标准是 该段代码是否抛出 错误
             */
            // throw new Exception();

            /**
             * 是否抛出异常的标志是 是否使用关键字 throw 
             * 而不是是否 new Error()
             * 参考: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
             */
            // throw 'error'
        });

        it('double done', function(done) {
            /**
             * 同一个测试例子里调用两次 done 会报错
             */
            // setImmediate(done);
            setImmediate(done);

            /**
             * done 是干嘛用的？
             * 不写 done, terminal 中会报错
             * Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called
             * 可以看出 done 是用来标示该测试是否结束
             * 当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了
             * 否则，Mocha就无法知道，测试是否结束
             */
            
            /**
             * 但是我们从上条测试的例子可以看出
             * 如果不写形参 done, 就无需调用 done
             * 以此判断, done 主要用来测试异步执行的代码
             */
        });
    });
});

// 异步
describe('User', function() {
    it('should new without error!', function() {
        var user = new User('vanny');
    });

    // 一般异步
    describe('#save()', function(done) {
        it('save should be success', function(done){
            var user = new User('vanny');
            // user.save(function(err){
            //     if (err) {
            //         done(err);
            //     } else {
            //         done();
            //     };
            // });

            /**
             * 由于 done() 也接受一个 Error 实例
             * 所以可以简写为
             */
            user.save(done);

            /**
             * 测试此处测试是否成功的标准 
             * 1. 该段代码抛出异常
             * 2. 调用 done(err)
             */
            // aa = 1;
            // user.save(done);
            /**
             * 结论是: 两种情况都会导致测试失败
             */

            /**
             * 此处可以看出, 业务逻辑代码必须接受一个回调函数
             * 用来处理测试程序代码。
             * 把测试代码混入逻辑代码中, 难受！！！
             * 考虑到 ajax 的异常又分为 代码错误/网络异常/业务逻辑异常 
             * 难受!!!
             */
        });
    });


    // Promise
    describe('#saveByPromise()', function() {
        it('saveByPromise should be success', function() {
            var user = new User('vanny');
            /**
             * 方案1
             */
            // user.saveByPromise().then(response => {
            //     if (1) {
            //         done();
            //     } else {
            //         done(new Error());
            //     }
            // });

            /**
             * 方案2
             */
            // user.saveByPromise().then(done, done);

            /**
             * 方案3
             * 此方案需要 注释掉上面形参的 done
             */
            return user.saveByPromise();

            /**
             * 分析
             * 1. 实质上还是通过调用 done 来标示测试是否结束
             * 2. 通过 promise 可以让业务代码 与 测试逻辑分离
             * 3. 框架本身会判断返回值是否为 promise 对象。
                  如果返回值为 promise 对象。就调用 done 。
                  所以无需形参 done .
             */
        });
    });

    // async/await
    describe('#saveByAwait()', function(){
        it('saveByAwait should be success !', async function() {
            /**
             * 此时无需写 done 也无需显示返回 Promise 对象。
             * 因为此语法 代码会自动抛出 异常从而被外层捕获。
             */
            let user = new User('vanny');
            let response = await user.saveByAwait();
        });
    });

    // hook
    // before(() => {
    //     console.log('before User test ------');
    // });
    // after(() => {
    //     console.log('after User test ------');
    // });
    // beforeEach(() => {
    //     console.log('before each test --------');
    // });
    // afterEach(() => {
    //     console.log('after each test -------');
    // });

    // 待写测试 - pending test
    it('todo test');

    // 只测试该测试组
    // describe.only('only test this method', function(){
    //     it('only this it', () => {});
    // });
    
    // 只测试该测试单元
    // describe('only test one of my its', () => {
    //     it.only('only test this it', () => {});
    //     it('test this it', () => {});
    // });
    // 多个 only 可以并存测试
    

    // .skip()方法可以用于跳过某些测试测试集合和测试用例
    // 所有被跳过的用例都会被标记为pending用例，在报告中也会以pending用例显示
    // 最佳实践：使用.skip()方法来跳过某些不需要的测试用例而不是从代码中注释掉。

    // 动态 skip
    it('skip this it', function() {
        if ((Math.random()*100).toFixed(0) % 2 === 0) {
            this.skip();
        }
    });

    // 设置失败重复次数
    // 设置超过多久的时间，这个测试就显示为slow的
    // 设置超时
});
