# combine.sh

# This makes a combined Fiesta.js file. Still needs minification.

cd ../src/
cat namespace.js jsclass_core.js three_fiesta.js stats.js config.js browser.js commands.js math.js misc.js baseobject.js entity.js locatable.js physical.js graphic.js graphic2d.js graphic3d.js sprite2d.js box3d.js camera3d.js playground.js > ../build/fiesta_combined.js