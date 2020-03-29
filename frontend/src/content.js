const content = {
  search: {
    title: "Legit or Bust?",
    submit: "GO"
  },
  about: {
    title: "About",
    description: "Cheater Beater is a full-stack web app that uses devpost submissions and github to detect hackathon submission fraud. Our goal is not to make a statement about whether fraud occurred, but to point to hackathon submissions where a closer look is warranted."
  },
  how: {
    title: "How it Works",
    firstSubtitle: "Enter a URL",
    secondSubtitle: "Analyze the Data",
    thirdSubtitle: "Make a Decision",
    firstDescription: "Enter a URL of the devpost submission",
    secondDescription: "Take a look at the report you received. We look at the user's previous devpost submissions, along with the devpost submissions of the people they worked with. We look through all of this code and show you where the code is the same.",
    thirdDescription: "Computers are not people! Based on the information provided by our app, take a closer look at the hackathon submission.",
  },
  challenges: {
    title: "Challenges",
    description: "From scraping to hashing, the breadth and scope of our project introduced many challenges. It was especially challenging to to efficiently compare the code of the repository while ensuring transparency and fairness in the evaluation of a project. We also found it difficult to scrape devpost and determine what information was required and where inside the webpage it was located."
  },
  footer: {
    description: "Made with 🐍 at LA Hacks 2020"
  },
  results: {
    info: {
      safeMessage: {
        title: "You passed!",
        description: "Great job, it looks like your project passed our test! What does this mean? We tried looking through your past projects and your team members' past projects, and didn't find anything suspicious. Thanks for not being a fraud... haha... unless..."
      },
      fraudMessage: {
        title: "You failed!",
        description: "Umm... something doesn't seem right with this project. You might want to look thoroughly through it to see if there's anything suspicious. To help you out, we've provided information below, such as where the code was seen and other similar projects."
      }
    }
  }
};

export default content;