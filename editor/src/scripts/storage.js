const _storage = Object.create(null),
	objKeys = Object.prototype.keys,
	hasOwn = Object.hasOwnProperty;

module.exports = {
	setItem(key, value){
		let obj;
		if(key && typeof key === "object"){
			obj = key;
		} else {
			(obj = {})[key] = value;
		}

		for(let key in obj){
			if(hasOwn.call(obj, key)){
				if(_storage[key]){
					throw new Error(`Duplicate key "${ key }".`);
				}
				_storage[key] = value;
			}
		}

		return this;
	},

	getItem(key){
		return _storage[key];
	},

	removeItem(key){
		let keys = Array.isArray(key) ? key : [ key ];
		for(let key of keys){
			delete _storage[key];
		}
		return this;
	},

	clear(){
		this.remove(objKeys.call(_storage));
		return this;
	}
};