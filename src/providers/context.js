import React, { Component, Children, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../store/actions/auth';
import { hideLoading, showLoading } from '../store/actions/loading';
import { hideSearch, showSearch } from '../store/actions/search';
import Loading from '../components/Loading/loading';
import SearchModal from '../components/SearchModal/searchModal';

const styles = require('./styles');

class Context extends Component {
    static propTypes = {
        children: PropTypes.shape().isRequired,
    };

    static defaultProps = {
        auth: null,
    };

    static childContextTypes = {
        actions: PropTypes.objectOf(PropTypes.any),
    };

    constructor(props, context) {
        super(props, context);
    }

    getChildContext() {
        return {
            actions: {
                showLoading: (open) => {
                    if (open) return this.props.showLoading(open);
                    this.props.hideLoading();
                },
                setUser: (user) => {
                    this.props.saveUserInfo(user);
                },
                showSearch: (open) => {
                    if (open) return this.props.showSearch();
                    this.props.hideSearch();
                },
            },
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Loading showLoading={this.props.loading.show} title={this.props.loading.status} />
                <SearchModal
                    showSearch={this.props.search.show}
                    onBackPress={() => {
                        this.props.hideSearch();
                    }}
                />
                {Children.only(this.props.children)}
            </SafeAreaView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveUserInfo: (user) => {
            dispatch(saveUser(user));
        },
        showLoading: (status) => {
            dispatch(showLoading(status));
        },
        hideLoading: () => {
            dispatch(hideLoading());
        },
        showSearch: () => {
            dispatch(showSearch());
        },
        hideSearch: () => {
            dispatch(hideSearch());
        },
    };
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        loading: state.loading,
        search: state.search,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Context);
