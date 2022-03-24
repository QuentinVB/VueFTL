'use strict';
const Uuid = require('uuid');

class User
{
    constructor(username,uuid) {
        this.username = username;
        this.uuid =  uuid;
    }
}
module.exports = User;
