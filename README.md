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
- Workout days contain a sample three-set routine. Log the weight and reps for your final completed set. Reaching 10 reps suggests the configured increment on the next exercise occurrence; otherwise the weight stays the same. This simple rule does not evaluate form, fatigue, or all sets.
- Edit each day's meals using the recipe selector. The grocery list totals ingredients for all meals in the chosen week, at one serving each.
- Log body weight from Overview or My progress. My progress shows body weight and individual exercise trends.
- Settings controls pounds/kilograms, the overload increment, and JSON data export.

The workout routine is an editable-in-source sample. Meals are transcribed from the uploaded Whimsy Goth Recomp Tracker: days 1–25, three meals plus two snacks. Days 26–30 are missing from the PDF, the D4 ingredient list is truncated, and D7 has no recipe. These gaps are shown in the app, and grocery totals explicitly exclude unknown quantities. Cooking steps are added by LifeFocus; ingredient quantities and macro estimates come from the PDF. Data is stored in browser localStorage, with no account, cloud sync, or backend database. Clearing browser data removes your logs. Export backups from Settings. Nutrition estimates are approximate; the source nutrition targets are displayed as reference, not individualized recommendations. Workout structure and the built-in recipe collection are currently defined in source.
