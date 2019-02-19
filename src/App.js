import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf.js'
import './App.css'
import strings from './resources/strings.js'
import SearchBar from './SearchBar.js'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import BookDetails from './BookDetails.js'

/*REVISOR!!! informo que utilizei a lib awesome-debounce-promise para 
otimizar o código ao evitar visitas desnecessárias ao servidor
durante a busca por livros. Adicionei também uma funcionalidade 
extra que é a exposição de informações contidas nos livros. Para 
visualizá-las, basta que se clique na capa de qualquer livro em 
qualquer uma das estantes (inclusive aquela da busca).*/

class BooksApp extends React.Component {

	constructor(props) {
		super(props);
		this.updateBookInShelfStatus = this.updateBookInShelfStatus.bind(this);
		this.fetchFilteredBooks = this.fetchFilteredBooks.bind(this);
		this.setFilteredBooks = this.setFilteredBooks.bind(this);
		this.handleBookClick = this.handleBookClick.bind(this);

		// Create debounced search function 
		this.searchDebounced = AwesomeDebouncePromise(BooksAPI.search, 500);
		this.searchResults = [];
    }

	state = {
		allBooks: [],
		filteredBooks: [],
		isBookDetailsopen: false,
		bookDetailsData: {}
	}

    componentDidMount() {
		BooksAPI.getAll().then((books) => this.setState({ allBooks: books }));
	}

	shouldComponentUpdate(nextProps, nextState) {
		/*if the application use setState to inform that it's starting a 
		remote request, it doesn't re-render the UI*/

		if (nextState.isRequesting === true) {
			return false;
		}
		return true;
	}

    updateBookInShelfStatus = (book, shelf) => {
		const { allBooks } = this.state;
		const allBooksCopy = [...allBooks];

		BooksAPI.update(book, shelf).then(res => {
			allBooksCopy.map((oldBook) => oldBook.id === book.id 
			 	? book.shelf = shelf
				: 0)
			this.setState(() => ({ allBooks: allBooksCopy }))
			return 0
		});
    }

    addBookToShelf = (book, shelf) => {
		/*update the local object status, call the API in order to update 
		it also in the server and add it to the @param {array} allBooks 
		array localy. Used in Shelf when it's attached to search activity*/
    	book.shelf = shelf;
    	BooksAPI.update(book, shelf).then((res) => 
    		this.setState((prevState) => ({ allBooks: [...prevState.allBooks, book] })));
    }

    fetchFilteredBooks = async (event) => {
    	let value = event.target.value;

    	// apply debounce in order to avoid unnacessary API calls.
    	this.searchResults = await this.searchDebounced(value);
		this.searchResults !== undefined
			? this.setFilteredBooks(this.searchResults) 
			: this.setState({ filteredBooks: [] });
    }

    setFilteredBooks = (filteredBooks) => {
		/*this function compares @param {array} allBooks and the brand 
		new @param {array} filteredBooks in order to check if there 
		are filtered books that are already in a shelf. If it finds it, 
		it changes the status of that book in the filteredBooks array 
		so it can be properly displayed when the data reaches the Book 
		component*/
    	const { allBooks } = this.state;
    	filteredBooks = filteredBooks.map((filteredBook) => {
    		filteredBook = { ...filteredBook, shelf: strings.none_value }
    		allBooks.map((bookInShelf) => {
    			if (bookInShelf.id === filteredBook.id) {
    				filteredBook = { ...filteredBook, shelf: bookInShelf.shelf }
    			}
    			return 0
    		})
    		return filteredBook
    	});	
    	this.setState(() => ({ filteredBooks: filteredBooks }));
    }

   	handleBookClick = (data) => {
		this.setState({
			isBookDetailsopen: true,
			bookDetailsData: data
		});
  	}

	handleBookDetailsClose = (value) => {
		this.setState({ isBookDetailsopen: false });
	}

   	render() {
   	const { allBooks, filteredBooks, bookDetailsData } = this.state;
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
								onShelfChange={this.updateBookInShelfStatus}
								onBookClick={this.handleBookClick}/>
							<Shelf
								title={strings.want_to_read_title}
								books={allBooks.filter(book => book.shelf === strings.want_to_read_value)}
								onShelfChange={this.updateBookInShelfStatus}
								onBookClick={this.handleBookClick}/>
							<Shelf
								title={strings.read_title}
								books={allBooks.filter(book => book.shelf === strings.read_value)}
								onShelfChange={this.updateBookInShelfStatus}
								onBookClick={this.handleBookClick}/>
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
							fetchFilteredBooks={ this.fetchFilteredBooks }
							cleanFilteredBooks={() => this.setState({ filteredBooks: [] })}/>
						<Shelf
							title=''
							books={ filteredBooks }
							onShelfChange={ this.addBookToShelf }
							onBookClick={this.handleBookClick}/>
					</div>
				)}/>
				<BookDetails 
					open={this.state.isBookDetailsopen}
					onClose={this.handleBookDetailsClose}
					data={bookDetailsData}/>
			</div>
		)
	}
}

export default BooksApp
