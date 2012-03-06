// emi: a stupidly tiny event emitter
// --because the one in node just plain sucks

var def = Object.defineProperty || function(object, property, desc){
	object[property] = desc.value
	return object
}

var emi = function emi(obj){
	if (obj && !(this instanceof emi)){
		for (var p in emi.prototype) obj[p] = emi.prototype[p]
		return emi
	}
}

emi.prototype.on = function(event, fn){
	var listeners = this._listeners || def(this, "_listeners", {value: {}})._listeners,
		events = listeners[event] || (listeners[event] = [])
	if (!events.length || events.indexOf(fn) === -1) events.push(fn)
	return this
}

emi.prototype.off = function(event, fn){
	var listeners = this._listeners, events
	if (listeners && (events = listeners[event]) && events.length) for (var i = events.length; i--;) if (events[i] === fn){
		events.splice(i, 1)
		break
	}
	return this
}

emi.prototype.emit = function(event){
	var listeners = this._listeners, events
	if (listeners && (events = listeners[event])){
		events = events.slice()
		var args = Array.prototype.slice.call(arguments, 1)
		for (var i = 0, l = events.length; i < l; i++) events[i].apply(this, args)
	}
	return this
}

module.exports = emi
