'use strict';
import { Model } from "sequelize/types";

export default class User extends Model
{
    constructor(username,uuid) {
        this.username = username;
        this.uuid =  uuid;
    }
}
