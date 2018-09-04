/*------------------------------------*\
    Tips:
    1. assert 为 NODEJS 自带的断言库
    2. describe 一组测试用例
    3. it 一个测试用例
    4. window.setImmediate 参考本目录下 readme
\*------------------------------------*/

import assert from 'assert';
import User from './src/User';

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

describe('User', function() {
    it('should new without error!', function() {
        var user = new User('vanny');
    });
    describe('$save', function(done) {
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
             * 由于 done() 也接受一个 Error 实力
             * 所以可以简写为
             */
            user.save(done);

            /**
             * 此处可以看出, 业务逻辑代码必须接受一个回调函数
             * 用来处理测试程序代码。
             * 把测试代码混入逻辑代码中, 难受！！！
             * 考虑到 ajax 的异常又分为 代码错误/网络异常/业务逻辑异常 
             * 难受!!!
             */
        });
    });
    describe('$saveByPromise', function() {
        it('saveByPromise should be success', function(done) {
            var user = new User('vanny');
            return user.saveByPromise().should.eventually.have.length(3);
        });
    });
});
