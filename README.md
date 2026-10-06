# LifeFocus

A responsive lifestyle planner with monthly, weekly, and daily workout and meal views, workout weight logging, progressive overload suggestions, meal recipes, automatic grocery totals, and body weight and exercise progress charts.

## Run

Requires Node.js 20 or newer. No dependency installation is required.

```sh
npm start
```

The server uses port 3000 (override with `PORT`). Run `npm test` for the progression, grocery aggregation, and calendar tests.

## Deploy to Netlify

Connect this repository to Netlify, leave the build command empty, and use `public` as the publish directory. The included `netlify.toml` supplies the publish directory automatically. No server, functions, API keys, or build dependencies are needed for deployment. You can also drag the `public` folder into Netlify's manual deploy interface.

Browser storage is specific to the site's origin: measurements entered on the local development site do not transfer automatically to the deployed Netlify site. This version supports a single browser without cloud synchronization.

## Using your planner

- Choose Workout plan or Meal plan, select a week, then a day.
- Workout days contain a sample three-set routine. Use one working weight, record reps for each of the three sets, and choose whether you had 0–1 or 2+ reps left. The next occurrence of that exercise uses the most recent earlier session, even across months. All three sets at 10+ reps with 2+ reps left suggests the configured increment. Otherwise repeat the weight and build reps. Two consecutive sessions at the same weight with a set below 8 reps suggest reducing by the larger of 5% or one increment. Old single-set logs remain visible but cannot trigger an increase. Future unlogged sessions never compound projected increases. Suggestions are estimates; adjust to available equipment and comfortable form.
- Edit each day's meals using the recipe selector. The grocery list totals ingredients for all meals in the chosen week, at one serving each.
- Check off each meal and snack after eating. Eaten cards fade; checking every item marks the day complete and fades its day tab. Fully completed weeks fade in Meal plan. Checkmarks persist on this device and can be undone. Changing a recipe resets that meal's checkmark; missing/unplanned days cannot mark a week complete. Eating meals does not remove their ingredients from the shopping plan.
- Log body weight from Overview or My progress. My progress shows body weight and individual exercise trends.
- Settings controls pounds/kilograms, the overload increment, and JSON data export.

The workout routine is an editable-in-source sample. Meals are transcribed from the uploaded Whimsy Goth Recomp Tracker: days 1–25, three meals plus two snacks. Days 26–30 are missing from the PDF, the D4 ingredient list is truncated, and D7 has no recipe. These gaps are shown in the app, and grocery totals explicitly exclude unknown quantities. Cooking steps are added by LifeFocus; ingredient quantities and macro estimates come from the PDF. Data is stored in browser localStorage, with no account, cloud sync, or backend database. Clearing browser data removes your logs. Export backups from Settings. Nutrition estimates are approximate; the source nutrition targets are displayed as reference, not individualized recommendations. Workout structure and the built-in recipe collection are currently defined in source.
