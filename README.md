# Task Manager Application

A full-stack task management application built with React and Node.js that allows users to create, read, update, delete, and mark tasks as complete.

## Features

- ✅ User authentication (Login page)
- ✅ Create new tasks with title and description
- ✅ View all tasks in a clean, organized list
- ✅ Edit existing tasks
- ✅ Mark tasks as completed (with visual strikethrough)
- ✅ Delete tasks
- ✅ Persistent data storage (file-based)
- ✅ Responsive navigation bar
- ✅ Modern, clean UI design

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS variables for theming

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System (fs)** - Data persistence

## Project Structure

```
task-manager/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Component styles
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Backend Node.js application
│   ├── index.js          # Express server
│   ├── tasks.json        # Data storage file
│   └── package.json
└── README.md
```

## How to Run the Application Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation & Setup

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd task-manager
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

You need to run both the server and client simultaneously.

#### Terminal 1 - Start the Backend Server
```bash
cd server
node index.js
```
The server will start on `http://localhost:5000`

#### Terminal 2 - Start the Frontend Client
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173` (or another port if 5173 is busy)

### Using the Application

1. Open your browser and navigate to `http://localhost:5173`
2. You'll be redirected to the Login page
3. Enter any username and password to access the app (mock authentication)
4. Click "Create Task" to add a new task
5. Fill in the task title and description, then submit
6. View your tasks on the Home page
7. Use the action buttons to:
   - **Mark as Completed** - Adds strikethrough and grey styling
   - **Edit** - Opens the task form with pre-filled data
   - **Delete** - Removes the task

## Design Decisions & Trade-offs

### 1. **File-Based Persistence vs Database**
**Decision:** Used a JSON file (`tasks.json`) for data storage instead of a database.

**Rationale:**
- Simpler setup with no external dependencies
- Sufficient for a small-scale application
- Easy to inspect and debug data
- No need for database installation or configuration

**Trade-off:** Not suitable for production or concurrent users, but perfect for a demo/portfolio project.

### 2. **Separate Task Form Page vs Inline Editing**
**Decision:** Created a dedicated `/add-task` and `/edit-task/:id` page instead of inline editing.

**Rationale:**
- Cleaner user experience with focused forms
- Easier to manage form state
- Better mobile experience
- Follows common UX patterns

**Trade-off:** Requires navigation, but provides better separation of concerns.

### 3. **Mock Authentication**
**Decision:** Implemented a simple mock login without real authentication.

**Rationale:**
- Focus on task management features
- Avoids complexity of JWT/sessions for a demo
- Demonstrates routing and protected routes concept

**Trade-off:** Not secure for production, but sufficient for demonstration purposes.

### 4. **CSS Variables for Theming**
**Decision:** Used CSS custom properties for colors and spacing.

**Rationale:**
- Easy to maintain and update design system
- Consistent styling across components
- Prepared for future dark mode implementation
- No build-time CSS processing needed

### 5. **Synchronous File I/O**
**Decision:** Used `fs.readFileSync` and `fs.writeFileSync` instead of async versions.

**Rationale:**
- Simpler code for a small application
- Ensures data consistency
- Acceptable performance for small data files

**Trade-off:** Could block the event loop with large files, but not an issue for this scale.

### 6. **Component Structure**
**Decision:** Separated components into `components/` and `pages/` directories.

**Rationale:**
- Clear separation between reusable components and route-level pages
- Easier to navigate and maintain
- Follows React best practices

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Screenshots

<img width="1918" height="1013" alt="image" src="https://github.com/user-attachments/assets/acb41c9a-8c64-4ef2-9bd1-4a2f0decc149" />
<img width="1917" height="1042" alt="image" src="https://github.com/user-attachments/assets/436432b3-c2a9-4e3e-a585-0dbd667265ce" />
<img width="1918" height="1046" alt="image" src="https://github.com/user-attachments/assets/6417c20a-ba90-4226-ba40-aae62703e781" />
<img width="1917" height="982" alt="image" src="https://github.com/user-attachments/assets/2b700710-5d46-440c-acbc-5269359aa943" />
<img width="1917" height="1011" alt="image" src="https://github.com/user-attachments/assets/022f78a4-a116-4ba3-b846-a1b479f30788" />
<img width="1918" height="1013" alt="image" src="https://github.com/user-attachments/assets/7f0f5418-3fb6-41c5-9470-aba5bc8132f6" />
<img width="1913" height="1035" alt="image" src="https://github.com/user-attachments/assets/baba39f4-1e3f-45a0-9f94-0210652b9a8d" />
<img width="1914" height="1018" alt="image" src="https://github.com/user-attachments/assets/ef66c4d9-25ff-459d-a5c1-8792f041c4d2" />




## Future Enhancements

- User authentication with JWT
- Database integration (MongoDB/PostgreSQL)
- Task categories and tags
- Due dates and reminders
- Search and filter functionality
- Dark mode toggle
- Task priority levels
- Drag-and-drop task reordering

## Known Issues

- Server must be restarted manually if it crashes
- No user session management
- No input validation on the frontend
- Limited error handling for network failures

## License

This project is open source and available for educational purposes.

## Author

Created as a full-stack task management demonstration project.
