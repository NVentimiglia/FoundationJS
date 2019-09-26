/**
 * Abstraction for handling model change.
 * A View
 */
class Observer
{
    /**
     * data
     */
    model = null;

    _handle = 0;

    /**
     * has data
     */
    hasModel()
    {
        return this.model !== null && this.model !== undefined;
    }

    bind(model)
    { 
        // -= unbind
        if(this.model !== null)
        {
            this.model.unsubscribe(this._handle);
        }

        // bind
        this.model = model;
        let m = model;

        // += bind
        if(this.model !== null)
        {
            this._handle = this.model.subscribe(() =>
            {
                this.onBind(m);
            });
        }

        this.onBind(this.model);
    }

    /**
     * on data bind
     */
    onBind(model)
    {
       
    }    
}

