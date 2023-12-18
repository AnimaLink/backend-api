<p align="center">
    <img src="https://github.com/AnimaLink/Machine-Learning-app/assets/91884661/71e483f7-e112-4151-9f30-97c96faac61c"  width="200" height="200">
</p>

# Cloud Computing Path

Table of Contents
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#endpoint-api">Endpoint API</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#cloud-architecture">Cloud Architecture</a></li>
        <li><a href="#entity-relationship-diagram">Entity Relationship Diagram</a></li>
        <li><a href="#api-docs">API Docs</a></li>
        <li><a href="#cc-members">CC Members</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Try This Project</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>

## About The Project
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ante vitae dui dictum luctus eu sagittis lorem. Duis mattis nibh sit amet pharetra facilisis. Suspendisse gravida euismod odio vel congue. Nulla eget pharetra urna. Integer ultricies lectus enim, in euismod arcu ornare non. Aenean mattis accumsan sem, vel commodo dui rhoncus non. Mauris bibendum nec odio vitae consequat. Quisque elit ipsum, imperdiet sed ipsum ut, accumsan tincidunt dui. Nam nec eros mattis, luctus mauris ut, finibus massa.

## Endpoint API
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<table width="100%">
    <tr>
        <th>Method</th>
        <th>Routes</th>
        <th>Description</th>
    </tr>
    <tr>
        <td colspan="3"><b>Auth</b></td>
    </tr>
     <tr>
        <td>POST</td>
        <td>/auth/login</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>POST</td>
        <td>/auth/register</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td colspan="3"><b>Forums</b></td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/forums</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>PUT</td>
        <td>/forums/{id}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/forums/{id}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/forums/{id}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/forums</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>GET</td>
        <td>/forums/histories/{userId}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td colspan="3"><b>Forums-aditionals</b></td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/forums/statuses</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
     <tr>
        <td>GET</td>
        <td>/forums/statuses</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/forums/statuses/{id}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/forums/statuses/{id}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
    </tr>
    
</table>

## Built With
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

- Node.js (express)
- Sequelize
- Axios
- Joi
- MySQL

## Cloud Architecture
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Entity Relationship Diagram 
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Api Docs 
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## CC Members 
|Class|Bangkit ID|Name|
|-----|----------|----|
|CC-38|12345678|Arif D. Nugroho|
|CC-27|12345678|Rizki Yudha P|

## Try This Project
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Prerequisites
Make sure you have the following software installed on your system:
- Node.js
- MySQL

### Installation
1. Clone the repo
   
   ```sh
    git clone https://github.com/AnimaLink/backend-api.git
   ```
2. Move to `./backend-api` directory

   ```sh
    cd ./backend-api
   ```
   
3. Install packages using NPM

   ```sh
    npm install 
   ```

4. Copy `.env.example` to `.env` and fill needed credentials

5. Create database and run migrations to create all tables

   ```sh
    npm run migrate 
   ```

5. Run backend application

   ```sh
    npm run dev 
   ```
