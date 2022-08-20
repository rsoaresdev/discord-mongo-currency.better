var connection;
const mongoose = require("mongoose");
const currencyModel = require("./models/CurrencyModel");

class mongoCurrency {
  /**
   *
   * @param {string} url - A MongoDB connection string.
   */

  static async connect(url) {
    if (!url)
      throw new TypeError("You didn't provide a MongoDB connection string");

    connection = url;

    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  /**
   *
   * @param {string} userId - A valid discord user ID.
   * @param {string} guildId - A valid discord guild ID.
   */

  static async findUser(userId, guildId) {
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });
    if (!user) return false;

    return user;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - Amount of coins to give.
   */

  static async giveCoins(userId, guildId, amount) {
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");
    if (!amount) throw new TypeError("You didn't provide an amount of coins.");
    if (isNaN(amount)) throw new TypeError("The amount must be a number.");
    if (amount < 0) throw new TypeError("New amount must not be under 0.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      const newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: 0,
        coinsInWallet: parseInt(amount),
      });

      await newData.save().catch((err) => console.log(err));

      return amount;
    }

    user.coinsInWallet += parseInt(amount);

    await user.save().catch((err) => console.log(err));

    return amount;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - Amount of coins to give.
   */

  static async giveCoinsBank(userId, guildId, amount) {
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");
    if (!amount) throw new TypeError("You didn't provide an amount of coins.");
    if (isNaN(amount)) throw new TypeError("The amount must be a number.");
    if (amount < 0) throw new TypeError("New amount must not be under 0.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      const newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: parseInt(amount),
        coinsInWallet: 0,
      });

      await newData.save().catch((err) => console.log(err));

      return amount;
    }

    user.coinsInBank += parseInt(amount);

    await user.save().catch((err) => console.log(err));

    return amount;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   * @param {string} amount - Amount of coins to deduct.
   */

  static async deductCoins(userId, guildId, amount) {
    // deduct means "remove", something in particular.
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");
    if (!amount) throw new TypeError("You didn't provide an amount of coins.");
    if (isNaN(amount)) throw new TypeError("The amount must be a number.");
    if (amount < 0) throw new TypeError("New amount must not be under 0.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      const newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: 0,
        coinsInWallet: 0,
      });

      await newData.save().catch((err) => console.log(err));

      return amount;
    }

    if (amount > user.coinsInWallet) {
      user.coinsInWallet -= user.coinsInWallet;

      await user.save().catch((err) => console.log(err));

      return amount;
    }

    user.coinsInWallet -= parseInt(amount);

    await user.save().catch((err) => console.log(err));

    return amount;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - Amount of coins to give.
   */
  static async deductCoinsBank(userId, guildId, amount) {
    // deduct means "remove", something in particular.
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");
    if (!amount) throw new TypeError("You didn't provide an amount of coins.");
    if (isNaN(amount)) throw new TypeError("The amount must be a number.");
    if (amount < 0) throw new TypeError("New amount must not be under 0.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      const newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: 0,
        coinsInWallet: 0,
      });

      await newData.save().catch((err) => console.log(err));

      return amount;
    }

    if (amount > user.coinsInBank) {
      user.coinsInBank -= user.coinsInBank;

      await user.save().catch((err) => console.log(err));

      return amount;
    }

    user.coinsInBank -= parseInt(amount);

    await user.save().catch((err) => console.log(err));

    return amount;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   * @param {string} amount - Amount of bank space to give.
   */

  static async giveBankSpace(userId, guildId, amount) {
    if (!userId) throw new TypeError("You didn't provide a user ID.");
    if (!guildId) throw new TypeError("You didn't provide a guild ID.");
    if (!amount) throw new TypeError("You didn't provide an amount of coins.");
    if (isNaN(amount)) throw new TypeError("The amount must be a number.");
    if (amount < 0) throw new TypeError("New amount must not be under 0.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      let newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000 + parseInt(amount),
        coinsInBank: 0,
        coinsInWallet: 0,
      });

      await newData.save().catch((err) => console.log(err));

      return amount;
    }

    user.bankSpace += parseInt(amount);

    await user.save().catch((err) => console.log(err));

    return amount;
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   */

  static async createUser(userId, guildId) {
    if (!userId) throw new TypeError("Please provide a user ID.");
    if (!guildId) throw new TypeError("Please provide a guild ID.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });
    if (user) return false;

    let newData = new currencyModel({
      userId: userId,
      guildId: guildId,
      bankSpace: 1000,
      coinsInBank: 0,
      coinsInWallet: 0,
    });

    await newData.save().catch((err) => console.log(err));
  }

  /**
   *
   * @param {string} userId - A discord user ID.
   * @param {string} guildId - A discord guild ID.
   */

  static async deleteUser(userId, guildId) {
    if (!userId) throw new TypeError("Please provide a user ID.");
    if (!guildId) throw new TypeError("Please provide a guild ID.");

    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });
    if (!user) return false;

    await currencyModel.findOneAndRemove({ userId: userId, guildId: guildId });

    await user.save().catch((err) => console.log(err));
  }

  /**
   *
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - The amount of users to show.
   */

  static async generateLeaderboardTotal(guildId, amount) {
    if (!guildId) throw new TypeError("Please provide a guild ID.");
    if (!amount)
      throw new TypeError("Please provide the amount of users to show.");
    if (isNaN(amount)) throw new TypeError("Amount must be a number");

    let users = await currencyModel
      .find({ guildId: guildId })
      .sort({ coinsInBank: -1, coinsInWallet: -1 })
      .exec();

    return users.slice(0, amount);
  }

  /**
   *
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - The amount of users to show.
   */
  static async generateLeaderboardWallet(guildId, amount) {
    if (!guildId) throw new TypeError("Please provide a guild ID.");
    if (!amount)
      throw new TypeError("Please provide the amount of users to show.");
    if (isNaN(amount)) throw new TypeError("Amount must be a number");

    let users = await currencyModel
      .find({ guildId: guildId })
      .sort({ coinsInWallet: -1 })
      .exec();

    return users.slice(0, amount);
  }

  /**
   *
   * @param {string} guildId - A discord guild ID.
   * @param {number} amount - The amount of users to show.
   */
  static async generateLeaderboardBank(guildId, amount) {
    if (!guildId) throw new TypeError("Please provide a guild ID.");
    if (!amount)
      throw new TypeError("Please provide the amount of users to show.");
    if (isNaN(amount)) throw new TypeError("Amount must be a number");

    let users = await currencyModel
      .find({ guildId: guildId })
      .sort({ coinsInBank: -1 })
      .exec();

    return users.slice(0, amount);
  }

  /**
   *
   * @param {string} userId - An discord user ID
   * @param {string} guildId - An discord guild ID
   * @param {number} amount - An amount how much deposit on the bank
   */
  static async deposit(userId, guildId, amount) {
    if (!userId) throw new TypeError("Please provide an user ID.");
    if (!guildId) throw new TypeError("Please provide a guild ID.");
    if (!amount) throw new TypeError("Please provide the amount to deposit.");
    if (isNaN(amount)) throw new TypeError("Amount must be a number.");
    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      let newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: 0,
        coinsInWallet: 0,
      });
      await newData.save().catch((err) => console.log(err));
    }
    if (amount > user.coinsInWallet) {
      let newAmount = user.coinsInWallet; // srry for this
      user.coinsInWallet -= user.coinsInWallet;
      user.coinsInBank += parseInt(newAmount);
      await user.save().catch((err) => console.log(err));
      return newAmount;
    }
    user.coinsInWallet -= parseInt(amount);
    user.coinsInBank += parseInt(amount);
    await user.save().catch((err) => console.log(err));
    return amount;
  }
  /**
   *
   * @param {string} userId - An discord user ID
   * @param {string} guildId - An discord guild ID
   * @param {number} amount - An amount how much withdraw from the bank
   */
  static async withdraw(userId, guildId, amount) {
    if (!userId) throw new TypeError("Please provide an user ID.");
    if (!guildId) throw new TypeError("Please provide a guild ID.");
    if (!amount) throw new TypeError("Please provide the amount to deposit.");
    if (isNaN(amount)) throw new TypeError("Amount must be a number.");
    let user = await currencyModel.findOne({
      userId: userId,
      guildId: guildId,
    });

    if (!user) {
      let newData = new currencyModel({
        userId: userId,
        guildId: guildId,
        bankSpace: 1000,
        coinsInBank: 0,
        coinsInWallet: 0,
      });
      await newData.save().catch((err) => console.log(err));
    }
    if (amount > user.coinsInBank) {
      let newAmount = user.coinsInBank; // srry for this
      user.coinsInBank -= user.coinsInBank;
      user.coinsInWallet += parseInt(newAmount);
      await user.save().catch((err) => console.log(err));
      return newAmount;
    }
    user.coinsInBank -= parseInt(amount);
    user.coinsInWallet += parseInt(amount);
    await user.save().catch((err) => console.log(err));
    return amount;
  }
}

module.exports = mongoCurrency;
