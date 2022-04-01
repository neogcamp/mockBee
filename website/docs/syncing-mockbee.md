# Syncing Mockbee

This section briefs about how you can keep your existing mockbee powered app up to date with latest mockbee changes. Let us learn this by an example of **Adding Watch Later feature to existing mockbee video library app**

> Idea is to take the latest changes on the github repo to our existing project. We will copy all the updated changes from the files in our project from the github project. You can use `github1s` to view the files in interactive mode, making it easy to copy.

### 1. Find your project

- Go to `github.com/mockbee/apps/video-library`
- As we know, the logic is inside the controllers. So the `Watch Later` feature will be inside `src/backend/controllers`.
- Watch Later feature is present in `WatchLaterController.js` (this file will not present be in present mockbee project).
- In `utils` folder, we dont find any utility file related to this new feature. Though for other cases, you must check it if it is in sync with your project or not.
- Check the db file to see if there is any seeding data related to this new 'Watch later' feature. (we didn't find any change there too)
- In `server.js` file, there are couple of API routes that are not present in the project.

### 2. Copy-paste file contents

- Copy the parts which aren't present in your project in `server.js` file.
- Copy the new `WatchLaterController.js` in your project's controllers folder as in the github mockbee.
- For this feature, we didn't had to copy anything else.

### 3. Testing its working

- Copy-pasting is prone to missing out and errors. Test the added endpoints in `server.js` about the feature on `mockman-js`.
- Debug and re-check if something breaks.

### 4. Further Steps

- To get more detailed and granular level of customization tips and insights, refer [/customization](/docs/customization) page.
