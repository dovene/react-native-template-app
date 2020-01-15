import React from 'react'
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
//import films from '../helpers/filmsData';
import FilmItem from './FilmItem'
import FilmDetail from './FilmDetail';

import { connect } from 'react-redux'


class FilmList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
          films: []
        }
      }
    
      displayDetailForFilm = (idFilm) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
      }

    render(){
      return(  <FlatList

        style={styles.list}
        data={this.props.films}
        keyExtractor={(item) => item.id.toString()}
        
        // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
        extraData={this.props.favoritesFilm}
        
        renderItem={({ item }) => <FilmItem 
        film={item} 
        onClick={this.displayDetailForFilm}
                   // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                this.props.loadMovies();
            }
        }}
    />)
    }
}

const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })
  
  const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(FilmList)