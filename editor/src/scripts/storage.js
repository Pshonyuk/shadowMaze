const _storage = Object.create(null);

module.exports = {
	setItem(key, value){
		if(_storage[key]){
			throw new Error(`Duplicate key "${ key }".`);
		}
		_storage[key] = value;
		return this;
	},

	getItem(key){
		return _storage[key];
	},

	removeItem(key){
		delete _storage[key];
		return this;
	},

	clear(){
		for(let key in _storage){
			this.remove(key);
		}
		return this;
	}
};