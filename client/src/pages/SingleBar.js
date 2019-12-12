import React from 'react'
import './SingleBar.css'
import { Link } from 'react-router-dom'
import Beer from './images/beer.svg'

class SingleBar extends React.Component {
  state = {bar: {Name:'Loading...'}, reviews: [], loader: true}



fetchBar = () => {
  fetch(`/api/bars/${this.props.match.params.id}`)
  .then(response=>response.json())
  .then(bar => this.setState({bar, loader: false}))
}
fetchReviews = () => {
  fetch(`/api/bars/${this.props.match.params.id}/reviews`)
  .then(response=>response.json())
  .then(data => {
    const reviews = data.reviews.map(({user, rating, text}) => ({name: user.name, rating, text}))

    this.setState({ reviews })
  })
}

render(){
  console.log(this.state)
  const location = localStorage.getItem('location')
  const term = localStorage.getItem('term') || ''
  return(
    <div className="i-want-yo-body">
      {
        location                                            ?
        <Link to={`/bars/${location}/${term}`}className="backRob">Back</Link>  :
        <Link to="/">Back</Link>
      }
      {
        this.state.loader ?
        <img src={Beer} className="loaderRob" alt="beer"/> :
        <>
        <div className ="rob-full-container">
          <div className="single-bar-rob">
            <h1 className="single-page-title">{this.state.bar.name}</h1>
          </div>
          <div className="containerRob">
            <div className="bar-data-rob">
              <img src={this.state.bar.image_url} alt = {this.state.bar.name} className="img-rob"
              />
            </div>

            <div className ="table-data-rob">
              {this.state.bar.name &&
              <table>
                <tbody>
                <tr>
                  <td>Name: </td>
                  <td>{this.state.bar["name"]}</td>
                </tr>
                <tr>
                  <td>Reviews: </td>
                  <td>{this.state.bar["review_count"]}</td>
                </tr>
                <tr>
                  <td>Phone: </td>
                  <td>{this.state.bar.display_phone|| 'Phone Not Available'}</td>

                </tr>
                <tr>
                  <td>Rating: </td>
                  <td>{this.state.bar["rating"]}/5</td>
                </tr>
                <tr>
                  <td>Price: </td>
                  <td>{this.state.bar.price|| 'Price Not Available'}</td>
                </tr>
                <tr>
                  <td>Address: </td>
                  <td>{this.state.bar.location.address1}</td>
                  <td>{this.state.bar.location.city},</td>
                  <td>{this.state.bar.location.state}</td>
                  <td>{this.state.bar.location.zip_code}</td>
              </tr>
              <tr>
                <td>Category:  </td>
                <td>{this.state.bar.categories[0].title}</td>
              </tr>
              </tbody>
              </table>
            }
          <div>
          </div>
          </div>
          </div>
        </div>
        <h3 className ="h3-Rob">BarHop Reviews</h3>
        <div className ="reviewContainerBox">
        
          {
            this.state.reviews
              .map((review, index) => (

                <div key={index} className="review">
                  <div className="review-name"> {review.name}</div>
                  <div className="review-rating">Rating: {review.rating}/5</div>
                  <div className="review-text">Review: {review.text}</div>
                  <br></br>
                </div>
              ))

        }
      </div>
      </>
    }
  </div>

  )
}
  componentDidMount(){
    this.fetchBar()
    this.fetchReviews()
  }
}

 
  
  export default SingleBar
  
