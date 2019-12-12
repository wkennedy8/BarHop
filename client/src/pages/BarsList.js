import React from 'react'
import { Link } from 'react-router-dom'
import Beer from './images/beer.svg'

class BarsList extends React.Component {
  state = {
            bars: [],
            location: this.props.match.params.location,
            term: this.props.match.params.term || 'bars',
            loader: true,
          }

  componentDidMount() {
    const { location, term='bars' } = this.props.match.params;
    location && this.fetchBars(location, term)
  }

  handleInputChange = field => e => this.setState({ [field]: e.target.value })

  handleSubmit = event => {
    const { location, term } = this.state;
    if (location && term) {
      event.preventDefault()
      this.props.history.push(`/bars/${location}/${term || ''}`)
      this.fetchBars(location, term)
    }
  }

handleSortRating = event => {
  const { bars } = this.state
  const sortedBars = bars.sort((a,b) => {
    return b.rating - a.rating
  })
  
  this.setState({ bars: sortedBars })
}

handleSortLowRating = event => {
  const { bars } = this.state 
  const sortedByLowRating = bars.sort((a,b) => {
    return a.rating - b.rating
  })
  this.setState({ bars: sortedByLowRating})
}

handleSortLowPrice = event => {
  const { bars } = this.state 
  const sortedBarsLowPrice = bars.sort((a,b) => {
    if (a.price && b.price){
      return (a.price.length - b.price.length)
    }else if (a.price){
      return -1
    }else {
      return 1
    }
  })
  this.setState({bars: sortedBarsLowPrice})
}

handleSortHighPrice = event => {
  const { bars } = this.state
  const sortedBarsHighPrice = bars.sort((a,b) => {
    if (a.price && b.price){
      return (b.price.length - a.price.length)
    }else if (b.price){
      return 1
    }else if (b.price - a.price){
      return 0
    }else {
      return -1
    }
  })
  this.setState({bars: sortedBarsHighPrice})
}

  fetchBars = (location, term) => {
    if (!location) return;
    localStorage.setItem('location', location)
    localStorage.setItem('term', term)
    const url = `/api/bars/search/${location}/${term || ''}`;
    fetch(url)
    .then(response => response.json())
    .then(yelpResponse => {
      this.setState({
        bars: yelpResponse,
        location,
        term,
        loader: false,
      })
    })
  }

  render(){
    return (
      <>
      <React.Fragment>
      <h1 className="h1-will"><a href="/">BarHop</a></h1>
      {this.state.loader ? <img src={Beer} className="loader" alt="beer"/> : ''}
        <form className="form-div" onSubmit={this.handleSubmit}>
          <div className="div2">
            <input
              id="location"
              className="input-will"
              type="text"
              placeholder="Search for a Bar Location"
              onChange={this.handleInputChange('location')}
              value={this.state.location}
              required
              spellCheck="false"
            />
            <input
              type="text"
              className="input-will-2"
              placeholder="Search a bar by keyword"
              onChange={this.handleInputChange('term')}
              value={this.state.term}
              required
              spellCheck="false"
            />
            <button type="submit" id="transparent-button">
            <img src={Beer} 
            className="beer-icon" 
            alt="beer-icon"
            
            />
            </button>
            </div>
        </form>
        <div className="sort-section">
        <button className="highratingbutton" onClick={this.handleSortRating}>Sort By Highest Rated </button>
        <button className="lowratingbutton" onClick={this.handleSortLowRating}>Sort By Lowest Rated</button>
        <button className="pricelow" onClick={this.handleSortLowPrice}>Price: Low to High</button>
        <button className="pricehigh" onClick ={this.handleSortHighPrice}>Price: High to Low</button>
        </div>
        
      <div className="barlist">
        {
          this.state.bars
          .map(bar => (
            <Link to={`/bar/${bar.id}`} key={bar.id}>
              <div className="Rob">
            <div className="main-result">
              <div className="results">
                <h3 className="will-h3">{bar.name}</h3>
                  <img 
                  className="result-images"
                  src={bar.image_url} 
                  alt={bar.name}/>
                <h3 className="will-h5"> 
                  Rating:  
                   <span className="span-will">
                  
                  {[...Array(Math.floor(bar.rating)).keys()].map(i => <img src={Beer} key={`beericon${i}`} className="beer-icon-list" alt="beer-icon"/>)}
                  </span>
                </h3>
                <h4 className="will-h4">{bar.price || 'Price Not Available'}</h4>
              </div>
            </div>
            </div>
            </Link>
          ))
        }
       </div>
       </React.Fragment>
       </>
    )
  }
}

export default BarsList
