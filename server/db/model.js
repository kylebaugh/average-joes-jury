import { DataTypes, Model } from "sequelize";
import connectToDB from "./database.js";
import util from "util";
import bcryptjs from "bcryptjs";

export const db = await connectToDB("postgresql:///averagedb");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const hashedPassword = bcryptjs.hashSync(
          user.password,
          bcryptjs.genSaltSync(5)
        );
        user.password = hashedPassword;
      },
      beforeBulkCreate: (users, options) => {
        for (let user of users) {
          const hashedPassword = bcryptjs.hashSync(
            user.password,
            bcryptjs.genSaltSync(5)
          );
          user.password = hashedPassword;
        }
      },
      beforeUpdate: (user, options) => {
        if (user.password) {
          const hashedPassword = bcryptjs.hashSync(
            user.password,
            bcryptjs.genSaltSync(5)
          );
          user.password = hashedPassword;
        }
      },
    },
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
    modelName: "user",
    sequelize: db,
  }
);

export class Item extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Item.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "item",
    sequelize: db,
  }
);

export class Rating extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Rating.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    modelName: "rating",
    sequelize: db,
  }
);

export class Vote extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Vote.init(
  {
    voteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    upVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "vote",
    sequelize: db,
  }
);

export class Category extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
  },
  {
    modelName: "category",
    sequelize: db,
  }
);

User.hasMany(Item, { foreignKey: "userId" });
Item.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

Item.hasMany(Rating, { foreignKey: "itemId" });
Rating.belongsTo(Item, { foreignKey: "itemId" });

User.hasMany(Vote, { foreignKey: "userId" });
Vote.belongsTo(User, { foreignKey: "userId" });

Rating.hasMany(Vote, { foreignKey: "ratingId" });
Vote.belongsTo(Rating, { foreignKey: "ratingId" });

Item.belongsToMany(Category, { through: "ItemCategory" });
Category.belongsToMany(Item, { through: "ItemCategory" });
