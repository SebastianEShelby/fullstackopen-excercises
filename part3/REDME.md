part 3 excercises moved to new git repo for easier deployment

Whenever you make changes to the application, you can take the new version to production with a command: `fly deploy`

Set `.env` secrets using `fly secrets set <key=value>`

To run mongoose scripts: `node mongo.js`