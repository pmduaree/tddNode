#0: Setting everything up

We need to install mocha first, to run our tests

```bash
npm install mocha -g
```

And after that, we are gonna need a new proyect to run everything

```bash
mkdir tddNode
cd tddNode
touch package.json
echo {} > package.json
npm install chai --save-dev
```

Inside tddNode, we are gonna create a new test folder, named test

```bash
mkdir test
```

Mocha is gonna read all our tests inside so we don't need to worry about.

And we have everything ready to start coding our tests! At least for now

Lets create our first test. In /test, lets create a file names test.js. Inside it, we are gonna import chai and expect, liek this:

```javascript
var chai = require('chai');
var expect = chai.expect;
```

Below it, we are gonna create our placeholders for the tests:
```javascript
describe('my first test', function() {
    it('should do nothing', function() {
        expect(true).to.be.true;
    })
});
```

In our terminal, we should run 
```bash
mocha test
```

and the tests should all pass. If not, then we did something wrong.

#1: Create code TDD style

Our application is gonna be something simple: we are gonna build a music box with 3 models: song, playlist and music box.

The relation is as follows: a music box can contain multiple playlists, and a playlist can contain multiple songs. 

First, let's talk about the song model. It should have 3 properties:

1. Name
2. Duration
3. Artist

Inside song, we are gonna write some inner functions to help us calculate some things easier. 

- The first letter of the song
- Compare one song to another

In another file, called song_spec.js we are gonna do:

```javascript
var chai = require('chai');
var Song = require('../src/song')
var expect = chai.expect;

describe('song', function() {
    it('should create the song with all their properties', function() {
        var song = new Song('Never gonna give you up', 'Rick Astley', 400);
        expect(song.name).to.be.equal('Never gonna give you up');
        expect(song.artist).to.be.equal('Rick Astley');
        expect(song.duration).to.be.equal(400);
    });

    it('should return the first letter of the name of the song', function() {
        var song = new Song('Never gonna give you up', 'Rick Astley', 400);
        expect(song.getSongFirstLetter()).to.be.equal('N');
    });

    it('should compare two songs with their names', function() {
        var song1 = new Song('Never gonna give you up', 'Rick Astley', 400);
        var song2 = new Song('Sandstorm', 'Darude', 340);
        expect(song1.compareTo(song2)).to.be.equal(-1);
    });
});

```

#2: Do some refactor: before and after

Now that we created our first tdd test, we are gonna create something new. The playlist.

It's properties are gonna be: 
- List of songs
- Name

And its behavior is gonna be:
- Add, get and delete songs
- Get total duration of playlist
- Get total number of songs
- Get total of different artists

In this test we are gonna have the same number of starting songs for all the tests:
```javascript
new Song('a', '1', 100)
new Song('b', '2', 200)
new Song('c', '3', 300)
new Song('d', '1', 400)
```

Adding all of these to each test sounds tedious. Let's try something else:

```javascript
var chai = require('chai');
var Playlist = require('../src/playlist');
var Song = require('../src/song');
var expect = chai.expect;

describe('playlist', function () {
    var playlist;
    beforeEach(function () {
        playlist = new Playlist([
            new Song('a', '1', 100),
            new Song('b', '2', 200),
            new Song('c', '3', 300),
            new Song('d', '1', 400)
        ])
    });

    it('should get us the different number of songs', function () {
        expect(playlist.numberOfSongs()).to.be.equal(4);
    });

    it('should get us the total duration of songs', function () {
        expect(playlist.getTotalDuration()).to.be.equal(1000);
    });

    it('should add new songs', function() {
        playlist.addSong(new Song('e', '4', 500));
        expect(playlist.numberOfSongs()).to.be.equal(5);
    });

    it('should get the number of different artists', function() {
        expect(playlist.getNumberOfDifferentArtists()).to.be.equal(3);
    })
});

```

It's your turn to code that behavior. 

# 3: Putting everything together

Lets create the music box now!

The music box should: 

- Get number of playlists
- Get if its playing or not
- Change song
- Play the current selected playlist or even stop it
- Change playlist

Try it! If you can't here's the test:

```javascript

var chai = require('chai');
var MusicBox = require('../src/music_box');
var Playlist = require('../src/playlist');
var Song = require('../src/song');
var expect = chai.expect;

describe('musicBox', function () {
    var musicBox;
    beforeEach(function () {
        musicBox = new MusicBox([
            new Playlist([
                new Song('a', '1', 100),
                new Song('b', '2', 200)
            ]),
            new Playlist([
                new Song('c', '3', 300)
            ]),
            new Playlist([
                new Song('d', '4', 400),
                new Song('e', '5', 500)
            ])
        ]);
    });

    it('should get the total number of playlist', function () {
        expect(musicBox.getTotalPlaylists()).to.be.equal(3);
    });

    it('should not be playing if we create the playlist', function () {
        expect(musicBox.isPlaying).to.be.false;
    });

    it('should change song', function() {
        musicBox.nextSong();
        expect(musicBox.currentSongPlaying().name).to.be.equal('b');
    });

    it('should play the current playlist', function() {
        musicBox.play();
        expect(musicBox.isPlaying).to.be.true;
    });

    it('should stop the playlist if its playing', function() {
       musicBox.play();
       musicBox.stop();
       expect(musicBox.isPlaying).to.be.false;
    });

    it('should change playlist', function() {
        musicBox.changePlaylist(1);
        expect(musicBox.indexOfCurrentPlaylist).to.be.equal(1);
    })
});

```

This is a test for you. By now, the code you wrote should not be that clean. Do you want to refactor something? Try it! There's always a better way! You now have tests that covers you up by now!

# 4: Stubs, mocks and spies

Ok, by now we should already have something in our app. But it's kinda tedious to write all that setup. Let's try something new, called stubs, mocks and spies.

First, we need to install sinon, which is the framework who is gonna help up:

```bash
npm install sinon --save-dev
```

After that, we are gonna create one stub and one spy. Let's add new properties to the music box:

- Get total duration of playlist
- Get total of different artists

So, let's only stub the first one and spy the second one. In order to stub a function you will need 3 things:

1. The object
2. The name of the method to be stubbed 
3. The function is gonna be replaced

So, for example:

```javascript
var stub = sinon.stub(object, methodName).callsFake(func);
```

In our example, for the total duration of playlist, we are gonna stub the playlist.getTotalDuration function:

```javascript
sinon.stub(playlist, 'getTotalDuration', function() {
    return 30;
};
```

With that, if we have 3 playlist, we expect the total duration to be 90. 

And now, we should create the behavior of total duration of the music box within all playlist

Let's try spies. We only need 2 things: the object and the method name: 
```javascript
sinon.spy(object, "methodname")
```

With that, we are gonna see how many times that method was being called.

For example:
```javascript
sinon.spy(playlist, 'getDifferentArtists')
```

And if we expect, the number of calls should be 3.

Our new test should look like:

```javascript
var chai = require('chai');
var MusicBox = require('../src/music_box');
var Playlist = require('../src/playlist');
var Song = require('../src/song');
var expect = chai.expect;

describe('musicBox', function () {
    var musicBox;
    var playlist1, playlist2, playlist3;
    beforeEach(function () {
        playlist1 = new Playlist([
            new Song('a', '1', 100),
            new Song('b', '2', 200)
        ])
        playlist2 = new Playlist([
            new Song('c', '3', 300)
        ]);
        playlist3 = new Playlist([
            new Song('d', '4', 400),
            new Song('e', '5', 500)
        ]);
        musicBox = new MusicBox([
            playlist1,
            playlist2,
            playlist3
        ]);
    });

    it('should get the total number of playlist', function () {
        expect(musicBox.getTotalPlaylists()).to.be.equal(3);
    });

    it('should not be playing if we create the playlist', function () {
        expect(musicBox.isPlaying).to.be.false;
    });

    it('should change song', function() {
        musicBox.nextSong();
        expect(musicBox.currentSongPlaying().name).to.be.equal('b');
    });

    it('should play the current playlist', function() {
        musicBox.play();
        expect(musicBox.isPlaying).to.be.true;
    });

    it('should stop the playlist if its playing', function() {
       musicBox.play();
       musicBox.stop();
       expect(musicBox.isPlaying).to.be.false;
    });

    it('should change playlist', function() {
        musicBox.changePlaylist(1);
        expect(musicBox.indexOfCurrentPlaylist).to.be.equal(1);
    });

    it('should get the total duration of the music box', function() {
        sinon.stub(playlist1, 'getTotalDuration', function() { return 30;});
        sinon.stub(playlist2, 'getTotalDuration', function() { return 40;});
        sinon.stub(playlist3, 'getTotalDuration', function() { return 50;});
        expect(musicBox.getTotalDuration()).to.be.equal(120);
    });

    it('should call once the number of different artists', function() {
        var spy1 = sinon.spy(playlist1, 'getNumberOfDifferentArtists');
        var spy2 = sinon.spy(playlist2, 'getNumberOfDifferentArtists');
        var spy3 = sinon.spy(playlist3, 'getNumberOfDifferentArtists');
        expect(spy1.callCount).to.be.equal(1);
        expect(spy2.callCount).to.be.equal(1);
        expect(spy3.callCount).to.be.equal(1);
    });
});
```

For more information about:
- [sinon](http://sinonjs.org/)
- [mocha](https://mochajs.org/)
- [chai](http://chaijs.com/)
