# TFT Data Analytics

**TFT Data Analytics** is an advanced analytical tool designed to harness the power of statistical analysis in Teamfight Tactics. This project uses the Riot Games API to gather comprehensive data on matches and champion statistics. TFT Data Analytics applies statistical methods and data visualization techniques (charts) to provide in-depth performance analysis and trend identification.

## Background

My name is Mathis, a final-year engineering student in France and an apprentice developer. With over ten years of experience as a League of Legends player, I aim to enhance my technical skills by combining them with my passion for video games. This project is purely personal and currently serves only as a practice exercise.

## Installation

1. **Clone the Repository**

   Clone the Git repository of this project:

   ```bash
   git clone <REPOSITORY-URL>
   cd <DIRECTORY-NAME>
   ```
   
   (No repository yet)

2. **Install MongoDB**

   Make sure you have MongoDB installed and running locally. You can follow the installation instructions on the [official MongoDB Website](https://www.mongodb.com/try/download/community)

3. **Install Dependencies**

   Install the necessary project dependencies:

   ```bash
   npm install
   ```
   
4. **Configure environment variables**

   Rename the file `.env.example` to `.env.local` and set up the following variables:
   - `NEXT_PUBLIC_API_TOKEN`: Your valid Riot Games API key
   - `MONGODB_URI`: Your local MongoDB URI.
   
   Example configuration in `.env.local`:
   ```.env
   NEXT_PUBLIC_API_TOKEN=your-riot-api-key
   MONGODB_URI=mongodb://localhost:27017/tft-data-analytics
   ```
5. **Challenges Faced**

   The main challenge encountered so far has been dealing with the rate limits imposed by Riot Games to prevent server overload. To overcome this constraint, I decided to store as much data as possible returned by the API in a MongoDB database.

   However, accessing MongoDB directly from the client with Next.js is not feasible. Therefore, I implemented an API route to check if the requested information (such as an account or match) is already present in the database before making a request to the Riot API.

## Usage

1. **Start the application**

   Start the development server with de following command:
   
   ```bash
   npm run dev
   ```
   
2. **Access the application**

   Open your browser and navigate to `http://localhost:3000` to use the application.
   
## Contributing


   This project is primarily intended for personal use. If you wish to contribute, feel free to submit pull requests or open issues.
   
## Contact
   For any questions or comments, you can contact me directly at mathis.ranson@icloud.com.