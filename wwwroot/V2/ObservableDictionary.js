/**
 * Key value pair
 */
class Tuple
{
    key = null;
    value = null;

    constructor(key, value)
    {
        this.key = key;
        this.value = value;
    }
}


/**
 * C# Key value pair container with event handler
 */
class ObservableDictionary
{
    /**
     * Values
     */
    values = [];

    /**
     * Event Handler
     * @param handle function(TYPE, Tuple)
     */
    onChange = [];

    /**
     * Event Raiser
     */
    _raise(type, tuple)
    {
        this.onChange.forEach(h =>
        {
            h(type, tuple);
        });
    }

    /**
     * add / update
     */
    push(key, value)
    {
        //unique
        let index = this.indexOf(key);

        var tuple = new Tuple(key, value);

        if(index == -1)
        {
            this.values.push(tuple);
        }
        else
        {
            this.values[index] = tuple;
        }

        this._raise(ObservableDictionary.PUSH, tuple)
    }

    /**
     * FindIndex
     * @returns int
     */
    indexOf(key)
    {
        return this.values.findIndex(function(tuple)
        {
            return tuple.key === key;
        });
    }

    /**
     * @returns value
     */
    getValue(key)
    {
        let index = this.indexOf(key);
        if(index == -1)
        {
            return null;
        }
        else
        {
            return this.values[index].value;    
        }
    }

     /**
     * will call a factory method if null
     * @param factory func()
     * @returns value
     */
    getOrCreateValue(key, factory)
    {
        let index = this.indexOf(key);
        if(index == -1)
        {
            let value = factory();
            this.push(key, value)
            return value;
        }
        else
        {
            return this.values[index].value;    
        }
    }


    /**
     * Remove
     * @returns bool
     */
    remove(key)
    {
        let index = this.indexOf(key);

        if(index > -1)
        {
            let value = this.values[index];
            this.values.splice(index, 1);
            this._raise(ObservableDictionary.REMOVE, value)
            return true;
        }
        return false;
    }

    /**
     * Has?
     * @returns bool
     */
    contains(key)
    {
        return this.indexOf(key) >= 0;
    }

    /**
     * Remove All
     */
    clear()
    {
        this.values = [];
        this._raise(ObservableDictionary.CLEAR, null)
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
}

/** CONST */
Object.defineProperty(ObservableDictionary, 'PUSH', { value: 0 });
/** CONST */
Object.defineProperty(ObservableDictionary, 'REMOVE', { value: 1 });
/** CONST */
Object.defineProperty(ObservableDictionary, 'CLEAR', { value: 2 });
