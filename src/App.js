import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

import strings from './resources/strings.js'
import SearchBar from './SearchBar.js'

import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
	constructor(props) {
		super(props);
      this.updateBookStatus = this.updateBookStatus.bind(this);
   }
   state = {
   	allBooks: [],
   }

   componentDidMount() {
		BooksAPI.getAll().then((books) => this.setState({
			allBooks: books
		}))
	}

   updateBookStatus = (book, shelf) => {
      const {allBooks} = this.state
      const allBooksCopy = [...allBooks]

      BooksAPI.update(book, shelf).then(res => {
         allBooksCopy.map((oldBook) => oldBook.id === book.id 
         	? book.shelf = shelf
				: 0)

            this.setState(() => ({allBooks: allBooksCopy}))
            return 0
      })
    }

   render() {
   	
   	const { allBooks } = this.state

   	return (
			<div className="app">
				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<Shelf
								title={strings.currently_reading_title}
								books={allBooks.filter(book => book.shelf === strings.currently_reading_value)}
								updateBookStatus={this.updateBookStatus}/>
							<Shelf
								title={strings.want_to_read_title}
								books={allBooks.filter(book => book.shelf === strings.want_to_read_value)}
								updateBookStatus={this.updateBookStatus}/>
							<Shelf
								title={strings.read_title}
								books={allBooks.filter(book => book.shelf === strings.read_value)}
								updateBookStatus={this.updateBookStatus}/>
						</div>
						<div className="open-search">
							<Link to='/search' className='search-books-link'>
								<button className='search-books'>Add a book</button>
							</Link>
						</div>
					</div>
				)}/>
				<Route exact path='/search' render={() => (
					<div className="search-books">
						<SearchBar/>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				)}/>
			</div>
		)
	}
}

export default BooksApp
