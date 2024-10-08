# EpiRecipes Search Platform

This project is a full-stack recipe search application that utilizes Flask for the backend and React for the frontend, along with OpenSearch for indexing and retrieving recipes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for recipes by title or ingredients.
- Filter recipes based on categories, dietary restrictions, ratings, and nutritional values.
- Pagination for recipe results.

## Technologies

- **Frontend:** React, TailwindCSS, Lucide React, React-Router-Dom
- **Backend:** Flask
- **Database:** OpenSearch
- **Other:** Axios for API requests, useDebounce for debouncing search input

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Majjigiprajwal/EpiRecipes.git
   cd EpiRecipes
   ```

2. **Set Up Backend:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - For Windows:
       ```bash
       .\venv\Scripts\activate
       ```
     - For macOS/Linux:
       ```bash
       source venv/bin/activate
       ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Set Up OpenSearch:**
   - Follow [OpenSearch installation instructions](https://opensearch.org/docs/latest/install-and-manage/install-opensearch/) to install OpenSearch locally.
   - Ensure OpenSearch is running without security enabled for development purposes.

4. **Load Recipe Data:**
   - Run the script to ingest recipe data into OpenSearch:
     ```bash
     python -m utils.ingest_data
     ```

5. **Run the Backend:**
   - Ensure you are in the backend directory and the virtual environment is activated.
   - Start the Flask application:
     ```bash
     python app.py
     ```
   - The backend should now be running at `http://127.0.0.1:5000`.

6. **Set Up Frontend:**
   - Open a new terminal and navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```

7. **Run the Frontend:**
   - Start the React application:
     ```bash
     npm run dev
     ```
   - The frontend should now be accessible at `http://localhost:5173`.

## Running the Application

Once both the backend and frontend are running, you can access the application in your web browser at `http://localhost:5173`.

## API Endpoints

- **Search Recipes**
  - **Endpoint:** `/search`
  - **Method:** `GET`
  - **Parameters:** 
    - `recipe`: Search keyword
    - `page`: Page number (default: 1)
    - `limit`: Number of recipes per page (default: 15)

- **Filter Recipes**
  - **Endpoint:** `/search/filter`
  - **Method:** `GET`
  - **Parameters:**
    - `recipe`: Search keyword
    - `page`: Page number (default: 1)
    - `limit`: Number of recipes per page (default: 10)
    - `filters`: JSON string of filter criteria

- **Get Recipe Details**
  - **Endpoint:** `/search/recipe/<recipe_id>`
  - **Method:** `GET`
  - **Parameters:** 
    - `recipe_id`: ID of the recipe to retrieve details for

- **Search Suggestions**
  - **Endpoint:** `/suggestions`
  - **Method:** `GET`
  - **Parameters:** 
    - `query`: The partial keyword to get suggestions for (required).
    -`Description`: Returns a list of suggested recipe names or ingredients based on the provided partial keyword.
