var chai = require('chai');
var MusicBox = require('../src/music_box');
var Playlist = require('../src/playlist');
var Song = require('../src/song');
var expect = chai.expect;
var sinon = require('sinon');

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
        sinon.stub(playlist1, 'getTotalDuration').callsFake(function() { return 30;});
        sinon.stub(playlist2, 'getTotalDuration').callsFake(function() { return 40;});
        sinon.stub(playlist3, 'getTotalDuration').callsFake(function() { return 50;});
        expect(musicBox.getTotalDuration()).to.be.equal(120);
    });

    it('should call once the number of different artists', function() {
        var spy1 = sinon.spy(playlist1, 'getNumberOfDifferentArtists');
        var spy2 = sinon.spy(playlist2, 'getNumberOfDifferentArtists');
        var spy3 = sinon.spy(playlist3, 'getNumberOfDifferentArtists');
        expect(musicBox.getNumberOfDifferentArtists()).to.be.equal(5);
        expect(spy1.callCount).to.be.equal(1);
        expect(spy2.callCount).to.be.equal(1);
        expect(spy3.callCount).to.be.equal(1);
    });
});