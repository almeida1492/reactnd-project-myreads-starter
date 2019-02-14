import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component{

	render(){
		console.log('PROPS', this.props)
		const { title, books, shelfFlag, updateBookStatus } = this.props
		return(
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book => (
								<li key={book.title}>
									<Book 
										data={book} 
										shelfFlag={shelfFlag} 
										updateBookStatus={updateBookStatus}/>
								</li>
							))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf