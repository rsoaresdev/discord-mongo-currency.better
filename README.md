# discord-mongo-currency.better
A npm package for making economy bots.

> Forked from discord-mongo-currency (https://www.npmjs.com/package/discord-mongo-currency)
# Installation
```npm i discord-mongo-currency.better```

# Starting
Start off by connecting discord-mongo-currency to MongoDB.
```js
const mongoCurrency = require('discord-mongo-currency.better');
mongoCurrency.connect('MongoURI');
```

# Changelog
- Update mongoose package to `^6.5.2`
- Added **withdraw** method
- Added **giveCoinsBank** method
- Added **deductCoinsBank** method
- Added **generateLeaderboardTotal** method
- Added **generateLeaderboardWallet** method
- Added **generateLeaderboardBank** method
- Finished deposit method
- Bugs fixed

# All Methods
##### createUser(userId, guildId)
Adds a user to the database.

##### deleteUser(userId, guildId)
Deletes a user from the database.

##### giveCoins(userId, guildId, amount)
Gives coins to the user's wallet. Adds the user to the database if the user is saved in the database.

##### giveCoinsBank(userId, guildId, amount)
Gives coins to the user's bank. Adds the user to the database if the user is saved in the database.

##### deductCoins(userId, guildId, amount)
Deducts coins from a user's wallet.

##### deductCoinsBank(userId, guildId, amount)
Deducts coins from a user's bank.

##### findUser(userId, guildId)
Finds the user in the database.

##### giveBankSpace(userId, guildId, amount)
Gives bank space to a user.

##### deposit(userId, guildId, amount)
Deposits coins from the users wallet.

##### generateLeaderboardTotal(guildId, amount)
Generates a leaderboard with the total money of the members.

##### generateLeaderboardWallet(guildId, amount)
Generates a leaderboard with the money from the user's wallets.

##### generateLeaderboardBank(guildId, amount)
Generates a leaderboard with the money from the user's bank.

#### withdraw(userId, guildId, amount)
Withdraws coins from the users bank.

# Command Examples
##### Balance Command
```js
    const mongoCurrency = require('discord-mongo-currency.better');
    const { EmbedBuilder } = require('discord.js');

    const user = await mongoCurrency.findUser(interaction.user.id, interaction.guild.id); // Get the user from the database.

    const embed = new EmbedBuilder()
    .setTitle(`${interaction.user.username}'s Balance`)
    .setDescription(`Wallet: ${user.coinsInWallet}\nBank: ${user.coinsInBank}/${user.bankSpace}\nTotal: ${user.coinsInBank + user.coinsInWallet}`);

    interaction.reply({ embeds: [embed] });
```

##### Beg Command
```js
    const mongoCurrency = require('discord-mongo-currency.better');

    const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins.
    await mongoCurrency.giveCoins(interaction.user.id, interaction.guild.id, randomCoins);
```

##### Leaderboard Command
```js
    const mongoCurrency = require('discord-mongo-currency.better');
    const { EmbedBuilder } = require('discord.js');
    
    const leaderboard = await db.generateLeaderboardBank(interaction.guild.id, 10); // you can use "generateLeaderboardWallet" too!

    const embed1 = new EmbedBuilder()
      .setDescription(`Nobody in the leaderboard.`);

    if (leaderboard.length < 1) {
      return interaction.reply({
        embeds: [embed1],
      });
    }

    const mappedLeaderboard = leaderboard.map(
      (i) =>
        `${
            `<@${i.userId}> • ${i.coinsInBank}` ??
            `Nobody.`
          }`
      );

      const embed = new EmbedBuilder()
        .setTitle(
          `${interaction.guild.name} Leaderboard`
        )
        .setDescription(`${mappedLeaderboard.join("\n")}`);

      interaction.reply({
        embeds: [embed],
      });
```
