import React from 'react';
import { withRouter } from 'react-router-dom';

class SubCategoryLayout extends React.Component {
  constructor(props) {
    super(props)
    this.subCategoryRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
    window.addEventListener("resize", this.updateDimensions);
    this.state = {
      subCategoryClass: ""
    }
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subCategories !== this.props.subCategories) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="container">
        <div className={`row ${this.state.subCategoryClass}`} id="sub-category" ref={this.subCategoryRef}>
          {this.renderSubcategories()}
        </div>
      </div>
    )
  };

  renderSubcategories() {
    const subCategories = [];
    const { category, categoryType } = this.props;
    if (this.props.subCategories.constructor !== Array || typeof this.props.subCategories === "undefined") {
      return "";
    }

    this.props.subCategories.forEach(sub => {
      subCategories.push(
        <div className="sub-category-item" key={sub.id}>
          <div className="sub-item-name"
            onClick={() => {
              let path = (typeof category === 'undefined') ?
                '/' + categoryType :
                '/' + categoryType + '/' + category;
              this.props.history.push(path + '/' + sub.name.toLowerCase().replace('/', '-'))
            }}>
            {sub.name}</div>
        </div>
      );
    });

    return subCategories;
  }

  updateDimensions() {
    if (this.subCategoryRef.current !== null) {
      const totalChars =  this.getTotalCharacters(this.props.subCategories)
      const subCategoriesWidth = totalChars * 8.9 + this.props.subCategories.length * 30;

      if (subCategoriesWidth > this.subCategoryRef.current.offsetWidth) {
        this.setState({
          subCategoryClass: "adjust-fit-in-box"
        })
      }
      else {
        this.setState({
          subCategoryClass: "justify-content-center"
        })
      }
    } else {
      this.setState({
        subCategoryClass: "justify-content-center"
      })
    }
  }

  getTotalCharacters() {
    let totalChars = 0;
    if(this.props.subCategories.constructor !== Array)
      return 0;
    this.props.subCategories.forEach(sub => {
      totalChars += sub.name.length;
    });
    return totalChars;
  }
};

export default withRouter(SubCategoryLayout);
