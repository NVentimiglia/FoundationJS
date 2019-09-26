/**
 * Abstraction for Observable pattern
 * a Model
 */
class Observable
{    
    /**
     * change event handler
     * int / function(model)
     */
    onChange = new ObservableDictionary();

    /**
     * counter for event handler
     */
    _counter = 0;

    /**
     * change event raiser
     */
    raiseChange()
    {
        let that = this;
        this.onChange.forEach(h =>
        {
            h.value(that);
        });
    }

    /**
     * adds handler
     * @param handler function(model)
     * @returns reference
     */
    subscribe(handler)
    {
        this._counter ++;
        this.onChange.push(this._counter, handler);
        return this._counter;
    }

    /**
     * removes handler
     * @param ref handle identity passed from subscribe
     */
    unsubscribe(ref)
    {
        this.onChange.remove(ref);
    }
}
