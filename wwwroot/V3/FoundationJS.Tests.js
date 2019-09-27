
function AssertEquals(x,y)
{
    if(x !== y)
    {
        console.error("Failed");
    }
}


class FoundationTests
{
    run()
    {
        this.TestCallback();
        this.TestCallbackArgs();
        this.TestEventHandler();
        this.TestEventHandlerArgs();
    }

    TestCallback()
    {
        let counter = 0;

        let handle = function handler()
        {
            counter ++;
        }
        let callback = new Callback(handle);
        callback.func();
        AssertEquals(counter, 1);
        console.log("TestCallback Passed");
    }

    TestCallbackArgs()
    {
        let counter = 0;

        let handle = function handler(arg1, arg2)
        {
            AssertEquals(arg1, "test");
            AssertEquals(arg2, "test2");
            counter ++;
        }
        let callback = new Callback(handle);
        callback.func("test", "test2");
        AssertEquals(counter, 1);
        console.log("TestCallbackArgs Passed");
    }
    
    TestEventHandler()
    {
        let counter = 0;
        let handler = new EventHandler();

        let handle = function handler()
        {
            counter ++;
        }
        let callback = new Callback(handle);

        let handle2 = function handler2()
        {
            counter ++;
        }
        let callback2 = new Callback(handle2);

        handler.add(callback)
        handler.raise();
        AssertEquals(counter, 1);
        
        handler.add(callback2)
        handler.raise();
        AssertEquals(counter, 3);

        handler.remove(callback2)
        handler.raise();
        AssertEquals(counter, 4);

        handler.clear()
        handler.raise();
        AssertEquals(counter, 4);
        
        console.log("TestEventHandler Passed");
    }

    TestEventHandlerArgs()
    {
        let counter = 0;
        let handler = new EventHandler();

        let handle = function handler(arg1)
        {
            AssertEquals(arg1, "test");
            counter ++;
        }
        let callback = new Callback(handle);

        let handle2 = function handler2(arg1)
        {
            AssertEquals(arg1, "test");
            counter ++;
        }

        let callback2 = new Callback(handle2);

        handler.add(callback)
        handler.raise("test");
        AssertEquals(counter, 1);
        
        handler.add(callback2)
        handler.raise("test");
        AssertEquals(counter, 3);

        handler.remove(callback2)
        handler.raise("test");
        AssertEquals(counter, 4);

        handler.clear()
        handler.raise("test");
        AssertEquals(counter, 4);
        
        console.log("TestEventHandler Passed");
    }
}