# fullstackdemo

Technologies Used
Backend Development:
⦁	Java
⦁	Spring Boot
Frontend Development:
⦁	React.js
Database:
⦁	Mysql

Data Visualization:

⦁	D3.js
Data Preparation
The first step involved obtaining the data from the provided Data.csv file. This dataset contained information related to intensity, likelihood, relevance, year, country, topics, region, and city. The data was imported into a mysql database, ensuring structured storage and efficient retrieval.
Backend Development
Java, along with the Spring Boot framework, was chosen for the backend development. Spring Boot facilitated the creation of RESTful APIs that served as endpoints for retrieving data from the mysql database. These APIs were designed to handle various filter parameters and respond with relevant dataset subsets.
Frontend Development
React.js was employed for frontend development, allowing for the creation of interactive components and a responsive user interface. The frontend communicated with the backend APIs to fetch data based on user interactions and filter selections. Components were organized to represent different charts, graphs, and filter controls.
⦁	Detail your choice between React.js or Angular.js for the frontend.
⦁	Describe the project structure and the organization of components.
Data Visualization
D3.js was used to create customized and interactive visualizations. The visualizations focused on showcasing intensity, likelihood, relevance, and other key variables in a clear and visually engaging manner.
Dashboard Design
The dashboard was designed aiming for a clean and intuitive layout. The layout featured sections for different charts, graphs, and filters, promoting ease of viewing and exploration.
Filter Implementation
A comprehensive set of filters were implemented, including end year, topics, sector, region, PEST (Political, Economic, Social, Technological analysis), source, SWOT (Strengths, Weaknesses, Opportunities, Threats analysis), country, city, and other relevant controls. These filters allowed users to dynamically adjust data visualizations based on their preferences.

Screenshots


 
Bar Chart variations:
⦁	X-Axis – Start Year, End Year
⦁	Y-Axis – Intensity, Relevance, likelihood
 
Tree Map Chart with variation – Intensity, Relevance and Likelihood with tooltip on hover.
 
QQPlot Chart with variation – Intensity, Relevance and Likelihood
 
Filtering data based on nine different fields and displaying the filtered result in table format.
 
Implemented Pagination for easy navigation in Material UI.
Connecting Frontend and Backend:
List of API calls:
http://localhost:8080/getData/  - To get the entire data from the database as json object.(Get Method)
http://localhost:8080/getData/search -  To filter data with JSON format input and output.(Post Method)
Input in JSON format:
{
"pageNumber": 1,
        "pageSize": 10,
        "filterData": {
            "endYear": "",
            "topic": "",
            "sector": "",
            "region": "",
            "pestle": "",
            "source": "",
            "country": "",
            "city": ""
        }
}

Response with Pagination
{
    "count": 1000,
    "data": [
        {
            "id": 1,
            "endYear": 2018,
            "citylng": "",
            "citylat": "",
            "intensity": 12,
            "sector": "Information Technology",
            "topic": "artificial intelligence",
