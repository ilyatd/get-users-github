const store = new Vuex.Store({
    state: {
        urlSerch: 'https://api.github.com/search/users?q=',
        error: null,
        users: null,
        usersOnPage: 10,
        currentPage: 0,
    },
    getters: {
        pageCount(state) {
            if(state.users !== null && state.users.length > state.usersOnPage) {
                let count = Math.trunc(state.users.length / state.usersOnPage);
                if (state.users % state.usersOnPage == 0) count--;
                return count
            } else return 1
        },
        renderUsers(state, getters) {
            if (state.users !== null && state.users.length !== 0 && getters.pageCount > 1) {
                return state.users.slice(state.currentPage, state.currentPage + state.usersOnPage);
            } else return state.users
        }
    },
    mutations: {
        clearState(state) {
            state.error = null;
            state.users = null;
            state.currentPage = 0;
            state.renderUsers = [];
        },
        addUsers(state, users) {
            state.users = users;
        },
        errorFetch(state, error) {
            state.error = 'Ошибка загрузки данных: ' + error;
        },
        sortUsers(state, action) {
            if (action === 'down') {
                state.users.sort((user1, user2) => {
                    if (user1.public_repos > user2.public_repos) {
                        return -1
                    } else if (user1.public_repos < user2.public_repos) {
                        return 1
                    } else return 0
                });
            }
            if (action === 'up') {
                state.users.sort((user1, user2) => {
                    return user1.public_repos - user2.public_repos
                });
            }
        },
        changePage(state, link) {
            if (link === 'prev' && state.currentPage > 0) {
                state.currentPage--;
            } else if (link === 'next' && state.currentPage < store.getters.pageCount - 1) {
                state.currentPage++;
            } else if (typeof link === 'number') {
                state.currentPage = link - 1;
            }
        }
    },
    actions: {
        async getShortInfoUsers({commit}, url){
            let shortData = null;
            try {
                let response = await fetch (url);
                shortData = await response.json();
            } catch (error) {
                commit('errorFetch', error);
            }
            return shortData
        },
        async getFullInfoUsers({commit}, shortData){
            let fullData = [];
                await shortData.items.forEach(async (item) => {
                    let user = null;
                    try {
                        let response = await fetch(item.url);
                        user = await response.json();
                    } catch (error) {
                        commit('errorFetch', error);
                    }
                    if (user !== null) {
                        fullData.push(user);
                    }
                });
            return fullData
        },
        async getUsers({dispatch, state, commit}, nameUser) {
            commit('clearState');
            let url = state.urlSerch + nameUser;
            let shortData = await dispatch('getShortInfoUsers', url);
            let fullData = null;
            if (shortData !== null && shortData.total_count !== 0) {
                fullData = await dispatch('getFullInfoUsers', shortData);
                commit('addUsers', fullData);
            }
        }
    }
});