import { Sequelize } from "sequelize";

const connectToDB = async (dbURI) => {
    console.log(`connecting to db at ${dbURI}`)
    const sequelize = new Sequelize(dbURI, {
        logging: console.log,
        define: {
            underscored: true,
            timestamps: false
        }
    })

    try{
        await sequelize.authenticate()
        console.log('connected to db successfully!')
    }catch (error) {
        console.log(`Error! Unable to connect to db: ${error}`)
    }

    return sequelize
}

export default connectToDB