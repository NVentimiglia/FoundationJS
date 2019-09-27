
function AssertEquals(x,y)
{
    if(x !== y)
    {
        console.error("Failed");
    }
}

function AssertNotEquals(x,y)
{
    if(x === y)
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
        this.TestLists();
        this.TestViewUtility_Instantiate();
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

        handler.subscribe(callback)
        handler.raise();
        AssertEquals(counter, 1);
        
        handler.subscribe(callback2)
        handler.raise();
        AssertEquals(counter, 3);

        handler.unsubscribe(callback2)
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

        handler.subscribe(callback)
        handler.raise("test");
        AssertEquals(counter, 1);
        
        handler.subscribe(callback2)
        handler.raise("test");
        AssertEquals(counter, 3);

        handler.unsubscribe(callback2)
        handler.raise("test");
        AssertEquals(counter, 4);

        handler.clear()
        handler.raise("test");
        AssertEquals(counter, 4);
        
        console.log("TestEventHandler Passed");
    }

    TestLists()
    {
        var list = new List();

        AssertEquals(list.count(), 0);

        let expectedType = null;
        let expectedObject = null;

        list.subscribe(new Callback(function(type, object)
        {            
            AssertEquals(expectedType, type);
            AssertEquals(expectedObject, object);
        }));

        expectedObject = 1;
        expectedType = List.PUSH;

        list.push(expectedObject);
        AssertEquals(list.count(), 1);

        expectedObject = 2;
        expectedType = List.PUSH;

        list.push(expectedObject);
        AssertEquals(list.count(), 2);

        expectedType = List.REMOVE;
        list.remove(expectedObject)
        AssertEquals(list.count(), 1);

        expectedType = List.CLEAR;
        expectedObject = null;
        list.clear();
        AssertEquals(list.count(), 0);

        console.log("TestLists Passed");
    }

    TestViewUtility_Instantiate()
    {
        let parent = document.getElementById("parent");
        let prefab = document.getElementById("prefab");
        let inst1 = ViewUtility.Instantiate(prefab, parent, "inst1");
        AssertEquals(inst1.id, "inst1");
        AssertEquals(inst1.parentElement, parent);
        
        let inst2 = ViewUtility.Instantiate(prefab, parent);
        AssertNotEquals(inst1.id, "prefab");
        AssertEquals(inst1.parentElement, parent);

        parent.removeChild(inst1);
         
        console.log("TestViewUtility_Instantiate Passed");
    }
}