import React from 'react';
import Link from "react-router-dom/es/Link";

export default class BookCategoryBtn extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="dropdown">
                <button className="dropbtn">Category</button>
                <div className="dropdown__content">
                    <Link to="/category/afaceri"
                          href="/category/afaceri"
                          onClick={() => this.handleClick('afaceri')}>Afaceri
                    </Link>
                    <Link to="/category/beletristica"
                          href="/category/beletristica"
                          onClick={() => this.handleClick('beletristica')}>Beletristica
                    </Link>
                    <Link to="/category/dictionare"
                          href="/category/dictionare"
                          onClick={() => this.handleClick('dictionare')}>Dictionare
                    </Link>
                    <Link to="/category/biografii"
                          href="/category/biografii"
                          onClick={() => this.handleClick('biografii')}>Biografii
                    </Link>
                </div>
            </div>
        );
    }

    handleClick(category) {
        this.props.onBookCategory(category);
    }
}