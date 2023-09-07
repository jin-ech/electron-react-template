
const electron = require('electron');

class AppGenerator {
    constructor(initParams) {
        this.exectors = [];
        this.initParams = {...electron, ...initParams};
        this.hasNext = false;
    }

    static getInstance(params) {
        return new AppGenerator({...electron, ...params});
    }

    next() {
        this.hasNext = true;
    }

    exec() {
        for (let i = 0; i < this.exectors.length; i++) {
            const exector = this.exectors[i];
            exector(this.initParams, () => this.next());
            if (!this.hasNext) {
                return;
            }
        }
    }

    use(func) {
        this.exectors.push(func);
    }
}

module.exports = AppGenerator;