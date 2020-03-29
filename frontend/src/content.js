const content = {
  search: {
    title: "Legit or Bust?",
    submit: "GO"
  },
  about: {
    title: "About",
    description: "Cheater Beater is a full-stack web app that uses Devpost submissions and GitHub to detect hackathon submission fraud. Our goal is not to make a statement about whether fraud occurred, but to point to hackathon submissions where a closer look is warranted."
  },
  how: {
    title: "How it Works",
    firstSubtitle: "Enter a URL",
    secondSubtitle: "Analyze the Data",
    thirdSubtitle: "Make a Decision",
    firstDescription: "Enter a URL of the Devpost submission. Click \"GO\" once you're ready!",
    secondDescription: "Take a look at the report you received. We look at the user's previous Devpost submissions, along with the Devpost submissions of the people they worked with. We look through all of this code and show you where the code is the same.",
    thirdDescription: "Computers are not people! Based on the information provided by our app, take a closer look at the hackathon submission.",
  },
  challenges: {
    title: "Challenges",
    description: "From scraping to hashing, the breadth and scope of our project introduced many challenges. It was especially challenging to to efficiently compare the code of the repository while ensuring transparency and fairness in the evaluation of a project. We also found it difficult to scrape Devpost and determine what information was required and where inside the webpage it was located."
  },
  footer: {
    description: "Made with 🐍 at LA Hacks 2020"
  },
  results: {
    info: {
      barGraph: {
        fileMatches: "% of file matches",
        lineMatches: "% of line matches"
      },
      safeMessage: {
        title: "Success!",
        description: "Great job, it looks like the project passed our test! What does this mean? We tried looking through the hacker's past projects and the hacker's team members' past projects, and didn't find anything suspicious. This hacker might be a fraud... haha... unless..."
      },
      fraudMessage: {
        title: "Uh oh!",
        description: "Umm... something doesn't seem right with this project. You might want to look thoroughly through it to see if there's anything suspicious. To help you out, we've some provided information below, such as where code was plagiarized and other projects related to this one."
      }
    }
  }
};

export default content;