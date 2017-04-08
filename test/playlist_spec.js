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