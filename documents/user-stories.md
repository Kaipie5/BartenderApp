Story
- Search cocktails by name
 
Description
- As an user, I want to be able to search for cocktails by their name.

Feature Tasks
- Make the search.ejs page.
- Create a form to submit search query.
- Format the search query to fit the API requirements.
- Route user to results-base page.
- Create template for accepting search query result on results page.
- Link each search result to view page on click where they can choose to save cocktail to database.

Acceptance Tests
- Ensure that search results display all pertinent information
- Ensure that data is properly inserted into constructor function
- Ensure that search query re-routes user to the same page if search-query is not available and alerts user.


Search cocktails by ingredients
 
Description
- As an user, I want to be able to search for cocktails by their ingredients.

Feature Tasks
- Create second selectable option that allows user to find cocktail by ingredients.
- Change the search function based on which option is selected.
- Route user to results-name page.
- Create template for accepting search query result on results page.
- Link each search result to view page on click where they can choose to save cocktail to database.

Acceptance Tests
- Ensure that search results display all pertinent information
- Ensure that data is properly inserted into constructor function
- Ensure that search query re-routes user to the same page if search-query is not available and alerts user.


Save cocktail to recipe book
 
Description
- As an user, I want to be able to save my favorite cocktails in a recipe book.

Feature Tasks
- Create a database in SQL format.
- Create a schema that will accept the constructed cocktail object.
- Link the database to the schema.sql file.
- Create a function that will be called on the views page that inserts the cocktail object into the database.
- Create a recipe-book page.
- Create a template that can accept data from the database.
- Render the results in database on recipe-book page.

Acceptance Tests
- Ensure that user does not add duplicates into the recipe book.
- Ensure that cocktail is added into the database.
- Ensure that cocktail is rendered on recipe-book page.
- Ensure that cocktail details are properly displayed.
- Ensure that recipe-book page looks neat and tidy.


Delete cocktail from recipe book
 
Description
- As an user, I want to be able to remove cocktails from my recipe-book.

Feature Tasks
- Create a function that will be called on the views page that deletes the cocktail object from the database.
- Re-render the recipe-book page with updated information.

Acceptance Tests
- Ensure that when the recipe-book is re-rendered, the deleted book disappears.


Add navigation bar
 
Description
- As an user, I want to be able to navigate to any page from any page.

Feature Tasks
- Create a hamburger menu that contains links to pages available.
- Modularize the navbar into a partial and include in each page.

Acceptance Tests
- Make sure any page that the user manually inputs that does not link to available page goes to an error page.