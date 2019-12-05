import React from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse'
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DRAWER } from 'consts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Utils } from 'utils';

class SwipeableTemporaryDrawerLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: false,
      market: false,
      news: false,
      sports: false,
      games: false
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SwipeableDrawer
          open={this.props.open}
          onOpen={() => this.props.toggle(true)}
          onClose={() => this.props.toggle(false)}
        >
          <div
            role="button"
            onClick={() => this.props.toggle(false)}
            onKeyDown={() => this.props.toggle(false)}
          >
            {this.renderSideList()}
          </div>
        </SwipeableDrawer>
      </MuiThemeProvider>
    );
  }

  renderSideList() {
    const { classes, category } = this.props;
    return (
      <div className={classes.list}>
        <div>
          <img id="logo" height='55px'
            src="/assets/images/logo.png"
            onClick={() => { this.props.history.push('/') }}
          />
          <i className={`far fa-times ${classes.close}`}></i>
        </div>
        <Divider />
        <List>
          <ListItem button key={"language"} onClick={() => { $('#languageModal').modal('show'); }} >
            <i className={`fa-lg fa-language ${classes.icon}`} />
            <ListItemText primary={"Language"} />
          </ListItem>
          {
            Object.keys(DRAWER).map(key => (
              <div key={key}>
                <ListItem button onClick={() => { this.props.history.push(DRAWER[key].path) }}>
                  <i className={`${DRAWER[key].icon} fa-lg ${classes.icon}`}></i>
                  <ListItemText primary={DRAWER[key].name} />
                  {key !== 'home' ? this.renderExpand(key) : ''}
                </ListItem>

                <Collapse in={this.state[key]} timeout="auto" unmountOnExit>
                  <List className={classes.subList} component="div" disablePadding>
                    {
                      typeof category[key] !== 'undefined' ?
                        category[key].map(category => (
                          <ListItem
                            key={category.id}
                            onClick={() => {
                              let url = this.renderUrl(DRAWER[key].name, category.name);
                              this.props.history.push(url.toLowerCase())
                            }}
                            button>
                            <i className={`fa-plus fa fa-sm ${classes.icon}`}></i>
                            <ListItemText className={classes.subItem} inset primary={category.name} />
                          </ListItem>
                        ))
                        :
                        ""
                    }

                  </List>
                </Collapse>
              </div>
            ))
          }
          {this.renderLogout()}
        </List>
      </div>
    );
  }

  renderLogout() {
    if(this.props.authenKey === "")
      return <div></div>
    return (
      <ListItem button key={"logout"} onClick={() => {this.props.clearSid(); Utils.clearUserCache()}} >
        <ListItemText primary={"Logout"} />
      </ListItem>
    )
  }
  renderExpand(key) {
    return (
      <div onClick={(e) => {
        this.setState({[key]: !this.state[key]})
        e.stopPropagation();
      }}>{this.state[key] ? <ExpandLess /> : <ExpandMore />}</div>
    )
  }

  renderUrl(categoryType, category) {
    if (categoryType.toLowerCase() === "market") {
      return `/${categoryType}/${this.props.categoryToParentMap.get(category)}/${category.replace('/', '-')}`
    }
    return `/${categoryType}/${category}`
  }
}

const styles = {
  list: {
    width: "250px",
  },
  close: {
    color: 'black',
    float: "right",
    fontWeight: "200",
    fontSize: "25px",
    padding: "10px"
  },
  icon: {
    color: 'black',
    fontStyle: 'normal',
    width: '25px'
  },
  subItem: {
    paddingLeft: '0px !important'
  },
  subList: {
    paddingLeft: '30px'
  }
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#fff'
      }
    },
    MuiTypography: {
      body1: {
        color: 'black'
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: 'grey'
      }
    },
    MuiListItem: {
      root: {
        height: '50px'
      }
    },
    MuiListItemText: {
      inset: {
        paddingLeft: '30px',
      }
    },
    MuiSvgIcon: {
      root: {
        color: '#5f749e'
      }
    }
  }
});

export default withRouter(withStyles(styles)(SwipeableTemporaryDrawerLayout));
