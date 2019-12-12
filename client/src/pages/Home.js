import React from 'react'
import './HomePage.css'
import 'animate.css'
import Beer from './images/beer.svg'
import Icon from './images/instagram-brands2.svg'


class Home extends React.Component{
  state = {query: ''}

  handleInputChange = event => this.setState({ query: event.target.value })

  handleSearch = event => {
    event.preventDefault()
    const { query } = this.state;
    this.props.history.push(`/bars/${query}`)
  }

  render(){
    return(
      <div className="home-page-body">
        <h1 className="home-page-title">Bar Hop</h1>
        <form                       
          className="home-page-form"
          onSubmit={this.handleSearch}
        >
          <div className="home-search-box">
            <label 
              className="home-page-label"
              htmlFor="home-search-id"
            >  
              <img src={Beer} alt="beer icon" />
            <input
              id="search-box-id"
              className="home-page-input"
              name="query"
              type="text"
              placeholder="Search a location.."
              spellCheck="false"
              autoComplete="off"
              onChange={this.handleInputChange}
            />
               </label> 
          </div>
        </form>
        <div className="animated rubberBand home-page-footer">
          <div className="home-page-icon">
              <a href={"https://www.instagram.com/wyncode/?hl=en"}>
                <img id="instagram" src={Icon} alt="instagram-icon"></img>
              </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
