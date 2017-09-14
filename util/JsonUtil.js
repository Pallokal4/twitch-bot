module.exports = {
    isOnline: (obj) => {
        var result = false;
        console.log(obj.stream);
        if(obj){
            if(obj.stream){
                if(obj.stream._id){
                    result = true;
                }
            }
        }
        return result;
    }
};