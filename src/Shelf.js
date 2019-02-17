import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component{

	render(){
		const { title, books, onShelfChange } = this.props
		return(
			<div className="bookshelf">
				<h2 className="bookshelf-title">{ title }</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book => (
								<li key={ book.id }>
									<Book 
										data={book} 
										onShelfChange={ onShelfChange }/>
								</li>
							))}
					</ol>
				</div>
			</div>)
	}
}

export default Shelf