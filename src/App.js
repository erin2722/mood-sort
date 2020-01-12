import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyWebAPI from 'spotify-web-api-js';
import Header from './components/Header.jsx';
import PlaylistForm from './components/PlaylistForm.jsx';
import MoodForm from './components/MoodForm.jsx';
import GoButton from './components/GoButton.jsx';
import LogInButton from './components/LogInButton.jsx';
// import SortForm from './components/sortForm.jsx';

const spotifyWebAPI = new SpotifyWebAPI();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 50px;
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 50px;
    margin-top: 50px;
`;

var moods = [
  {
    name: 'good vibes',
    key: 1,
    label: 'good vibes',
  },      
  {
    name: 'chill',
    key: 2,
    label: 'chill',
  },   
  {
    name: 'bag',
    key: 3,
    label: 'bag',
  },   
  {
    name: 'hype',
    key: 4,
    label: 'hype',
  },   
]

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    if(params.access_token) {
      spotifyWebAPI.setAccessToken(params.access_token);
    }

    this.state = {
      loggedIn: params.access_token ? true : false,
      userID: this.getUsername(),
      playlists: [ 
        {name: 'hey', id: '24436157hwe5332'},
        {name: 'hi', id: '24436157hwe5332'},
      ],
      selectedPlaylistSongs: [
        // {name: 'cocoa butter kisses', uri: '4t98h429b4 ', id: 'g4nn4249ugb', mood: 'good vibes'},
        // {name: 'juke jam', uri: '4t98h429b4 ', id: 'g4nn4249ugb', mood: 'chill'},
        // {name: 'hot shower', uri: '4t98h429b4 ', id: 'g4nn4249ugb', mood: 'hype'},
        // {name: 'same drugs', uri: '4t98h429b4 ', id: 'g4nn4249ugb', mood: 'bag'}
      ],
      moods: new Map(), 
      chosenPlaylist: {name: 'qowengwoeng', id: 'qgonrwn'}
    }

    this.handleMoodChange = this.handleMoodChange.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.getSavedSongs = this.getSavedSongs.bind(this);

    this.getPlaylists();
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  } 

  getUsername() {
    spotifyWebAPI.getMe()
      .then((response) => {
        //console.log(response.id);
        this.setState({
          userID: response.id
        })
      })
  }

  getPlaylists() {
    spotifyWebAPI.getUserPlaylists()
      .then((response) => {
        var playlist;
        for(playlist of response.items) {
            this.setState(state => {
              const playlists = state.playlists.concat({ 
                name: playlist.name, 
                id: playlist.id
            });

            return {
              playlists
            }
          })
        }
      })
  }

  getSavedSongs(limit, offset) {
    spotifyWebAPI.getMySavedTracks({limit: limit, offset: offset})
      .then((response) => {
        var song;
        for(song of response.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
              mood: 'happy' //this.classifyByMood(song.track)
            });

            return {
              selectedPlaylistSongs
            }
          })
        }
        //console.log(this.state.selectedPlaylistSongs);

        if(this.state.selectedPlaylistSongs.length < response.total) {
          if(offset + 50 <= this.state.selectedPlaylistSongs.length)
            this.getSavedSongs(limit, offset + 50); 
          else
            this.getSavedSongs(this.state.selectedPlaylistSongs.length - (offset + 50), offset + 50);
        }

        
        var songURIs = [];
        var song;

        for(song of this.state.selectedPlaylistSongs) {
          //console.log(song.uri);
          songURIs.push(song.uri);
        } 

        console.log(songURIs);

        this.addSong(songURIs, '4u3BK21IWkEpcd8ydK7liu');

        //console.log(this.state.selectedPlaylistSongs);
        console.log('check your spotify account!');
      })
  }

  getPlaylistSongs(playlistID) {
    spotifyWebAPI.getPlaylistTracks('', playlistID)
      .then((response) =>{
        var song;
        for(song of response.items) {
          this.setState(state => {
            const selectedPlaylistSongs = state.selectedPlaylistSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
              mood: 'happy' //this.classifyByMood(song.track)
            });

            return {
              selectedPlaylistSongs
            }
          })
        }

        var hypeURIs = [];
        var goodVibesURIs = [];
        var chillURIs = [];
        var bagURIs = [];

        var mood;
        var song;

        for(song of this.state.selectedPlaylistSongs) {
          //songURIs.push(song.uri);
          mood = this.classifyByMood(song);

          console.log(mood);

          if(mood === 'chill') {
            chillURIs.push(song.uri);
          } else if(mood === 'good vibes') {
            goodVibesURIs.push(song.uri);
          } else if(mood === 'bag') {
            bagURIs.push(song.uri);
          } else if(mood === 'hype') {
            hypeURIs.push(song.uri);
          }
        } 

        console.log(chillURIs);
        console.log(bagURIs);
        console.log(hypeURIs);
        console.log(goodVibesURIs);

        var playlist;

        for(playlist of this.state.playlists) {
          //console.log(playlist);
          if(playlist.name === 'chill' + " songs from " + this.state.chosenPlaylist.name && chillURIs.length !== 0) {
            //console.log("!!!!!!!!!!!!!");
            this.addSong(chillURIs, playlist.id);
            break;
          }
        }

        for(playlist of this.state.playlists) {
          //console.log(playlist);
          if(playlist.name === 'bag' + " songs from " + this.state.chosenPlaylist.name && bagURIs.length !== 0) {
            //console.log("!!!!!!!!!!!!!");
            this.addSong(bagURIs, playlist.id);
            break;
          }
        }

        for(playlist of this.state.playlists) {
          //console.log(playlist);
          if(playlist.name === 'good vibes' + " songs from " + this.state.chosenPlaylist.name && goodVibesURIs.length !== 0) {
            //console.log("!!!!!!!!!!!!!");
            this.addSong(goodVibesURIs, playlist.id);
            break;
          }
        }

        for(playlist of this.state.playlists) {
          //console.log(playlist);
          if(playlist.name === 'hype' + " songs from " + this.state.chosenPlaylist.name && hypeURIs.length !== 0) {
            //console.log("!!!!!!!!!!!!!");
            this.addSong(hypeURIs, playlist.id);
            break;
          }
        }

        //console.log(songURIs);

        //this.addSong(songURIs, '4u3BK21IWkEpcd8ydK7liu');

        //console.log(this.state.selectedPlaylistSongs);
        console.log('check your spotify account!');

      })
  }

  makeNewPlaylist(name) {
    spotifyWebAPI.createPlaylist(this.state.userID, {name: name, description: "Created by mood-sort from " + this.state.chosenPlaylist + " playlist"})
      .then((response) =>{
        this.setState({
          recentPlaylistID: response.id
        })
      });
  }

  addSong(songs, mood) {
    //console.log(song +  " " + mood)
    //var songs = [song];

    spotifyWebAPI.addTracksToPlaylist('', mood, songs)
      .then((response) => {
        //console.log(response);
      }
      )
  }

  classifyByMood(song) {
      var mood;
      var playlist;
      spotifyWebAPI.getAudioFeaturesForTrack(song.id)
        .then((response) => {
          //console.log(song.name, " Tempo ", response.tempo, " Energy ", response.energy, " Dancability ", response.danceability, " Valence ", response.valence);
          if(response.danceability > .750 && response.tempo < .750) mood = "good vibes";
          else if(response.danceability > .750) mood = "hype";
          else if(response.tempo < 110 && response.energy < .400) mood = "chill";
          else mood = "bag";

          console.log(mood);
          
          return mood;

          // //console.log(song.name, " is ", mood);
          // for(playlist of this.state.playlists) {
          //   //console.log(playlist);
          //   if(playlist.name === mood + " songs from " + this.state.chosenPlaylist.name) {
          //     //console.log("!!!!!!!!!!!!!");
          //     return '4u3BK21IWkEpcd8ydK7liu';
          //   }
          // }
          // return '4u3BK21IWkEpcd8ydK7liu';
        });
  }

  createMoodPlaylists() {
    //check mood form and create playlists in user's account accordingly
    var mood;
    for(mood of this.state.moods) {
      //console.log(mood[0] + " songs from " + this.state.chosenPlaylist.name + " is created");
      this.makeNewPlaylist(mood[0] + " songs from " + this.state.chosenPlaylist.name);
    }
    this.getPlaylists();
  }

  handleMoodChange(e) {
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState(prevState => ({ moods: prevState.moods.set(item, isChecked) }));
  }

  handlePlaylistChange(e) {
    this.setState( { chosenPlaylist: {name: 'not working', id: e.target.value }} );
  }

  goButtonClicked() {
    this.createMoodPlaylists();

    if(this.state.chosenPlaylist.id === 'liked') {
      this.getSavedSongs(50, 0);
    } else {
      this.getPlaylistSongs(this.state.chosenPlaylist.id);
    }

  }

  render() {
    //should be this.state.loggedIn
    if(this.state.loggedIn) {
      return (
        <Wrapper className="App">
          <Header loggedIn = {true} />
          <FormWrapper>
            <PlaylistForm 
              titles = {this.state.playlists} 
              handlePlaylistChange = {this.handlePlaylistChange} 
              value = {this.state.chosenPlaylist.id} />
            {/* <SortForm /> */}
            <MoodForm 
              moods = {moods} 
              handleMoodChange = {this.handleMoodChange} 
              checkedItems = {this.state.moods} /> 
          </FormWrapper>
          <GoButton onClick = {() => this.goButtonClicked()} />
          <button onClick = {() => this.addSong('spotify:track:5u431x19PX588bk9XGlwN8', '4u3BK21IWkEpcd8ydK7liu')}>click me</button>
        </Wrapper>
      );
    } else {
        return (
          <Wrapper className="App">
            <Header loggedIn = {false} />
            <LogInButton />
          </Wrapper>
        );
    }
  }
}

export default App;