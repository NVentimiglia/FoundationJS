class ExampleController
{
    init()
    {
        let view = document.getElementById("root");      

        let context = new DataContext();
        let model = new ExampleModel();
        context.pushModel("model", model);

        let viewModel = new ExampleViewModel(view, cmd => 
        {
            context.pushModel("model", cmd);
        });
        
        context.subscribe("model", viewModel.binder);
        
    }
}
class ExampleModel
{
    id = null;
    name = "";
    value = 0;
}

class ExampleViewModel
{
    root = null;
    model = null;

    id = null;
    name = null;
    value = null;
    submit = null;

    /**
     * @type {Callback}
     */
    binder = null;

    constructor(root, command)
    { 
        this.root = root;
        let that = this;
        this.binder = new Callback(m =>
            {
                that.onBind(m);
            });

        //fields                   
        this.id = root.querySelector('[name="id"]');
        this.name = root.querySelector('[name="name"]');
        this.value = root.querySelector('[name="value"]');
        this.submit = root.querySelector('[name="submit"]');

        //commands.. this and that work
        that.submit.onclick = () =>
        {
            that.model.value = Math.floor(Math.random() * 10);
            command(that.model);
        }; 
    }

    onBind(model)
    {
        this.model = model;

        this.id.innerHTML = model.id;
        this.name.innerHTML = model.name;
        this.value.innerHTML = model.value;
    }
}


var CALLBACK_COUNTER = 0;

/**
 * Function with an identity
 */
class Callback
{
    /**
     * function counter
     */
    static _counter = 0;

    /**
     * function
     * @type {function}
     */
    func = null;

    /**
     * identity
     * @type {number}
     */
    id = 0;

    /**
     * @param func {function}
     */
    constructor(func)
    {
        CALLBACK_COUNTER ++;

        this.func = func;
        this.id = CALLBACK_COUNTER;
    }
}


/**
 * Mediator responsible for linking models and their changes to views and handlers
 * classically a 'controller' before the scrubs confused it with 'user'
 */
class DataContext
{
    /**
     * All cached models
     * @type {ObservableDictionary}
     */
    models = new ObservableDictionary();

    /**
     * All cached listeners
     * @type {ObservableDictionary}
     */
    listeners = new ObservableDictionary();

    /**
     * send change and caches for late views
     * @param key {string|number} unique id for routing
     * @model {object} the data being passed
     */
    pushModel(key, model)
    {
        this.models.push(key, model);
        this._raise(key, model);
    }
    
    /**
     * send change w/o persistence
     * @param key {string|number} unique id for routing
     * @model {object} the data being passed
     */
    pushEvent(key, model)
    {
        this._raise(key, model);
    }
    
    /**
     * adds handler (view handler)
     * @param key {string|number} unique id for routing
     * @param callback {Callback} function + id combo
     */
    subscribe(key, callback)
    {
        //listen
        let handlers = this.listeners.getValue(key);
        if(handlers === null)
        {
            handlers = new ObservableDictionary();
            this.listeners.push(key, handlers);
        }
        handlers.push(callback.id, callback.func)

        // get
        let model = this.models.getValue(key);
        if(model !== null)
        {
            callback.func(model);
        }
    }

    /**
     * removes handler
     * @param handler {Callback} function + id combo
     */
    unsubscribe(callback)
    {
        this.onChange.remove(callback.id);
    }

    //# Privates

    _raise(key, model)
    {
        let handlers = this.listeners.getValue(key);

        if(handlers === null)
        {
            return;
        }

        handlers.forEach(handler =>
        {
            handler.value(model);
        });
    }
}