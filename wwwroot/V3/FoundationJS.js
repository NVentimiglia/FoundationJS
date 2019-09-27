/**
 * Wraps a @type {function} so that it can be equaled
 */
class Callback
{
    /**
     * function
     * @type {function}
     */
    func = null;
    /**
     * @param func {function}
     */
    constructor(func)
    {
        this.func = func;
    }

    this()
    {
        this.func();
    }
}

/**
 * List of Callbacks
 */
class EventHandler
{
    /**
     * @type {Callback[]} all callbacks
     */
    _callbacks = [];

    /**
     * subscribes to the event
     * @param callback {Callback} a callback
     */
    add(callback)
    {
        if(!(callback instanceof Callback))
        {
            console.error("!(callback instanceof Callback)")
            return;
        }

        this._callbacks.push(callback);
    }

    /**
     * unsubscribes to the event
     * @param callback {Callback} a callback
     */
    remove(callback)
    {
        if(!(callback instanceof Callback))
        {
            console.error("!(callback instanceof Callback)")
            return;
        }

        let index =this._callbacks.findIndex(call =>
        {
            return (call === callback);
        })

        if(index > -1)
        {
            this._callbacks.splice(index, 1);
        }
    }

    /**
     * unsubscribes all
     */
    clear()
    {
        this._callbacks = [];
    }

    /**
     * raise event with optional args
     */
    raise(arg1 = null, arg2 = null, arg3 = null, arg4 = null)
    {
        this._callbacks.forEach(cb => 
        {
            cb.func(arg1, arg2, arg3, arg4);
        });
    }
}


/**
 * Strongly typed @type {object} array with helpers and changed event
 */
class List
{
    /**
     * @type {object[]}
     */
    values = [];

    /**
     * @type {function} enum, value
     */
    onChange = new EventHandler();

    /**
     * Raises change
     * @param {enum} type 
     * @param {object} value 
     */
    _raise(type, value)
    {
        this.onChange.forEach(h =>
        {
            h(type, value);
        });
    }

    /** 
     * is object check
     * @param {object} value */
    _isObject(value)
    {
        return typeof value === 'object' 
    }

    /**
     * add / update
     * @param {object} value
     */
    push(value)
    {
        //unique
        let index = this.findIndex(key);

        if(index == -1)
        {
            this.values.push(value);
        }
        else
        {
            this.values[index] = value;
        }

        this._raise(List.PUSH, tuple)
    }

    /**
     * Remove
     * @param {object} value
     * @returns bool
     */
    remove(key)
    {
        let index = this.findIndex(key);

        if(index > -1)
        {
            let value = this.values[index];
            this.values.splice(index, 1);
            this._raise(List.REMOVE, value)
            return true;
        }
        return false;
    }
    
    /**
     * Has?
     * @param {object} value
     * @returns bool
     */
    contains(value)
    {
        return this.findIndex(function (e)
        {
            return e === value;
        });
    }

    /**
     * Remove All
     */
    clear()
    {
        this.values = [];
        this._raise(List.CLEAR, null)
    }

    // #region find

    /**
     * @param {function} predicate
     * @returns {object} instance
     */
    find(predicate)
    {
        return this.values.find(predicate);
    }

    /**
     * @param {function} predicate
     * @returns {function} predicate
     */
    findIndex(predicate)
    {
        return this.values.findIndex(predicate);
    }

    // #endregion

    // #region itteratiors
    /**
     * Itterator
     * @param handle function({index} {object})
     */
    for(handle)
    {
        for (let index = 0; index < values.length; index++)
        {
            let element = values[index];
            handle(index, element);            
        }
    }

     /**
     * Itterator
     * @param handle function({index} {object})
     */
    for(handle)
    {
        for (let index = 0; index < values.length; index++)
        {
            let element = values[index];
            handle(index, element);    
        }
    }

     /**
     * Itterator
     * @param handle function({index} {object})
     */
    forReverse(handle)
    {
        for (let index = values.length; index >= 0; index--)
        {
            let element = values[index];
            handle(index, element);    
        }
    }

    /**
     * Itterator
     * @param handle function(Tuple)
     */
    forEach(handle)
    {
        this.values.forEach(element => {
            handle(element);
        });
    }

     /**
     * Itterator
     * @param handle function(Tuple)
     */
    forEachReverse(handle)
    {
        for (let index = values.length; index >= 0; index--)
        {
            let element = values[index];
            handle(element);    
        }
    }

    // #endregion
}

/** CONST */
Object.defineProperty(List, 'PUSH', { value: 0 });
/** CONST */
Object.defineProperty(List, 'REMOVE', { value: 1 });
/** CONST */
Object.defineProperty(List, 'CLEAR', { value: 2 });