import React from 'react';
import { withRouter } from 'react-router-dom';

class BottomNavigationBarLayout extends React.Component {
    constructor(props) {
        super(props);
        const pathName = this.getPathNameFromLocation(props.location);
        this.state = {
            items: BOTTOM_NAV_OPTIONS,
            isSelected : {
                ...DEFAULT_SELECT,
                [pathName]: true
            }
        }
    }
    renderBadge = () => {
        if (this.props.showBadge > 0) {
            return <div className="fa-stack" data-count={`${this.props.showBadge}`}></div>
        }
        return <div className="fa-stack"></div>
    }

    renderBottomNavItems = (itemNames) => {
        return itemNames.map((category, i) => {
            return <div
                className={`bottom-nav-items ${this.state.isSelected[category.url] ? "bottom-nav-is-selected" : ""}`}
                key={i}
                onClick={() => { this.props.history.push('/' + category.url) }}>
                <i className={`fa ${category.icon}`} />
                <div className="bottom-item-name">
                  {this.props.translate(`${category.name}`)}
                </div>
            </div>;
        });
    }

    render() {
        return (
            <nav id="bottom-navigation" className="navbar navbar-expand-md fixed-bottom">
                <div className="container">
                    {this.renderBottomNavItems(this.state.items)}
                </div>
            </nav>

        );
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            const pathName = this.getPathNameFromLocation(location);
            this.setState({
                isSelected: {
                    ...DEFAULT_SELECT,
                    [pathName]: true
                }
            })
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    getPathNameFromLocation(location) {
        const pathArr = location.pathname.split("/");
        let pathName;
        if (pathArr.length > 1) {
            pathName = pathArr[1] || "";
        }
        return pathName;
    }
}

export default withRouter(BottomNavigationBarLayout);

const DEFAULT_SELECT = {
    "open-bet-bottom" : false,
    "market" : false,
    "news" : false,
    "sports" : false,
    "games" : false
}

const BOTTOM_NAV_OPTIONS = [
    {
        name: "Open",
        url: "open-bet-bottom",
        icon: "fa-history"
    },
    {
        name: "Market",
        url: "market",
        icon: "fa-line-chart"
    },
    {
        name: "News",
        url: "news",
        icon: "fa-newspaper-o"
    },
    {
        name: "Sports",
        url: "sports",
        icon: "fa-soccer-ball-o"
    },
    {
        name: "Games",
        url: "games",
        icon: "fa-gamepad"
    }
];
