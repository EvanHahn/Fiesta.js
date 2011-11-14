# Build two versions of Fiesta: a CoffeeScript version and a JavaScript version
cd ../src/
cat namespace.coffee misc.coffee event.coffee vector.coffee boundary.coffee graphic.coffee box.coffee entity.coffee scene.coffee > ../build/fiesta.coffee
cd ../build/
coffee --compile fiesta.coffee

