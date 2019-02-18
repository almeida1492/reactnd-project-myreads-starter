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
      this.updateBookInShelfStatus = this.updateBookInShelfStatus.bind(this)
      this.fetchFilteredBooks = this.fetchFilteredBooks.bind(this)
      this.setFilteredBooks = this.setFilteredBooks.bind(this)
   }

   state = {
   	allBooks: [],
   	filteredBooks: []
   }

   componentDidMount() {
		BooksAPI.getAll().then((books) => this.setState({ allBooks: books }))
	}

   updateBookInShelfStatus = (book, shelf) => {
      const { allBooks } = this.state
      const allBooksCopy = [...allBooks]

      BooksAPI.update(book, shelf).then(res => {
         allBooksCopy.map((oldBook) => oldBook.id === book.id 
         	? book.shelf = shelf
				: 0)

            this.setState(() => ({ allBooks: allBooksCopy }))
            return 0
      })
   }

    addBookToShelf = (book, shelf) => {
    	book.shelf = shelf
    	BooksAPI.update(book, shelf).then((res) => 
    		this.setState((prevState) => ({ allBooks: [...prevState.allBooks, book] })))
   }

    fetchFilteredBooks = (event) => {
    	if (event.target.value !== '') {
    		BooksAPI.search(event.target.value).then((books) => {
    			if (books.length > 0) {
    				this.setFilteredBooks(books)
    			} else {
    				this.setState({ filteredBooks: [] })
    			}
    			return 0	
    		})
    	} else {
    		this.setState({ filteredBooks: [] })
    	}
   }

    setFilteredBooks = (filteredBooks) => {
    	const { allBooks } = this.state
    	let tempFilteredBooks = []

    	filteredBooks = filteredBooks.map((book) => book = { ...book, shelf: strings.none_value })

    	tempFilteredBooks = filteredBooks.map((filteredBook) => {allBooks.map((bookInShelf) => {
    			if (bookInShelf.id === filteredBook.id) {
    				filteredBook = { ...filteredBook, shelf: bookInShelf.shelf }
    			}
    			return 0
    		})
    		return filteredBook
    	})
    	
    	this.setState(() => ({ filteredBooks: tempFilteredBooks }))
    }

   render() {
   	const { allBooks, filteredBooks } = this.state
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
								onShelfChange={this.updateBookInShelfStatus}/>
							<Shelf
								title={strings.want_to_read_title}
								books={allBooks.filter(book => book.shelf === strings.want_to_read_value)}
								onShelfChange={this.updateBookInShelfStatus}/>
							<Shelf
								title={strings.read_title}
								books={allBooks.filter(book => book.shelf === strings.read_value)}
								onShelfChange={this.updateBookInShelfStatus}/>
						</div>
						<div className="open-search">
							<Link to='/search' className='search-books-link'>
								<button 
									className='search-books'>Add a book</button>
							</Link>
						</div>
					</div>
				)}/>
				<Route exact path='/search' render={() => (
					<div className="search-books">
						<SearchBar 
							fetchFilteredBooks={ this.fetchFilteredBooks }/>
						<Shelf
							title=''
							books={ filteredBooks }
							onShelfChange={ this.addBookToShelf }/>
					</div>
				)}/>
			</div>
		)
	}
}

export default BooksApp
