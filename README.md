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
- Workout days contain a sample three-set routine. Use one working weight, record reps for each of the three sets, and choose whether you had 0–1 or 2+ reps left. The next occurrence of that exercise fills in the most recent earlier completed weight and each set’s reps, even across months or different workout days. The last completed results are displayed with their date. Progression suggestions remain separate; inputs keep the actual completed weight until you change it. All three sets at 10+ reps with 2+ reps left suggests the configured increment. Otherwise repeat the weight and build reps. Two consecutive sessions at the same weight with a set below 8 reps suggest reducing by the larger of 5% or one increment. Old single-set logs remain visible but cannot trigger an increase. Future unlogged sessions never compound projected increases. Suggestions are estimates; adjust to available equipment and comfortable form.
- Edit each day's meals using the recipe selector. The grocery list totals ingredients for all meals in the chosen week, at one serving each.
- Check off each meal and snack after eating. Eaten cards fade; checking every item marks the day complete and fades its day tab. Fully completed weeks fade in Meal plan. Checkmarks persist on this device and can be undone. Changing a recipe resets that meal's checkmark; missing/unplanned days cannot mark a week complete. Eating meals does not remove their ingredients from the shopping plan.
- Log body weight from Overview or My progress. My progress shows body weight and individual exercise trends.
- Settings controls pounds/kilograms, the overload increment, JSON data export, and restoring a previous backup (restoring replaces the data in this browser after a confirmation).
- GLP-1 tracker logs each injection's date, time, medication, dose (mg), injection site, side effects and notes. It shows when the next dose is due (every 7 days by default; change it in Schedule settings), suggests the least recently used injection site, tracks your current dose and when you started it, charts dose over time, summarizes side effects from the last 30 days, and shows body-weight change since your first injection (using your weight check-ins). Entries can be edited or deleted (with undo), and the log exports as CSV to share with your prescriber. Overview shows a reminder when a dose is due or overdue. The tracker is for personal record-keeping only; follow your prescriber's dosing.
- Daily nutrition (Overview, Meals day view, GLP-1 page): protein counts automatically from checked-off meals, with quick +10/20/30 g or custom additions; water is tracked in glasses (≈8 oz). Log **end-of-day totals** for calories, protein, carbs, fat and optional fiber from any source; totals replace the meal-based protein estimate for that day. Set a **calorie goal range** (minimum and/or maximum), protein, water and weekly-workout goals in Settings. My progress shows a calorie chart with your goal band and a table of recent totals.
- The weight charts mark each GLP-1 dose start or change with a dashed line.
- Weekly check-in (Mon–Sun) summarizes workouts, meals, protein, water, calories, weight change and injections, with a day-by-day table and a short reflection (mood, wins, one adjustment). It also shows streaks (logging, protein, water, calorie range, workout weeks, on-time injections) and milestone badges, which pop up as you earn them.
- Appearance can follow your device or be fixed to light or dark in Settings. On phones, navigation is a bottom tab bar; Weekly check-in, My progress, Grocery list, Settings and Sync live under **More**.
- Sync across devices: turning it on creates a private 20-character code; enter it on other devices. Data is encrypted in the browser (AES-GCM with a key derived from the code) before upload to Netlify Blobs, so the server stores only ciphertext. Sync runs when the app opens, when you return to it, and shortly after each change. If two devices change data at the same time, entries are combined and the device uploading its pending edits wins for the same field; something deleted on one device while another was offline may reappear. Losing the code means the synced copy can't be recovered, so keep it somewhere safe; each device keeps its own local copy.
- Change an exercise using its dropdown: the replacement loads its own usual weight and sets/rep range immediately, using its earlier logs for progressive overload. Swaps apply to the selected day and persist. Edit usual weight & sets/reps saves defaults for that exercise; previous logged weights take precedence over starting weights. Add new exercise saves a named exercise with your usual weight, 1–6 sets, and rep range, selects it for today, and makes it available in future workout dropdowns and progress charts. Original exercise logs are retained separately. The built-in starting weights are sample estimates, not personalized measurements.

The workout routine is an editable-in-source sample. Meals are transcribed from the uploaded Whimsy Goth Recomp Tracker: days 1–25, three meals plus two snacks. Days 26–30 are missing from the PDF and remain available for manual planning. LifeFocus completes the truncated D4 sausage bowl with spinach and supplies a D7 salmon-wrap recipe, both labeled with estimated macros. Their measured ingredients are included in grocery totals. Cooking steps are added by LifeFocus; ingredient quantities and macro estimates come from the PDF. Data is stored in browser localStorage; optional sync stores an encrypted copy on Netlify. There is no account. Clearing browser data removes your logs. Export backups from Settings. Nutrition estimates are approximate; the source nutrition targets are displayed as reference, not individualized recommendations. Workout structure and the built-in recipe collection are currently defined in source.

## Grocery update: October 9–15, 2026

This dated pescatarian plan uses the supplied Aldi groceries and existing eggs, tuna, apples, mandarins and protein powder. It uses sweet potatoes from the receipt, three 4 oz salmon servings, three 4 oz shrimp servings and two 4 oz ahi servings. Household meats and whole milk are excluded. Recipes include measured ingredients and cooking steps; checked-off meals contribute their estimated protein. Optional add-ons are excluded from base calorie/protein estimates and shopping quantities. The listed base portions often fall short of the requested 1,750–1,850 kcal / 120–130 g protein targets; the app displays estimated totals instead of presenting those targets as achieved.

The update applies once per browser/synced state to upcoming dates in this week. Already eaten meals and historical dates are preserved; future edits remain editable. Other dates keep their existing plans.

## At-home update: November 3–9, 2026

Adds a dated week using bagels, capers, garden veggie cream cheese, Beyond burger and ground meat, eggs, plain and vanilla Greek yogurt, vegan wings, Omni vegan spam, shrimp, salmon, Impossible breakfast sausage, oatmeal, Cheerios, almond milk, apples, sweet potatoes, salad greens and bell peppers. Recipes contain measured portions, cooking instructions and typical-label nutrition estimates. Dairy milk can replace almond milk using its own label. No stock quantities were provided, so weekly totals are requirements to check against supplies rather than a claim that supplies cover the week.

The new version applies once to upcoming dates, preserving past days, checked-off meals, previous recipe IDs and subsequent edits. Existing calorie goals remain unchanged; estimated portions are adjustable. The older October plan remains available with its original note.

## 30-day guide update: November 5–December 4, 2026

The supplied 30-day PDF now drives 150 personal meals/snacks and 30 separate Khris dinners. Recipe portions, cooking steps and per-meal calorie/protein estimates are transcribed into `public/recomp-meal-plan.js`. Raw sweet-potato weights are assumed for purchasing; rice is cooked and spaghetti is dry. Oikos remains in the PDF's cup unit, with a label/container-size reminder. Source targets are references: several scheduled days exceed the stated 1,750–1,900 kcal and 110–125 g protein ranges. Existing app nutrition goals are preserved.

The update applies once to today and later dates, preserving historical plans and eaten slots. Earlier recipes and at-home alternatives remain selectable; household dinners are excluded from the personal recipe selector, meal checkmarks and nutrition totals.

Grocery list offers the PDF's five shopping periods (including November 26–December 2 across the month boundary), a full 30-day master list, and the original calendar-week view. An optional, persistent “Include Khris’s dinners” control adds one separate dinner serving per date. Totals reflect personal meal edits. Pantry/refill labels are reminders based on reported supplies, not verified inventory. Checkmarks and resets are scoped to the selected date range and household option. Protein powder and PBfit are counted as recipe servings rather than weekly container purchases. Buy perishables weekly; the master list is a planning reference.

## Personalized workout and meal options: November 7, 2026

- The original weekly workout assignments are preserved. Tuesday already has a Smith hip thrust in **Glutes + quads**; Sunday also includes hip thrusts in its optional, longer full-body session. Friday remains the glute/hamstring session. You can swap days in the app as before.
- Tuesday, Wednesday and Friday workouts include a **~35-minute 5:30 AM weekday option** with main-lift priorities, without deleting the full exercises. Strength pages now display the session timing above the exercise list.
- **Dumbbell weights are logged per hand.** A 10 lb Romanian deadlift entry means one 10 lb dumbbell in each hand (20 lb combined), consistent with the November 7 set log. Progression suggestions likewise refer to each dumbbell. Machine and Smith weights continue to use their displayed equipment values.
- Weekday strength cool-down suggestions focus on comfortable static stretching and slow breathing rather than adding a treadmill cool-down; keep the program-provided running cool-down on C25K days.
- Four **optional, selectable** recipe swaps are available in **Meals → Edit daily meals**: LF_MILK_GRANOLA (granola + whole milk), LF_CLEAR_WHEY (ALDI watermelon clear whey), LF_SMALL_YOGURT (small yogurt + fruit), and LF_SHRIMP_RICE_MINI (small shrimp + rice). Their calories and protein are estimates based on portions and typical labels, not exact measured meals. They are convenient for smaller appetites and gym mornings, but no single swap replaces a complete day's nutrition.
- **No changes were made to the 30-day PDF meal slots, Khris's dinner assignments, already logged exercises, or personal meal checkmarks.** Existing app goals also remain untouched. New recipe IDs are available to select without rerunning the dated migration.

## Actual daily nutrition from ChatGPT (paste import)

- Your planned meal recipes and meal checkmarks are separate from your **actual nutrition totals**. To log food that differs from the plan, go to **Overview** or the selected day under **Meals**, open **Calories & macros**, and tap **Paste ChatGPT totals**. No planned recipe is changed.
- After your evening food recap, copy one plain-text summary from ChatGPT in this exact order: `YYYY-MM-DD | calories | protein | carbs | fat | fiber (optional) | sugar (optional)`. Example (illustrative only): `2026-11-08 | 1750 | 115 | 185 | 60 | 22`. You may include `kcal` or `g` labels, or use commas as separators (not within thousands).
- Paste the summary into the import dialog and choose whether it includes **all food, drinks and snacks**. An unchecked box marks the day as **partial**, so an incomplete log isn't misinterpreted as inadequate intake. You can replace an earlier day's totals after confirming.
- Saved numbers use the app's existing `state.daily[date].totals` fields and populate the calories and macro charts. The user controls their data in the browser and optionally encrypted LifeFocus sync; **GitHub repository edits do not write personal nutrition data to an account**. This is a one-paste transfer and **not an automatic integration** with ChatGPT's Calorie Tracker. Do not publish personal food or health logs in the repository.
- Your existing nightly Nudges email can remind you to recap missing meals. After confirming the day's total with ChatGPT, paste the resulting one-line summary into LifeFocus. You can still enter actual calories and macros manually using **Log end-of-day totals**.
