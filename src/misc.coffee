###
	Fiesta.js misc. functions

	Requires:
		namespace.coffee
###

Fiesta.sign = (x) ->
	if x > 0
		return 1
	else if x < 0
		return -1
	return 0

Fiesta.isString = (s) ->
	(typeof s is 'string') or (s instanceof String)

Fiesta.isInternetExplorer = ->
	navigator.appName is 'Microsoft Internet Explorer'
