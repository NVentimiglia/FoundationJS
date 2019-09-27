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
     * @param {Callback} callback
     */
    subscribe(callback)
    {
        if(!(callback instanceof Callback))
        {
            console.warn("!(callback instanceof Callback)")            
            callback = new Callback(callback);
        }

        this._callbacks.push(callback);
    }

    /**
     * @param {Callback} callback
     */
    unsubscribe(callback)
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
    /** CONST */
    static PUSH = 0;
    /** CONST */
    static REMOVE = 1;
    /** CONST */
    static CLEAR = 2;

    /**
     * @type {object[]}
     */
    values = [];

    /**
     * @type {EventHandler} enum, value
     */
    onChange = new EventHandler();

    /**
     * Raises change
     * @param {enum} type 
     * @param {object} value 
     */
    _raise(type, value)
    {
        this.onChange.raise(type, value);
    }

    /** 
     * is object check
     * @param {object} value */
    _isObject(value)
    {
        return typeof value === 'object' 
    }

    /**
     * length
     */
    count()
    {
        return this.values.length;
    }

    /**
     * add / update
     * @param {object} value
     */
    push(value)
    {
        //unique
        let index = this.indexOf(value);

        if(index == -1)
        {
            this.values.push(value);
        }
        else
        {
            this.values[index] = value;
        }

        this._raise(List.PUSH, value)
    }

    /**
     * Remove
     * @param {object} value
     * @returns bool
     */
    remove(key)
    {
        let index = this.indexOf(key);

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

    // #region observable

    /**
     * @param {Callback} callback
     */
    subscribe(callback)
    {
        this.onChange.subscribe(callback);
    }

    /**
     * @param {Callback} callback
     */
    unsubscribe(callback)
    {
        this.onChange.unsubscribe(callback);
    }

    // #endregion

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
     * @param {object} obj
     * @returns {function} predicate
     */
    indexOf(obj)
    {
        return this.values.findIndex(function(e)
        {
            return e === obj;
        });
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

    // #region Iterators
    /**
     * Iterator
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
     * Iterator
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
     * Iterator
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
     * Iterator
     * @param handle function(Tuple)
     */
    forEach(handle)
    {
        this.values.forEach(element => {
            handle(element);
        });
    }

     /**
     * Iterator
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

/**
 * Utility helper for views
 */
class ViewUtility
{
    static _counter = 0;

    /**
     * Creates a new view element from a prefab template
     * @param {HtmlElement} prefab the template dom element
     * @param {HtmlElement} parent the hosting dom element
     * @param {string} id the new id of the instance
     * @returns {HtmlElement} the created dom element
     */
    static Instantiate(prefab, parent, id = null)
    {
        if(id === null)
        {
            this._counter++;
            id = prefab.id + this._counter;
        }

        let instance = prefab.cloneNode(true)
        instance.id = id;
        parent.appendChild(instance);
        return instance;
    }
    
    /**
     * 
     * @param {*} parent 
     */
    static GetChildren(parent)
    {
        return parent.children;
    }

    /**
     * 
     * @param {*} child 
     */
    static GetSiblings(child)
    {
        return child.parentElement.children.filter( c => c != child);
    }
    
    /**
     * 
     * @param {*} index 
     * @param {*} child 
     */
    static MoveSibling(index, child)
    {
        return this.InsertSibling(index, child, child.parentElement);
    }

    /**
     * 
     * @param {*} index 
     * @param {*} parent 
     * @param {*} child 
     */
    static InsertSibling(index, parent, child)
    {
        let siblings = this.GetSiblings(parent);

        if(siblings.length > index)
        {
            siblings[index].insertAdjacentElement('beforebegin', child);
        }
        else
        {
            parent.appendChild(instance);
        }
    }
}