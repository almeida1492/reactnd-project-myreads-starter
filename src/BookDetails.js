import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'

class BookDetails extends Component {

    getThumbnailUrl = () => {
        const { data } = this.props;
        let imageUrl = '';
        if (data.imageLinks !== undefined) {
            imageUrl = `url("${data.imageLinks.smallThumbnail}")`
        }
        return imageUrl;
    }

    render() {
        const { onClose, open, data } = this.props;
        const imageUrl = this.getThumbnailUrl();
        return (
            <Dialog open={open} onClose={onClose}>
                <div className="book-details-body">
                    <div className='book-details-top'>
                        <div className="book-details-cover" style={{ width: 128, height: 193, backgroundImage: imageUrl }}/>
                        <div className="book-title">{data.title}</div>
                        <div className="book-authors">{data.authors}</div>
                    </div>
                    <div className="book-description">{data.description}</div>
                    <div className="book-extra-info">Publisher: {data.publisher}</div>
                    <div className="book-extra-info">Published in: {data.publishedDate}</div>
                    <div className="book-extra-info">Maturity Rating: {data.maturityRating}</div>
                    <div className="book-extra-info">Language: {data.language}</div>
                    <div className="book-extra-info">Current Shelf: {data.shelf}</div>
                </div>
            </Dialog>
        )
  }
}

export default BookDetails