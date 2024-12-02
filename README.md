# Introduction
The `Snap-to-grid`  empowers users to build dynamic and visually appealing layouts by utilizing pre-configured components such as progress bars, timers, buttons, and more. This functionality provides pixel-perfect placement and alignment of elements, ensuring professional-quality designs with minimal effort. The app is optimized for mobile-friendly touch interactions, allowing seamless drag-and-drop actions on any device, and includes live previews to give users real-time feedback while designing.

Additionally, the app supports a role-based experience:

Admin Users: After logging in through the home page, administrators are directed to the drag-and-drop editor. Here, they can create, manage, and customize quizzes using the intuitive interface.
Non-Admin Users: Non-admin users can log in and are redirected to take the quizzes. They experience a streamlined interface designed for engaging with the content created by admins.
This ensures a tailored user journey for each role while maintaining a consistent and efficient workflow for quiz creation and participation.
This app is built with Remix JS for its server-side rendering capabilities, scalability, and optimized routing structure.

# Features
Responsive design: Works seamlessly on desktop and mobile devices.
Server-side rendering: Ensures fast load times and better SEO.
Dynamic drag-and-drop: Includes live previews while dragging components.
Reusable components: Easily extendable with new draggable items.
Cross-device compatibility: Supports both touch and mouse interactions using react-dnd-multi-backend.
Tech Stack
Framework: Remix JS
Frontend: React with TypeScript
Drag-and-Drop Library: react-dnd and react-dnd-multi-backend
Styling: TailwindCSS
Icons: React Icons (react-icons)
Thought Process and Approach
### 1. Choosing Remix JS
Remix was chosen for its server-side rendering, enabling better performance and SEO.
The nested routes feature of Remix allowed us to structure the application efficiently, especially for the admin view and drag-and-drop features.
### 2. Drag-and-Drop Support
We used react-dnd for drag-and-drop functionality and react-dnd-multi-backend to support both HTML5 (desktop) and touch backends (mobile).
Real-time previews during dragging were implemented to enhance the user experience.
### 3. Component-Based Design
Each draggable item is a reusable React component, making it easy to extend the library of items.
Components are dynamically rendered within the FlexContainer, which acts as the drop target.
### 4. Responsive Design
The navigation drawer is collapsible on mobile devices and remains fixed on larger screens.
Drawer toggle behavior was implemented to ensure an optimized workspace on smaller devices.
### 5. Scalability
The system is designed to allow seamless integration of new features and components by following a clear, modular architecture.
### 6. Extending the System for Other Content Types
This drag-and-drop admin panel is highly modular, making it suitable for building additional content types such as forms or lessons. The following strategies can be used to extend the system:

#### Forms Approach:

New Components: Add form-specific draggable components such as text inputs, checkboxes, dropdowns, and file upload fields.
Example: Create TextInput, Checkbox, and FileUpload components within the Elements folder.
Validation Configuration: Introduce settings for validation rules (e.g., required fields, max length) in the component properties.
Form Container: Create a drop zone container that collects and organizes form elements into a cohesive structure.
Data Submission: Integrate form data handling by sending collected input values to the backend for processing.
Implementation:

Each form element can emit its data schema and validation rules to a parent container (like FlexContainer), allowing users to build fully-functional forms visually.
#### Lessons Approach:

Rich Media Components: Add support for multimedia elements like videos, audio files, and embedded links.
Example: Create a VideoPlayer component that accepts a URL or file input and renders a responsive media player.
Text and Formatting Tools: Introduce text blocks with rich text editing capabilities for creating instructional content.
Sequential Flow: Implement a system to define the sequence of lesson components, enabling structured progression.
Preview and Publish: Extend the panel to support "Preview" and "Publish" modes for lessons to simulate the final user experience.
Implementation:

Lessons can be structured as collections of draggable components, similar to quizzes, with additional metadata (e.g., lesson title, description, prerequisites) configurable through a settings modal.
By utilizing the existing drag-and-drop infrastructure, forms and lessons can seamlessly integrate into the system. Both extensions would leverage Remix's server-side capabilities to handle data storage and rendering dynamically based on user inputs. This approach ensures that the system remains flexible, scalable, and easy to maintain for various use cases.


## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```
# Mock Credentials for login
1. User
     - Username -> user , Password -> user123
2. Admin
     - Username -> admin , Password -> admin123 
   

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
