// emi: a stupidly tiny event emitter
// --because the one in node just plain sucks

var def = Object.defineProperty ? function(object, property, value){
	Object.defineProperty(object, property, {value: value})
	return object[property]
} : function(object, property, value){ // ES5 shim for browsers.
	object[property] = value
	return object[property]
}

var emi = function emi(obj){
	if (obj && !(this instanceof emi)){
		def(obj, "on", emi.prototype.on)
		def(obj, "off", emi.prototype.off)
		def(obj, "emit", emi.prototype.emit)
		return emi
	}
}

def(emi, "prototype", {})

def(emi.prototype, "on", function(event, fn){
	var listeners = this._listeners || (def(this, "_listeners", {}))
	var events = listeners[event] || (def(listeners, event, []))
	if (!events.length || events.indexOf(fn) === -1) events.push(fn)
	return this
})

def(emi.prototype, "off", function(event, fn){
	var listeners = this._listeners, events
	if (listeners && (events = listeners[event]) && events.length) for (var i = events.length; i--;) if (events[i] === fn){
		events.splice(i, 1)
		break
	}
	return this
})

def(emi.prototype, "emit", function(event){
	var listeners = this._listeners, events
	if (listeners && (events = listeners[event])){
		var args = Array.prototype.slice.call(arguments, 1)
		for (var i = 0, l = events.length; i < l; i++) events[i].apply(null, args)
	}
	return this
})

module.exports = emi
