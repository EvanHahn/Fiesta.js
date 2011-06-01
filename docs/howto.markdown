Fiesta documentation
====================

Fiesta is a JavaScript game library. Let's learn how to use it.

The core of Fiesta
------------------

There are a few pieces at Fiesta's core, and then everything else is just fanciness. Let's go through them.

* **Game Objects** are pretty much any object that could be a part of the game. They could be physical objects (see below), HUD elements, controllers...they don't have a lot of logic inside of them.

* **Physical Game Objects** are objects that are represented in (virtual) physical space. They have coordinates, they comply with in-game physics, et cetera.

* **Playgrounds** are where game objects live. They are responsible for two things: (1) dealing with the world and the game objects inside (2) showing that world to the user.

That's kind of it. There are a couple of other simple things (sprites and sounds, most notably), but they're boring.