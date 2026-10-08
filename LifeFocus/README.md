# LifeFocus

A responsive lifestyle planner with monthly, weekly, and daily workout and meal views, workout weight logging, progressive overload suggestions, meal recipes, automatic grocery totals, and body weight and exercise progress charts.

## Run

Requires Node.js 20 or newer. No dependency installation is needed for local use (the local server includes an in-memory stand-in for the sync service).

```sh
npm start
```

The server uses port 3000 (override with `PORT`). Run `npm test` for the progression, grocery aggregation, and calendar tests.

## Deploy to Netlify

Connect this repository to Netlify and leave the build command empty. The included `netlify.toml` sets `public` as the publish directory and `netlify/functions` as the functions directory. Netlify installs `@netlify/blobs` from `package.json` and deploys the `/api/sync` function automatically; no API keys or settings are required. Deploying by dragging only the `public` folder still works, but cross-device sync will be unavailable because the function isn't deployed.

Browser storage is specific to the site's origin: measurements entered on the local development site do not transfer automatically to the deployed Netlify site. Turn on **Sync across devices** (Settings) to keep several devices in step.

## Using your planner

- Choose Workout plan or Meal plan, select a week, then a day.
- Workout days contain a sample three-set routine. Use one working weight, record reps for each of the three sets, and choose whether you had 0–1 or 2+ reps left. The next occurrence of that exercise uses the most recent earlier session, even across months. All three sets at 10+ reps with 2+ reps left suggests the configured increment. Otherwise repeat the weight and build reps. Two consecutive sessions at the same weight with a set below 8 reps suggest reducing by the larger of 5% or one increment. Old single-set logs remain visible but cannot trigger an increase. Future unlogged sessions never compound projected increases. Suggestions are estimates; adjust to available equipment and comfortable form.
- Edit each day's meals using the recipe selector. The grocery list totals ingredients for all meals in the chosen week, at one serving each.
- Check off each meal and snack after eating. Eaten cards fade; checking every item marks the day complete and fades its day tab. Fully completed weeks fade in Meal plan. Checkmarks persist on this device and can be undone. Changing a recipe resets that meal's checkmark; missing/unplanned days cannot mark a week complete. Eating meals does not remove their ingredients from the shopping plan.
- Log body weight from Overview or My progress. My progress shows body weight and individual exercise trends.
- Settings controls pounds/kilograms, the overload increment, JSON data export, and restoring a previous backup (restoring replaces the data in this browser after a confirmation).
- GLP-1 tracker logs each injection's date, time, medication, dose (mg), injection site, side effects and notes. It shows when the next dose is due (every 7 days by default; change it in Schedule settings), suggests the least recently used injection site, tracks your current dose and when you started it, charts dose over time, summarizes side effects from the last 30 days, and shows body-weight change since your first injection (using your weight check-ins). Entries can be edited or deleted (with undo), and the log exports as CSV to share with your prescriber. Overview shows a reminder when a dose is due or overdue. The tracker is for personal record-keeping only; follow your prescriber's dosing.
- Daily nutrition (Overview, Meals day view, GLP-1 page): protein counts automatically from checked-off meals, with quick +10/20/30 g or custom additions; water is tracked in glasses (≈8 oz). Log **end-of-day totals** for calories, protein, carbs, fat and optional fiber from any source; totals replace the meal-based protein estimate for that day. Set a **calorie goal range** (minimum and/or maximum), protein, water and weekly-workout goals in Settings. My progress shows a calorie chart with your goal band and a table of recent totals.
- The weight charts mark each GLP-1 dose start or change with a dashed line.
- Weekly check-in (Mon–Sun) summarizes workouts, meals, protein, water, calories, weight change and injections, with a day-by-day table and a short reflection (mood, wins, one adjustment). It also shows streaks (logging, protein, water, calorie range, workout weeks, on-time injections) and milestone badges, which pop up as you earn them.
- Appearance can follow your device or be fixed to light or dark in Settings. On phones, navigation is a bottom tab bar; Weekly check-in, My progress, Grocery list, Settings and Sync live under **More**.
- Sync across devices: turning it on creates a private 20-character code; enter it on other devices. Data is encrypted in the browser (AES-GCM with a key derived from the code) before upload to Netlify Blobs, so the server stores only ciphertext. Sync runs when the app opens, when you return to it, and shortly after each change. If two devices change data at the same time, entries are combined and the most recent device wins for the same field; something deleted on one device while another was offline may reappear. Losing the code means the synced copy can't be recovered, so keep it somewhere safe; each device keeps its own local copy.
- Change an exercise using its dropdown: the replacement loads its own usual weight and sets/rep range immediately, using its earlier logs for progressive overload. Swaps apply to the selected day and persist. Edit usual weight & sets/reps saves defaults for that exercise; previous logged weights take precedence over starting weights. Add new exercise saves a named exercise with your usual weight, 1–6 sets, and rep range, selects it for today, and makes it available in future workout dropdowns and progress charts. Original exercise logs are retained separately. The built-in starting weights are sample estimates, not personalized measurements.

The workout routine is an editable-in-source sample. Meals are transcribed from the uploaded Whimsy Goth Recomp Tracker: days 1–25, three meals plus two snacks. Days 26–30 are missing from the PDF, the D4 ingredient list is truncated, and D7 has no recipe. These gaps are shown in the app, and grocery totals explicitly exclude unknown quantities. Cooking steps are added by LifeFocus; ingredient quantities and macro estimates come from the PDF. Data is stored in browser localStorage; optional sync stores an encrypted copy on Netlify. There is no account. Clearing browser data removes your logs. Export backups from Settings. Nutrition estimates are approximate; the source nutrition targets are displayed as reference, not individualized recommendations. Workout structure and the built-in recipe collection are currently defined in source.
