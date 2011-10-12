# Build two versions of Fiesta: a CoffeeScript version and a JavaScript version
cd ../src/
cat core/namespace.coffee core/misc.coffee core/event.coffee core/vector.coffee core/boundary.coffee graphic/graphic.coffee graphic/box.coffee entity/entity.coffee scene/scene.coffee > ../build/fiesta.coffee
cd ../build/
coffee --compile fiesta.coffee


