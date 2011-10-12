###
	Fiesta.js events
	Games are very event-driven; this file is SUPER IMPORTANT!

	Requires:
		namespace.coffee
		types.coffee
###

Fiesta.addEvent = (scope, name, fn) ->
	
	# If the scope isn't given, make it the window
	if Fiesta.isString scope
		fn = name
		name = scope
		scope = window
	
	# Set up events object
	scope._events or= Object.create(null)
	
	# Put the event in there
	scope._events[name] = scope._events[name] || [];
	scope._events[name].push fn;

Fiesta.fireEvent = (scope, name, eventObject) ->
	
	# If the scope isn't given, make it the window
	if Fiesta.isString scope
		eventObject = name
		name = scope
		scope = window
	
	if scope._events and scope._events[name]
		for fn in scope._events[name]
			fn(eventObject)
