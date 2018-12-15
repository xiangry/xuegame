'use strict';

class ExpModel {
    constructor(data){
        this.exp = data.exp || 0;
        this.addExp = data.addExp || 0;
        this.interval = 5000;
    }

    getInterval(){
        return this.interval;
    }

    stepOn(){
        this.exp += this.addExp;
    }

    static newModel(data){
        return new ExpModel(data);
    }
}

module.exports = ExpModel;