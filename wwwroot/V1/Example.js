class ExampleModel extends Observable
{
    id = null;
    name = "";
    value = 0;
}

class ExampleViewModel extends Observer
{
    root = null;
    id = null;
    name = null;
    value = null;
    submit = null;

    constructor(root)
    {
        super();
 
        this.root = root;

        //fields                   
        this.id = root.querySelector('[name="id"]');
        this.name = root.querySelector('[name="name"]');
        this.value = root.querySelector('[name="value"]');
        this.submit = root.querySelector('[name="submit"]');



        //commands.. this and that work
        let that = this;
        that.submit.onclick = () =>
        {
            that.model.value = Math.floor(Math.random() * 10);
            that.model.raiseChange();
        }; 
    }

    dispose()
    {
        super.bind(null);
    }

    onBind(model)
    {
        super.onBind();
        this.id.innerHTML = model.id;
        this.name.innerHTML = model.name;
        this.value.innerHTML = model.value;
    }
}