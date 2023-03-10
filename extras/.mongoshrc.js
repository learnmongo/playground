console.clear();

const prompt = () => {
  return `š¾ ${db.getName()} > `
}

// load helpers
load('./helpers/date.js');
load('./generators/recipes/fake-recipes.js');

const getCookbookCount = () => {
  use('cookbook');
  return db.recipes.countDocuments();
}

const populateCookbook = () => {
  use('cookbook');

  print('\nš Starting to populate cookbook')
  print(`There are currently ${getCookbookCount()} recipe documents ...`)

  db.recipes.insertMany(generateRecipes());

  db.recipes.updateMany(
    { ratings: { $exists: true }, rating_avg: { $exists: false } },
    [{ $set: { rating_avg: { $round: [{ $avg: "$ratings" }, 2] } } }]
  );

  print(`ā The cookbook collection now has ${getCookbookCount()} recipe documents.`)
}

const clearCookbook = () => {
  use('cookbook');
  print('šļø Clearing out the cookbook ...');
  return db.recipes.deleteMany({});
}