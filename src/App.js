import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import SpotifyWebAPI from 'spotify-web-api-js';
import Header from './components/Header.jsx';
import FormWrapper from './components/FormWrapper.jsx';
import GoButton from './components/GoButton.jsx';
import LogInButton from './components/LogInButton.jsx';


const spotifyWebAPI = new SpotifyWebAPI();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnent: space-around;
  align-items: center;
  margin: 50px;
`;


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
        {name: '', id: ''}
      ],
      savedSongs: [
        {name: '', uri: '', id: '', mood: ''}
      ],
      recentPlaylistID: ''
    }
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
        console.log(response.id);
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
            const savedSongs = state.savedSongs.concat({ 
              name: song.track.name, 
              uri: song.track.uri,
              id: song.track.id,
              mood: this.classifyByMood(song.track)
            });

            return {
              savedSongs
            }
          })
        }
        if(this.state.savedSongs.length < response.total) this.getSavedSongs(limit, offset + 50); 
      })
  }

  makeNewPlaylist() {
    spotifyWebAPI.createPlaylist(this.state.userID, {name: "heck yeah", description: "bet"})
      .then((response) =>{
        this.setState({
          recentPlaylistID: response.id
        })
      });
  }

  addSongs() {
    var song;
    var songs = ['spotify:track:5u431x19PX588bk9XGlwN8'];
    // for(song of this.state.savedSongs) {
    //   songs.concat(song.uri);
    // }

    spotifyWebAPI.addTracksToPlaylist('', '4u3BK21IWkEpcd8ydK7liu', songs)
      .then((response) => {
        console.log(response);
      }
      )
  }

  classifyByMood(song) {
      var mood;
      spotifyWebAPI.getAudioFeaturesForTrack(song.id)
        .then((response) => {
          console.log(song.name, " Tempo ", response.tempo, " Energy ", response.energy, " Dancability ", response.danceability, " Valence ", response.valence);
          if(response.danceability > .750 && response.tempo < .750) mood = "good vibes";
          else if(response.danceability > .750) mood = "bad bitch";
          else if(response.tempo < 110 && response.energy < .400) mood = "chill";
          else mood = "bag";

          //console.log(song.name, " is ", mood);
          return mood;
        });
  }

  render() {
    if(true) {
      return (
        <Wrapper className="App">
          <Header loggedIn = {true} />
          <FormWrapper />
          <GoButton onClick = {() => this.addSongs()} />
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

        {/* TESTER CODE */}
        {/* <ul>
          {this.state.savedSongs.map(item => (
            <li>{item.name}</li>
          ))}
        </ul> */}
          {/* <button onClick = {() => this.classifyByMood(this.state.savedSongs[Math.floor(Math.random() * 100)])}>Classify Song</button>
          <button onClick = {() => this.getPlaylists()}>Check Playlists</button>
          <button onClick = {() => this.getSavedSongs(50, 0)}>Check Songs on Playlist</button>
          <button onClick = {() => this.makeNewPlaylist()}>Make Playlist</button>
          <button onClick = {() => this.addSongs()}>Add Song</button> */}
