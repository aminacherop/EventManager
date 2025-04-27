# Event Manager

**Event Manager** is a web-based application built  with react and powered by json server that allows the user to create manage and track events and their guest lists .whether its a bussinedss meeting  a  party   or  a community gathering this app helps organizers efficiently plan events ,track all attendees and maintain organized records  all in a user-friendly interface with full CRUD functionality.

---

## Features

- View a list of all events
- Create new events
- Edit existing events
- Delete events
- View detailed event information
- Add and manage guests for each event
- Filter events by name or date
- Responsive and user-friendly interface

---

##  Technologies Used

- **React** (Frontend Framework)
- **JSON Server** (Mock Backend)
- **HTML5** & **CSS3**
- **JavaScript (ES6)**

---

## Project Structure

```
src/
 ├── components/
 │    ├── ManageEvent.js
 |    ├── ManageEvent.css
 │    ├── ManageGuest.js
 |    ├── ManageGuest.css
 │    └── Navbar.js
 |    ├── Navbar.css
 ├── pages/
 │    ├── About.js
 |    ├── About.css
 │    ├── AddEvent.js
 |    ├── AddEvent.css
 |    ├── Home.js
 |    ├── Home.css
 ├── App.js
 ├── index.js
 ├── styles/
 │    └── App.css
 └── db.json (for JSON Server)
```

---

## Getting Started

Follow these instructions to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/aminacherop/event-manager.git
cd event-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up JSON Server

Install **JSON Server** globally if you haven't already:

```bash
npm install -g json-server
```

Run JSON Server with your `db.json`:

```bash
json-server --watch db.json --port 4000
```

This will start the server at:

```
http://localhost:5000/events
```

### 4. Run the React App

In a new terminal, start the React application:

```bash
npm start
```

The React app will run on:

```
http://localhost:3000
```

---

## ⚙ Deployment Steps

To deploy the **Event Manager** project:

1. **Build the React app** for production:

    ```bash
    npm run build
    ```

2. **Choose a hosting platform**, for example:
   - [Netlify](https://www.netlify.com/)
   - [Vercel](https://vercel.com/)
   - [GitHub Pages](https://pages.github.com/)
   - [Render](https://render.com/)

3. **Deploy the `build/` folder** using your hosting service's instructions.

4. For backend hosting (JSON Server), you can:
   - Use [Render](https://render.com/) to deploy a JSON Server instance.
   - Or replace it with a real backend later (Node.js, Django, etc.) for production.

---

## Example JSON Data (db.json)

```json
{
  "events": [
    {
      "id": "1",
      "title": "Annual Tech Conference",
      "date": "2025-05-10",
      "time": "20:49",
      "location": "Tech City Convention Center",
      "description": "A conference about the latest in technology, innovation, and digital trends.",
      "imageUrl": "https://images.stockcake.com/public/b/1/e/b1ec5c40-195a-44a3-b90f-1dd0b8e8a55b_large/tech-conference-scene-stockcake.jpg",
      "guests": []
    }
  ]
}
```

---

## Future Improvements

- Authentication system (admin login for event creation)
- Pagination and search optimization
- Real database integration (MongoDB, PostgreSQL)
- Email notifications to guests
- Better event categorization and tagging

---


## Contributing

Pull requests are welcome!  
If you have suggestions for improvements, feel free to open an issue or create a pull request.

---

##  License

This project is licensed under the MIT License.  
Feel free to use and modify it for your own projects!

---
