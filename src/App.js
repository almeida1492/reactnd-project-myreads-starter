import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {

  CURRENTLY_READING_FLAG = 'currentlyReading'
  WANT_TO_READ_FLAG = 'wantToRead'
  READ_FLAG = 'read'
  NONE_FLAG = 'none'

  constructor(props) {
    super(props);
    this.updateBookStatus = this.updateBookStatus.bind(this);
  }

  state = {
    allBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  updateBookStatus = (event, targetTitle) => {
    let newStatus = event.target.value
    this.setState((prevState) => ({
        allBooks: prevState.allBooks.map(book => {
            if (book.title === targetTitle) {
                book.status = newStatus
            }
            return book
        })
    }))
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => this.setState({allBooks: books})) 
  }

  render() {
    const { allBooks } = this.state
    console.log('STATE', this.state)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
      ) : (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf 
            title='Currently Reading' 
            books={allBooks.filter(book => book.shelf === this.CURRENTLY_READING_FLAG)}
            shelfFlag={this.CURRENTLY_READING_FLAG}
            updateBookStatus={this.updateBookStatus}/>
          <Shelf 
            title='Want to Read' 
            books={allBooks.filter(book => book.shelf === this.WANT_TO_READ_FLAG)} 
            shelfFlag={this.WANT_TO_READ_FLAG}
            updateBookStatus={this.updateBookStatus}/>
          <Shelf 
            title='Read' 
            books={allBooks.filter(book => book.shelf === this.READ_FLAG)} 
            shelfFlag={this.READ_FLAG}
            updateBookStatus={this.updateBookStatus}/>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
      )}
      </div>
    )
  }
}

export default BooksApp
