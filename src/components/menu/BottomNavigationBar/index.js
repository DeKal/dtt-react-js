import { connect } from 'react-redux';
import BottomNavigationBarLayout from 'components/menu/BottomNavigationBar/BottomNavigationBarLayout';
import { Translate } from "react-localize-redux";
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        showBadge: state.betReducer.betStore.length,
        translate: getTranslate(state.localize)
    }
};

const BottomNavigationBar = connect(
    mapStateToProps
)(BottomNavigationBarLayout);

export default BottomNavigationBar;
