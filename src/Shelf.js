import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component{

	render(){
		const { shelfTitle, books } = this.props
		return(
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book => (
								<li>
									<Book title={book.bookTitle} authors={book.authors} cover={book.cover}/>
								</li>
							))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf