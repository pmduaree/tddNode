var chai = require('chai');
var Song = require('../src/song');
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