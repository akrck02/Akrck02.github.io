export class Variable {
    constructor(name,value) {
        this._name = name;
        this._value = value;
    }

    get name()  {return this._name}
    get value() {return this._value}

    set name(name)    {this._name = name;}
    set value(value)  {this._value = value;}

    var(){return '--' + this._name;}
    line(){return this.var() + " : " + this.value;}
    css_var(){return "var(" + this.var() + ")"}
}