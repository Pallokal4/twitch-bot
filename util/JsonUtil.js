module.exports = {
    isOnline: (obj) => {
        var result = false;
        if(obj){
            if(typeof obj.stream !== "null" && obj._id){
                result = true;
            }
        }
        return result;
    }
};