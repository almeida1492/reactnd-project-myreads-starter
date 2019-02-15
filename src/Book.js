import React, { Component } from 'react'

class Book extends Component{

	render(){
		const { data, updateBookStatus } = this.props
		const imageUrl = `url("${data.imageLinks.smallThumbnail}")`
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageUrl }}></div>
					<div className="book-shelf-changer">
						<select defaultValue={data.shelf} onChange={(e) => updateBookStatus(e, data.title)}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{data.title}</div>
				<div className="book-authors">{data.authors}</div>
			</div>
		)
	}
}

export default Book