[![build status](https://secure.travis-ci.org/kamicane/emi.png)](http://travis-ci.org/kamicane/emi)
# emi

## install

```
npm install emi
```

## use

### inherit from emi

```javascript

var emitter = require("emi")

var X = function(){...}

X.prototype = new emitter

```

### copy emi properties to object

```javascript

var emitter = require("emi")

var X = function(){...}

emitter(X)

```

### then

```javascript

X.prototype.doSomething = function(isBad){
	if (isBad) this.emit("bad", "very bad stuff happening", "today")
	else this.emit("good", "very good stuff happening", "today")
}

var x = new X

var badLog = function(message, day){
	console.error(message)
}

x.on("bad", badLog)

var goodLog = function(message, day){
	console.log(message)
};

x.on("good", goodLog)

x.doSomething(true) //emits bad
x.doSomething(false) //emits good

x.off("good", goodLog)
x.off("bad", badLog)

x.doSomething(true) //emits nothing
x.doSomething(false) //emits nothing

```
## license

MIT@me

