const { get, post, getURL, replacePlaceholders } = require('./../util.js');

module.exports = class Sonarr {
    constructor(config) {
        this.config = config;
        this.endpoints = {
            "/series" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/series?apikey=${config.apikey}`),
            "/series/id" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/series/%ID%?apikey=${config.apikey}`),
            "/series/lookup" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/series/lookup?term=%NAME%&apikey=${config.apikey}`),
            "/profile" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/profile?apikey=${config.apikey}`),
            "/rootfolder" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/rootfolder?apikey=${config.apikey}`),
            "/system/status" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/system/status?apikey=${config.apikey}`),
            "/languageprofile" : getURL(config.host, config.port, config.ssl, config.baseurl + `/api/v3/languageprofile?apikey=${config.apikey}`)
        };
    }

    getSeries() {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/series']
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    console.log(response);
                    reject(response);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    getSeriesByID(id) {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: replacePlaceholders(this.endpoints['/series/id'], { "%ID%":id })
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    console.log(response);
                    reject(response);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    seriesLookup(name) {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: replacePlaceholders(this.endpoints['/series/lookup'], { "%NAME%":encodeURI(name) })
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    console.log(response);
                    reject(response);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    getProfiles() {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/profile']
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    reject(response);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getProfileByID(id) {
        return new Promise((resolve, reject) => {
            this.getProfiles().then((profiles) => {
                for (let i = 0; i < profiles.length; i++) {
                    if (profiles[i].id === id) {
                        resolve(profiles[i]);
                    }
                }
                console.log(`profile ID: ${id} not found.`);
                reject(`profile ID: ${id} not found.`);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    getRootFolders() {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/rootfolder']
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    reject(response);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getRootFolderByID(id) {
        return new Promise((resolve, reject) => {
            this.getRootFolders().then((rootfolders) => {
                for (let i = 0; i < rootfolders.length; i++) {
                    if (rootfolders[i].id === id) {
                        resolve(rootfolders[i]);
                    }
                }
                console.log(`rootfolder ID: ${id} not found.`);
                reject(`rootfolder ID: ${id} not found.`);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    getLanguageProfiles() {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/languageprofile']
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    reject(response);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getLanguageProfileByID(id) {
        return new Promise((resolve, reject) => {
            this.getLanguageProfiles().then((languageprofiles) => {
                for (let i = 0; i < languageprofiles.length; i++) {
                    if (languageprofiles[i].id === id) {
                        resolve(languageprofiles[i]);
                    }
                }
                console.log(`languageprofile ID: ${id} not found.`);
                reject(`languageprofile ID: ${id} not found.`);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    addSeries(newSeries) {
        return new Promise((resolve, reject) => {
            post({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/series'],
                body: JSON.stringify(newSeries)
            }).then(({response, body}) => {
                if (response.statusCode === 201) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    console.log(response);
                    reject();
                }
            }).catch((err) => {
                console.log(err);
                reject();
            });
        });
    }

    getSystemStatus() {
        return new Promise((resolve, reject) => {
            get({
                headers: {'accept' : 'application/json',
                'User-Agent': `Mellow/${process.env.npm_package_version}`},
                url: this.endpoints['/system/status']
            }).then(({response, body}) => {
                if (response.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                else {
                    console.log(response);
                    reject(response);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
