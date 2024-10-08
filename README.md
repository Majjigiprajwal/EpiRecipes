# EpiRecipes Search Platform

This project is a full-stack recipe search application that utilizes Flask for the backend and React for the frontend, along with OpenSearch for indexing and retrieving recipes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Demo](#demo)


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

3. ## Setting Up OpenSearch Locally

Follow these steps to set up OpenSearch locally without security enabled for development:

 **Download OpenSearch:**
   - Download the latest OpenSearch bundle from [here](https://opensearch.org/docs/latest/install-and-manage/install-opensearch/).
   - Extract the downloaded files:
     - For Windows, extract the archive using WinRAR or 7-Zip and navigate to the extracted folder.

2. **Edit Configuration:**
   - Navigate to the `config` folder and edit `opensearch.yml`:
     ```bash
     cd config
     ```
   - Add the following settings to `opensearch.yml`:
     ```yaml
     # Path: config/opensearch.yml

     network.host: 0.0.0.0
     http.port: 9200
     plugins.security.disabled: true
     ```

3. **Start OpenSearch:**
   - Navigate back to the `bin` folder and start OpenSearch:
     - **For Linux/macOS:**
       ```bash
       cd ..
       cd bin
       ./opensearch
       ```
     - **For Windows:**
       - Open a Command Prompt, navigate to the `bin` folder, and run:
         ```bash
         opensearch.bat
         ```

4. **Verify OpenSearch:**
   - Open `http://localhost:9200` in your browser or run:
     ```bash
     curl -X GET "http://localhost:9200"
     ```
   - If successful, OpenSearch is now running locally without security enabled.


4. **Load Recipe Data:**
   - Run the script to ingest recipe data into OpenSearch:
     ```bash
     python -m utils.ingest_data
     ```

5. **Run the Backend:**
   - Ensure you are in the backend directory and the virtual environment is activated.
   - Makesure you have ingest the data before starting the server.
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

### 1. **Search Recipes**
- **Endpoint:** `/search`
- **Method:** `GET`
- **Description:** This endpoint allows users to search for recipes based on a keyword. It returns a paginated list of recipes that match the search term.
- **Parameters:**
  - `recipe` (string, required): The search keyword used to find recipes. This parameter will be used to query the recipe database for matches.
  - `page` (integer, optional, default: 1): The page number for paginated results. This allows users to navigate through multiple pages of search results.
  - `limit` (integer, optional, default: 15): The maximum number of recipes to return per page. This controls the size of the returned dataset, enhancing performance and usability.
  
- **Response:**
  - A JSON object containing the list of recipes that match the search keyword, along with pagination details (current page, total pages, etc.).
  - Example:
    ```json
    {
      "total_pages": 10,
      "recipes": [
        {
          "id": "1",
          "title": "Spaghetti Carbonara",
          "description": "A classic Italian pasta dish.",
          "ingredients": ["spaghetti", "eggs", "cheese", "pepper"],
          "nutrition": {
             "calories": 600,
             "protein": "20g",
             "fat": "15g",
             "carbs": "70g"
          },
        }
      ]
    }
    ```

---

### 2. **Filter Recipes**
- **Endpoint:** `/search/filter`
- **Method:** `GET`
- **Description:** This endpoint retrieves recipes based on a search keyword and specific filtering criteria. Users can apply multiple filters to refine their search results.
- **Parameters:**
  - `recipe` (string, required): The keyword for searching recipes.
  - `page` (integer, optional, default: 1): The page number for paginated results.
  - `limit` (integer, optional, default: 10): The maximum number of recipes to return per page.
  - `filters` (string, required): A JSON string containing filter criteria. Filters can include categories, dietary restrictions (e.g., vegan, gluten-free), calorie range, etc.

- **Response:**
  - A JSON object with a list of filtered recipes matching the search and filter criteria.
  - Example:
    ```json
    {
      "total_pages": 5,
      "filtered_recipes": [
        {
          "id": "2",
          "title": "Vegan Tacos",
          "description": "Delicious tacos made with plant-based ingredients.",
          "ingredients": ["tortillas", "beans", "avocado", "salsa"],
          "nutrition": {
             "calories": 600,
             "protein": "20g",
             "fat": "15g",
             "carbs": "70g"
         },
        }
      ]
    }
    ```

---

### 3. **Get Recipe Details**
- **Endpoint:** `/search/recipe/<recipe_id>`
- **Method:** `GET`
- **Description:** This endpoint retrieves detailed information about a specific recipe identified by its unique ID. It provides comprehensive data, including ingredients, instructions, and nutritional information.
- **Parameters:**
  - `recipe_id` (string, required): The unique identifier of the recipe for which details are requested.

- **Response:**
  - A JSON object containing detailed information about the requested recipe.
  - Example:
    ```json
    {
      "id": "1",
      "title": "Spaghetti Carbonara",
      "description": "A classic Italian pasta dish.",
      "ingredients": [
        {"name": "spaghetti", "amount": "200g"},
        {"name": "eggs", "amount": "3"},
        {"name": "cheese", "amount": "100g"},
        {"name": "pepper", "amount": "to taste"}
      ],
      "instructions": "Cook spaghetti. Mix eggs and cheese. Combine all ingredients.",
      "nutrition": {
        "calories": 600,
        "protein": "20g",
        "fat": "15g",
        "carbs": "70g"
      },
    }
    ```

---

### 4. **Search Suggestions**
- **Endpoint:** `/suggestions`
- **Method:** `GET`
- **Description:** This endpoint provides a list of suggested recipe names or ingredients based on a partial keyword entered by the user. It helps users discover recipes as they type.
- **Parameters:**
  - `query` (string, required): The partial keyword for which suggestions are requested. This should be a string representing the start of a recipe name or ingredient.

- **Response:**
  - A JSON array containing suggested recipes or ingredients that match the partial keyword.
  - Example:
    ```json
    {
      "suggestions": [
        "Rice Pudding",
        "Rice Salad",
        "Chicken Fried Rice",
        "Rice Noodles"
      ]
    }
    ```


## Demo

[Watch the demo video](https://youtu.be/NcnYOAwrSEg)

