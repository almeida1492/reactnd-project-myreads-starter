import React, { Component } from 'react'
import strings from './resources/strings.js'

class Book extends Component{

	render(){
		const { data, updateBookStatus } = this.props
		const imageUrl = `url("${data.imageLinks.smallThumbnail}")`
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageUrl }}></div>
					<div className="book-shelf-changer">
						<select defaultValue={data.shelf} onChange={(e) => updateBookStatus(data, e.target.value)}>
							<option value={strings.move_value} disabled> {strings.move_title} </option>
							<option value={strings.currently_reading_value}> {strings.currently_reading_title} </option>
							<option value={strings.want_to_read_value}> {strings.want_to_read_title} </option>
							<option value={strings.read_value}> {strings.read_title} </option>
							<option value={strings.none_value}> {strings.none_title} </option>
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