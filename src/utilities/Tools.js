export default {
    getValue: function(obj, key) {
        if (!obj || !key) {
            return null;
        }

        var path = key.split('.');
        var curObj = obj;

        for (var i = 0; i < path.length; i++) {
            if (curObj[path[i]] || curObj[path[i]] === 0) {
                curObj = curObj[path[i]];
            } else {
                return null;
            }
        }

        return curObj;
    },

    getAppLaunchCount: function() {
        return parseInt(localStorage.getItem('launchCount'), 10) || 0;
    },

    setAppLaunchCount: function(appLaunchCount) {
        localStorage.setItem('launchCount', appLaunchCount);
    },

    getAppLang() {
        return localStorage.getItem('appLang') || null;
    },

    setAppLang(appLang) {
        localStorage.setItem('appLang', appLang);
    },

    shouldShowCookie() {
		let cookieStatus = localStorage.getItem('acceptCookie') || null;
		return (!cookieStatus) ? true : false;
    },
    
    setCookie() {
        localStorage.setItem('acceptCookie', true);
    },

    getStoreData() {
        return {
            shouldShowCookie: this.shouldShowCookie(),
            appLang: this.getAppLang(),
            appLaunchCount: this.getAppLaunchCount()
        }
    },

    isEmptyObj: function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    getBuyBoxes: function(store) {
        let buyBoxes = store.split(';');
        buyBoxes = buyBoxes.filter((item) => {
            let buybox = JSON.parse(item);
            return (buybox.available);
        });
        return buyBoxes;
    },

    setLikedPoetry: function(poetry) {
        try {
            localStorage.setItem(
                'likedPoetry',
                JSON.stringify(poetry)
            );
        } catch (e) {
            console.log('[Tools] Could not set liked poetry in storage');
            console.log(e);
        }
    },

    getLikedPoetry: function() {
        let likedPoetry;
        try {
            likedPoetry = JSON.parse(
                localStorage.getItem('likedPoetry')
            ) || [];
        } catch (e) {
            console.log('[Tools] Could not retrieve liked poetry from storage');
            console.log(e);
        }
        return likedPoetry;
    },

    addLikedPoetryItem: function(item) {
        let likedPoetry = this.getLikedPoetry();
        likedPoetry.push(item);
        this.setLikedPoetry(likedPoetry);
    },

    removeLikedPoetryItem: function(itemtoDelete) {
        let likedPoetry = this.getLikedPoetry();
        likedPoetry = likedPoetry.filter(function(item) {
            return item.id !== itemtoDelete;
        });
        this.setLikedPoetry(likedPoetry);
    },

    removeAllLikedPoetry: function() {
        let likedPoetry = [];
        this.setLikedPoetry(likedPoetry);
    },

    poetryItemIsInStorage: function(item) {
        let likedPoetry = this.getLikedPoetry();
     
        for (var i = 0; i < likedPoetry.length; i++) {
            if (likedPoetry[i].id === item) {
                return true
            }
        }
        return false;
    },

    getUserFavouritesPoetry: function(allPoetry) {
        let userFavourites = [],
            likedPoetry = this.getLikedPoetry();
        
        for (let i = 0; i < likedPoetry.length; i++) {
            for (let j = 0; j < allPoetry.length; j++) {
                if (likedPoetry[i].id === allPoetry[j].poetryId) {
                    userFavourites.push(allPoetry[j]);
                }
            }
        }
        return userFavourites;
    },

    orderPoetryByMostPopular: function(allPoetry) {
        let orderByMostPopular = [];
        orderByMostPopular = allPoetry.slice().sort(function(a, b) {
            return parseInt(b.nbViews, 10) - parseInt(a.nbViews, 10);
        });

        return orderByMostPopular;
    },

    orderPoetryByLatest: function(allPoetry) {
        let orderByLatest = [];
        orderByLatest = allPoetry.slice().sort(function(a, b) {
            return (new Date(b.created) - new Date(a.created));
        });
        return orderByLatest;
    },

    getGenres: function(genre) {
        const genres = genre.split(',');
        return genres;
    },

    convertNewsDate: function(date) {
        let d = date.split(' ')[0];
        d = d.split('-').reverse().join('/');
        return d;
    },

    openAuthorTwitterPage: function() {
        window.open('https://twitter.com/AllyFRose1', '_blank');
    }
}