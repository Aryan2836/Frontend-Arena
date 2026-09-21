# Frontend Arena

Frontend Arena is a ten-mission learning website that documents my progress from semantic HTML to API-driven JavaScript interfaces. It combines a professional, minimal layout with a subtle game and sci-fi identity.

> Live demo: https://frontend-arena-lovat.vercel.app

## Features

- Home, Learning and About pages
- Ten missions in a clear learning progression
- Reusable navigation and mission layout
- Quizzes, forms, filtering and sorting exercises
- `localStorage` progress and saved articles
- Fetch API loading, success, empty and error states
- Responsive layouts and keyboard-friendly interactions

## Learning roadmap

1. HTML Foundations
2. Meaningful HTML
3. Browser to DOM
4. Responsive Layout
5. DOM Interaction
6. Forms and Data
7. Arrays to Tables
8. Search, Sort and Storage
9. Live API Data
10. Developer Article Hub

## Tech stack

- Semantic HTML5
- CSS variables, Flexbox, Grid and media queries
- Vanilla JavaScript
- Browser `localStorage`
- Fetch API

No framework, package manager or build tool is required.

## Project structure

```text
frontend-arena/
|-- index.html
|-- learning.html
|-- about.html
|-- missions/
|   `-- mission-1.html ... mission-10.html
|-- css/
|   |-- style.css
|   `-- mission.css
|-- js/
|   |-- data.js
|   |-- script.js
|   `-- mission-specific files
`-- PROJECT_NOTES.md
```

## Run locally

You can open `index.html` directly. For the most reliable API and path behavior, run a small local server from the project folder:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Architecture

- `data.js` contains curriculum data as one source of truth.
- `script.js` handles shared navigation, storage and learning progress.
- Shared files handle quizzes, practice data and article rendering.
- Mission files contain only the behavior needed for that lesson.

The common data flow is:

```text
user action -> validation/state -> data transformation -> DOM render -> optional storage
```

## What I learned

- How semantic HTML improves structure and accessibility
- How responsive layouts move from mobile to desktop
- How JavaScript reads forms and updates the DOM
- How arrays support rendering, filtering and sorting
- How to handle asynchronous API states clearly
- When browser storage is useful and where its limits are

## Known limitations

- Progress is stored only in the current browser.
- API missions require an internet connection and may be rate limited.
- Shared headers repeat because the project intentionally has no build step.

## Future improvements

- Add automated accessibility and interaction tests
- Add optional progress export/import
- Convert shared page sections into components after learning a framework

## Documentation

- [Project and interview notes](PROJECT_NOTES.md)
- [Development log](LOG.md)
- [Deployment guide](DEPLOYMENT.md)
- [Change history](CHANGELOG.md)

## License

This project is available under the [MIT License](LICENSE).
