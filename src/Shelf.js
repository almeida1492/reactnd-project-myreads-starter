import React from 'react'
import Book from './Book'

const Shelf = (props) => {

	const { books, title, onShelfChange, onBookClick } = props;

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ title }</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map(book => (
							<li key={book.id}>
								<Book 
									data={book} 
									onShelfChange={onShelfChange}
									onBookClick={onBookClick}/>
							</li>
						))}
				</ol>
			</div>
		</div>
	)
}

export default Shelf