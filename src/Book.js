import React, { Component } from 'react'
import strings from './resources/strings.js'

class Book extends Component{

	constructor(props) {
		super(props);
      	this.getThumbnailUrl = this.getThumbnailUrl.bind(this)
	}

	getThumbnailUrl = () => {
		const { data } = this.props;
		let imageUrl = '';
		if (data.imageLinks !== undefined) {
			imageUrl = `url("${data.imageLinks.smallThumbnail}")`
		}
		return imageUrl;
	}

	render(){
		const { data, onShelfChange, onBookClick } = this.props;
		const imageUrl = this.getThumbnailUrl();
		this.getThumbnailUrl();
		return(
			<div className="book">
				<div className="book-top">
					<div 
						className="book-cover" 
						onClick={() => onBookClick(data)} 
						style={{ width: 128, height: 193, backgroundImage: imageUrl }}/>
					<div className="book-shelf-changer">
						<select defaultValue={data.shelf} onChange={(e) => onShelfChange(data, e.target.value)}>
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