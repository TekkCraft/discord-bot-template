# Discord Bot

Some instructions to get you up and running with your own discord bot.

## Add bot to Discord

Register bot on Discord following the official instructions: https://discord.com/developers/docs/getting-started

Simply open this url, log in with your Discord account and select the server to add the bot to. \
https://discord.com/api/oauth2/authorize?client_id=[APPLICATION_ID]5&permissions=8&scope=bot

!WARNING! ``permission=8`` gives the bot administrator permissions.
Use the Bot Permission calculator at the bottom of the "Bot" tab in the Discord backend.


## Setup for development

* Clone the repository
* Copy ``example.config.json`` to ``config.json`` and replace the placeholder data with your secrets.
* run ``npm install``
* run ``node bot.js`` to start the bot
* run ``node deploy-commands.js`` To inform Discord about the commands your bot has

## Deployment

!WARNING! This is not ideal for production. Proceed with caution.

### On your Ubuntu server

* ``sudo apt-get update``
* ``sudo apt install git``
* Check git version ``git --version``
* ``git config --global user.name "[some user-name]"``
* ``git config --global user.email "[your github email]"``
* Generate SSH key ``ssh-keygen -t rsa``
* Read key ``cat ~/.ssh/id_rsa.pub`` (This is the key required in GitHub)

### On GitHub

* Go to your GitHub repository => Settings => Deploy keys
* Add a new deploy key with read access and past in your servers public key as "Key"

### On your Ubuntu server

* ``sudo mkdir /var/bots``
* ``cd /var/bots``
* ``git clone git@github.com:[githubuser]/[gitrepo].git``\
    or for specific branch
* ``git clone -b [branch_name] git@github.com:[githubuser]/[gitrepo].git``
* ``sudo chown -R ${USER}:${USER} /var/bots``

### Register as service
* Find node installation location ``which node``
* ``sudo vi /etc/systemd/system/discord-bot.service``
```
[Unit]
Description=Hypixel Discord Bot

[Service]
ExecStart=[PATH_TO_NODE] [PATH_TO_BOT_EXECUTABLE.js]
WorkingDirectory=[PATH_TO_BOT]
Restart=always
RestartSec=10
SyslogIdentifier=hypixel-discord-bot

Environment=NODE_ENV=production PORT=1337

[Install]
WantedBy=multi-user.target
```
* Set service file permission ``sudo chmod 644 /etc/systemd/system/discord-bot.service``
* Reload daemon ``sudo systemctl daemon-reload``
* Enable service ``sudo systemctl enable discord-bot.service``
* Check service status ``sudo systemctl status discord-bot.service``

## Update install from GitHub

* Pull changes from GitHub in your bot dir ``git fetch && git pull``
* Restart service ``sudo systemctl restart discord-bot.service``
* Push new commands to servers ``node deploy-commands.js``