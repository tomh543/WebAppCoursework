Instructions for Website use

install all neccessary nodes etc - npm install
 command to run - node index.js
 website will run at localhost localhost:3000

 The website is hosted here:

 When going to the website you should land on an About page, with links to Menu and Contact.
 About us page shows the restaurant philosophy, story and vision for the restaurant
 Contact Page shows how to get in touch, the address of the restaurant and also the opening hours

 On menu page there are 3 links: Lunch Menu, Dinner Menu and Chef Specials. These open the respective menu that will be filtered to only show the menu requested

 At the top of the pages is a navigation bar to navigate between pages.

 On the Menu page, is a register button and Login Button.
 If no user has been created, click register and put in username and password, once registered user will automatically be sent to the login screen.
User enters login info and is then forwarded to a new Menu page. This is a functional page, for staff to view, add new menu items, delete new items, or update items.
However although Delete and Update are available they will take user to form pages, but when they click submit will get an error.
This is due to an error with the code, i could not resolve.
In the terminal it was noted it called the correct constructor and began db operations but just seemed to hang.

A template was created for each page one of these was header 1 which included the restaurant name, and the navigation bar.
Header 2 was implemented for any form pages, to try and keep the background from the css.
Header 3 was implemented for the user forms (registration and Login)

A menu.css file was created to work in tandem with the stylesheet "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css".
This was to give more flexibility with likes of background image and making the design similar to the design document.