import React, { Component } from 'react'

class Book extends Component{

	CURRENTLY_READING_FLAG = 0
  	WANT_TO_READ_FLAG = 1
  	READ_FLAG = 2
  	NONE_FLAG = 3

	setDefaultValue = () => {
		let value
		switch(this.props.data.status){
			case this.CURRENTLY_READING_FLAG:
			{
				value = 'currentlyReading'
				break
			}
			case this.WANT_TO_READ_FLAG:
			{
				value = 'wantToRead'
				break
			}
			case this.READ_FLAG:
			{
				value = 'read'
				break
			}
			case this.NONE_FLAG:
			{
				value = 'none'
				break
			}
			default:
				break
		}
		return value
	}

	render(){
		const { data, updateBookStatus } = this.props
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: data.cover }}></div>
					<div className="book-shelf-changer">
						<select defaultValue={this.setDefaultValue()} onChange={(e) => updateBookStatus(e, data.title)}>
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