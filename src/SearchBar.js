import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBar extends Component{

	componentWillUnmount(){ 
		this.props.cleanFilteredBooks();
	}

	render(){
		return(
			<div className="search-books-bar">
				<Link to='/' className='close-search-link'>
					<button className="close-search">Close</button>
				</Link>
				<div className="search-books-input-wrapper">
					<input 
						type="text"
						placeholder="Search by title or author"
						onChange={(e) => this.props.fetchFilteredBooks(e)}/>
				</div>
			</div>
		)
	}	
}

export default SearchBar