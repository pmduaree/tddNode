function Song(name, artist, duration) {
    this.name = name;
    this.artist = artist;
    this.duration = duration;
}

Song.prototype.getSongFirstLetter = function() {
    return this.name[0];
};

Song.prototype.compareTo = function(song) {
    if (this.name > song.name) return 1;
    if (this.name < song.name) return -1;
    return 0;
};

module.exports = Song;