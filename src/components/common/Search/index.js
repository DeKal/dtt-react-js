import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div id="search-field">
                <div id="magnifier">
                    <input type="search" placeholder="Search" aria-label="Search through open bet" onChange={() => (console.log("Search everything"))}/>
                </div>
            </div>
        )
    }
}

export default Search;