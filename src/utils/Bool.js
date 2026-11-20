
const bool = [1, 0,"0", "1", true, false, "true", "false"]
const trueBool = [1, true, "true", "1"];

class Bool {
    static isBool(x) {
        const arg = x?.toLowerCase();
        const result = bool.includes(arg);
        return result;
    }

    static parseBool(x) {
        if(!this.isBool(x)) {
            throw new Error("Este item não é um boolean.");
        }

        let arg = parseInt(x);
        if(!isNaN(arg) && [0, 1].includes(arg)) 
            return arg;
        
        if(typeof x == "boolean")
            return x;

        if(trueBool.includes(x))
            return true;

        return false;
    }
}

module.exports = Bool;