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
     * @returns reference
     */
    subscribe()
    {
        this._counter ++;
    }
}
