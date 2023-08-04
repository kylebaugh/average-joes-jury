import {DataTypes, Model} from 'sequelize'

import connectToDB from './database.js'

import util from 'util'

export const db = await connectToDB('postgresql:///averagedb')

export class User extends Model {

    // makes results more viewable in console
    [util.inspect.custom](){
        return this.toJSON()
    }

}

User.init(
    {
        userId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    },
    {
        modelName: 'user',
        sequelize: db
    }
)

export class Item extends Model {
    [util.inspect.custom](){
        return this.toJSON()
    }
}

Item.init(
    {
        itemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imgUrl: {
            type:DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        modelName: 'item',
        sequelize: db
    }
)

export class Rating extends Model{
    [util.inspect.custom](){
        return this.toJSON()
    }
}

Rating.init(
    {
        ratingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imgUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        modelName: 'rating',
        sequelize: db
    }
)

User.hasMany(Item, {foreignKey: 'userId'})
Item.belongsTo(User, {foreignKey: 'userId'})

User.hasMany(Rating, {foreignKey: 'userId'})
Rating.belongsTo(User, {foreignKey: 'userId'})

Item.hasMany(Rating, {foreignKey: 'itemId'})
Rating.belongsTo(Item, {foreignKey: 'itemId'})