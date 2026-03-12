import mongoose from "mongoose";
import bcrypt from "bcrypt";
import chalk from "chalk";
import User from "./src/models/user";
import connectDB from "./src/config/database";
import "dotenv/config";

const mockUsers = [
    {
        "firstName": "Alex",
        "lastName": "Rivera",
        "emailId": "alex@gmail.com",
        "password": "Alex@123",
        "age": 28,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["JavaScript", "React", "Node.js"]
    },
    {
        "firstName": "Samantha",
        "lastName": "Chen",
        "emailId": "samantha@gmail.com",
        "password": "Samantha@123",
        "age": 34,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Passionate frontend developer and UI/UX enthusiast.",
        "skills": ["HTML", "CSS", "Figma", "Vue"]
    },
    {
        "firstName": "Jordan",
        "lastName": "Casey",
        "emailId": "jordan@gmail.com",
        "password": "Jordan@123",
        "age": 24,
        "gender": "others",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Python", "Django", "PostgreSQL"]
    },
    {
        "firstName": "Marcus",
        "lastName": "Johnson",
        "emailId": "marcus@gmail.com",
        "password": "Marcus@123",
        "age": 42,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Senior backend engineer with a love for distributed systems.",
        "skills": ["Go", "Docker", "Kubernetes", "AWS"]
    },
    {
        "firstName": "Elena",
        "lastName": "Rostova",
        "emailId": "elena@gmail.com",
        "password": "Elena@123",
        "age": 29,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Data Analysis", "SQL", "Tableau"]
    },
    {
        "firstName": "Taylor",
        "lastName": "Brooks",
        "emailId": "taylor@gmail.com",
        "password": "Taylor@123",
        "age": 31,
        "gender": "others",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Digital artist and accessibility advocate.",
        "skills": ["Accessibility", "Illustrator", "React Native"]
    },
    {
        "firstName": "David",
        "lastName": "Kim",
        "emailId": "david@gmail.com",
        "password": "David@123",
        "age": 19,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["C++", "Algorithms", "Game Development"]
    },
    {
        "firstName": "Olivia",
        "lastName": "Martinez",
        "emailId": "olivia@gmail.com",
        "password": "Olivia@123",
        "age": 38,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Project Management", "Agile", "Scrum"]
    },
    {
        "firstName": "Liam",
        "lastName": "O'Connor",
        "emailId": "liam@gmail.com",
        "password": "Liam@123",
        "age": 26,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["PHP", "Laravel", "MySQL"]
    },
    {
        "firstName": "Zoe",
        "lastName": "Patel",
        "emailId": "zoe@gmail.com",
        "password": "Zoe@123",
        "age": 22,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Machine learning researcher focusing on NLP.",
        "skills": ["Python", "TensorFlow", "PyTorch", "NLP"]
    },
    {
        "firstName": "Virat",
        "lastName": "Kohli",
        "emailId": "virat@gmail.com",
        "password": "Virat@123",
        "age": 35,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Indian international cricketer and former captain of the India national team.",
        "skills": ["JavaScript", "React", "Node.js", "GraphQL"]
    },
    {
        "firstName": "Mahendra",
        "lastName": "Dhoni",
        "emailId": "mahendra@gmail.com",
        "password": "Mahendra@123",
        "age": 42,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Legendary wicket-keeper batsman and former Indian captain known as 'Captain Cool'.",
        "skills": ["Java", "Spring Boot", "Microservices", "PostgreSQL"]
    },
    {
        "firstName": "Rohit",
        "lastName": "Sharma",
        "emailId": "rohit@gmail.com",
        "password": "Rohit@123",
        "age": 36,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Current captain of the Indian cricket team, famous for his elegant pull shots.",
        "skills": ["Python", "Django", "Redis", "Celery"]
    },
    {
        "firstName": "Sachin",
        "lastName": "Tendulkar",
        "emailId": "sachin@gmail.com",
        "password": "Sachin@123",
        "age": 50,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "The 'God of Cricket', highest run-scorer of all time in International cricket.",
        "skills": ["C++", "System Design", "Algorithms", "Low Latency"]
    },
    {
        "firstName": "Jasprit",
        "lastName": "Bumrah",
        "emailId": "jasprit@gmail.com",
        "password": "Jasprit@123",
        "age": 30,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Premier Indian fast bowler known for his unique action and deadly yorkers.",
        "skills": ["Go", "Docker", "Kubernetes", "AWS"]
    },
    {
        "firstName": "Smriti",
        "lastName": "Mandhana",
        "emailId": "smriti@gmail.com",
        "password": "Smriti@123",
        "age": 27,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Dynamic opening batter for the Indian women's national team.",
        "skills": ["HTML", "CSS", "Vue.js", "Figma"]
    },
    {
        "firstName": "Shahrukh",
        "lastName": "Khan",
        "emailId": "shahrukh@gmail.com",
        "password": "Shahrukh@123",
        "age": 58,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "The 'King of Bollywood', one of the most successful actors in the world.",
        "skills": ["Ruby on Rails", "PostgreSQL", "RSpec", "Heroku"]
    },
    {
        "firstName": "Salman",
        "lastName": "Khan",
        "emailId": "salman@gmail.com",
        "password": "Salman@123",
        "age": 58,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Prominent Bollywood actor and philanthropist, widely known for his action films.",
        "skills": ["PHP", "Laravel", "MySQL", "Apache"]
    },
    {
        "firstName": "Deepika",
        "lastName": "Padukone",
        "emailId": "deepika@gmail.com",
        "password": "Deepika@123",
        "age": 38,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Internationally acclaimed Indian actress and global icon.",
        "skills": ["Swift", "iOS Development", "Objective-C", "CoreData"]
    },
    {
        "firstName": "Priyanka",
        "lastName": "Chopra",
        "emailId": "priyanka@gmail.com",
        "password": "Priyanka@123",
        "age": 41,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Global actress, singer, and former Miss World.",
        "skills": ["Kotlin", "Android Development", "Jetpack Compose"]
    },
    {
        "firstName": "Amitabh",
        "lastName": "Bachchan",
        "emailId": "amitabh@gmail.com",
        "password": "Amitabh@123",
        "age": 81,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "The 'Shahenshah of Bollywood', a legendary actor spanning over five decades.",
        "skills": ["COBOL", "Mainframe", "Fortran", "Legacy Systems"]
    },
    {
        "firstName": "Alia",
        "lastName": "Bhatt",
        "emailId": "alia@gmail.com",
        "password": "Alia@123",
        "age": 31,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Highly versatile and critically acclaimed contemporary Bollywood actress.",
        "skills": ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"]
    },
    {
        "firstName": "Babar",
        "lastName": "Azam",
        "emailId": "babar@gmail.com",
        "password": "Babar@123",
        "age": 29,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Star Pakistani cricketer and one of the best contemporary batsmen in the world.",
        "skills": ["Python", "TensorFlow", "Machine Learning", "Pandas"]
    },
    {
        "firstName": "Shaheen",
        "lastName": "Afridi",
        "emailId": "shaheen@gmail.com",
        "password": "Shaheen@123",
        "age": 23,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Lethal left-arm fast bowler for the Pakistan national cricket team.",
        "skills": ["Rust", "WebAssembly", "Systems Programming"]
    },
    {
        "firstName": "Mohammad",
        "lastName": "Rizwan",
        "emailId": "mohammad@gmail.com",
        "password": "Mohammad@123",
        "age": 31,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Dependable wicket-keeper batsman for Pakistan across all formats.",
        "skills": ["C#", ".NET Core", "Azure", "SQL Server"]
    },
    {
        "firstName": "Mahira",
        "lastName": "Khan",
        "emailId": "mahira@gmail.com",
        "password": "Mahira@123",
        "age": 39,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "One of Pakistan's most popular and highest-paid actresses.",
        "skills": ["UI/UX Design", "Adobe XD", "Sketch", "Prototyping"]
    },
    {
        "firstName": "Fawad",
        "lastName": "Khan",
        "emailId": "fawad@gmail.com",
        "password": "Fawad@123",
        "age": 42,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Charismatic Pakistani actor and singer, highly popular across South Asia.",
        "skills": ["Scala", "Apache Spark", "Big Data", "Hadoop"]
    },
    {
        "firstName": "Atif",
        "lastName": "Aslam",
        "emailId": "atif@gmail.com",
        "password": "Atif@123",
        "age": 41,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Internationally acclaimed Pakistani playback singer and songwriter.",
        "skills": ["Audio Engineering", "Web Audio API", "C++", "DSP"]
    },
    {
        "firstName": "Ali",
        "lastName": "Zafar",
        "emailId": "ali@gmail.com",
        "password": "Ali@123",
        "age": 43,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Pakistani singer-songwriter, model, actor, and producer.",
        "skills": ["Unity", "C#", "Game Development", "3D Modeling"]
    },
    {
        "firstName": "Shoaib",
        "lastName": "Akhtar",
        "emailId": "shoaib@gmail.com",
        "password": "Shoaib@123",
        "age": 48,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "The 'Rawalpindi Express', known as the fastest bowler in cricket history.",
        "skills": ["Cybersecurity", "Penetration Testing", "Ethical Hacking", "Linux"]
    },
    {
        "firstName": "Imran",
        "lastName": "Khan",
        "emailId": "imran@gmail.com",
        "password": "Imran@123",
        "age": 71,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "World Cup winning captain of Pakistan and prominent political leader.",
        "skills": ["Agile", "Scrum Master", "Project Management", "Jira"]
    },
    {
        "firstName": "Sajal",
        "lastName": "Ali",
        "emailId": "sajal@gmail.com",
        "password": "Sajal@123",
        "age": 30,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Highly acclaimed Pakistani actress known for varied and challenging roles.",
        "skills": ["Data Analysis", "SQL", "Tableau", "PowerBI"]
    },
    {
        "firstName": "Ranbir",
        "lastName": "Kapoor",
        "emailId": "ranbir@gmail.com",
        "password": "Ranbir@123",
        "age": 41,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "One of the highest-paid and most awarded contemporary Bollywood actors.",
        "skills": ["Solidity", "Blockchain", "Web3.js", "Ethereum"]
    },
    {
        "firstName": "Ranveer",
        "lastName": "Singh",
        "emailId": "ranveer@gmail.com",
        "password": "Ranveer@123",
        "age": 38,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "High-energy Bollywood superstar known for his versatile roles and fashion.",
        "skills": ["Three.js", "WebGL", "Creative Coding", "Animations"]
    },
    {
        "firstName": "Anushka",
        "lastName": "Sharma",
        "emailId": "anushka@gmail.com",
        "password": "Anushka@123",
        "age": 35,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Successful Indian actress and producer.",
        "skills": ["DevOps", "CI/CD", "GitHub Actions", "Terraform"]
    },
    {
        "firstName": "Katrina",
        "lastName": "Kaif",
        "emailId": "katrina@gmail.com",
        "password": "Katrina@123",
        "age": 40,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "British-Indian actress, one of the most prominent stars in Bollywood.",
        "skills": ["React Native", "Mobile Development", "Redux", "Expo"]
    },
    {
        "firstName": "Hardik",
        "lastName": "Pandya",
        "emailId": "hardik@gmail.com",
        "password": "Hardik@123",
        "age": 30,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Explosive all-rounder for the Indian cricket team.",
        "skills": ["GraphQL", "Apollo Server", "Prisma", "Node.js"]
    },
    {
        "firstName": "Ravindra",
        "lastName": "Jadeja",
        "emailId": "ravindra@gmail.com",
        "password": "Ravindra@123",
        "age": 35,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Premier spin-bowling all-rounder and one of the best fielders in the world.",
        "skills": ["Elixir", "Phoenix", "Erlang", "Real-time Systems"]
    },
    {
        "firstName": "Saba",
        "lastName": "Qamar",
        "emailId": "saba@gmail.com",
        "password": "Saba@123",
        "age": 40,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Versatile Pakistani actress and television presenter.",
        "skills": ["Salesforce", "Apex", "CRM", "SOQL"]
    },
    {
        "firstName": "Naseem",
        "lastName": "Shah",
        "emailId": "naseem@gmail.com",
        "password": "Naseem@123",
        "age": 21,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Young and fiery fast bowler for the Pakistan national cricket team.",
        "skills": ["Dart", "Flutter", "Firebase", "Mobile UI"]
    },
    {
        "firstName": "Shubman",
        "lastName": "Gill",
        "emailId": "shubman@gmail.com",
        "password": "Shubman@123",
        "age": 24,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Elegant top-order batsman for the Indian national cricket team.",
        "skills": ["Rust", "WebAssembly", "C++", "Systems Architecture"]
    },
    {
        "firstName": "Harmanpreet",
        "lastName": "Kaur",
        "emailId": "harmanpreet@gmail.com",
        "password": "Harmanpreet@123",
        "age": 35,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Aggressive batter and the captain of the India Women's National Cricket Team.",
        "skills": ["Java", "Spring Boot", "Microservices", "Kafka"]
    },
    {
        "firstName": "Rishabh",
        "lastName": "Pant",
        "emailId": "rishabh@gmail.com",
        "password": "Rishabh@123",
        "age": 26,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Fearless wicket-keeper batsman known for his game-changing innings for India.",
        "skills": ["Python", "FastAPI", "Docker", "Redis"]
    },
    {
        "firstName": "Suryakumar",
        "lastName": "Yadav",
        "emailId": "suryakumar@gmail.com",
        "password": "Suryakumar@123",
        "age": 33,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Dynamic 360-degree batter and a T20 specialist for India.",
        "skills": ["React", "Next.js", "Tailwind CSS", "TypeScript"]
    },
    {
        "firstName": "Jemimah",
        "lastName": "Rodrigues",
        "emailId": "jemimah@gmail.com",
        "password": "Jemimah@123",
        "age": 23,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Talented middle-order batter for India with exceptional fielding skills.",
        "skills": ["UI/UX Design", "Figma", "Swift", "iOS Development"]
    },
    {
        "firstName": "Paras",
        "lastName": "Khadka",
        "emailId": "paras@gmail.com",
        "password": "Paras@123",
        "age": 36,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Legendary former captain of the Nepal national cricket team.",
        "skills": ["Project Management", "Agile", "Jira", "Scrum"]
    },
    {
        "firstName": "Aasif",
        "lastName": "Sheikh",
        "emailId": "aasif@gmail.com",
        "password": "Aasif@123",
        "age": 22,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Reliable wicket-keeper and opening batsman for Nepal.",
        "skills": ["Node.js", "Express", "MongoDB", "GraphQL"]
    },
    {
        "firstName": "Dipendra",
        "lastName": "Airee",
        "emailId": "dipendra@gmail.com",
        "password": "Dipendra@123",
        "age": 24,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Explosive all-rounder for Nepal, known for hitting fast centuries in T20Is.",
        "skills": ["Go", "Kubernetes", "AWS", "Terraform"]
    },
    {
        "firstName": "Kushal",
        "lastName": "Bhurtel",
        "emailId": "kushal@gmail.com",
        "password": "Kushal@123",
        "age": 27,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Aggressive opening batsman representing the Nepalese cricket team.",
        "skills": ["Data Science", "Pandas", "Machine Learning", "TensorFlow"]
    },
    {
        "firstName": "Sompal",
        "lastName": "Kami",
        "emailId": "sompal@gmail.com",
        "password": "Sompal@123",
        "age": 28,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Pace bowling all-rounder and a key player for the Nepal national team.",
        "skills": ["Cybersecurity", "Penetration Testing", "Linux", "Network Security"]
    },
    {
        "firstName": "Bill",
        "lastName": "Gates",
        "emailId": "bill@gmail.com",
        "password": "Bill@123",
        "age": 68,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Co-founder of Microsoft and prominent global philanthropist.",
        "skills": ["C", "C++", "System Architecture", "Assembly"]
    },
    {
        "firstName": "Tim",
        "lastName": "Cook",
        "emailId": "tim@gmail.com",
        "password": "Tim@123",
        "age": 63,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "CEO of Apple Inc., known for mastering global supply chains and operations.",
        "skills": ["Swift", "Objective-C", "iOS Development", "Supply Chain Analytics"]
    },
    {
        "firstName": "Satya",
        "lastName": "Nadella",
        "emailId": "satya@gmail.com",
        "password": "Satya@123",
        "age": 56,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "CEO of Microsoft, credited with transforming the company's cloud computing business.",
        "skills": ["C#", ".NET Core", "Azure", "Cloud Architecture"]
    },
    {
        "firstName": "Jeff",
        "lastName": "Bezos",
        "emailId": "jeff@gmail.com",
        "password": "Jeff@123",
        "age": 60,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Founder of Amazon and Blue Origin, pioneer of modern e-commerce and cloud infrastructure.",
        "skills": ["AWS", "Distributed Systems", "Java", "Logistics Algorithms"]
    },
    {
        "firstName": "Sam",
        "lastName": "Altman",
        "emailId": "sam@gmail.com",
        "password": "Sam@123",
        "age": 38,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "CEO of OpenAI, leading the development of advanced artificial intelligence models.",
        "skills": ["Python", "PyTorch", "Large Language Models", "Deep Learning"]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log(chalk.italic.cyan("Connected to MongoDB for seeding..."));

        await User.deleteMany({});
        console.log(chalk.italic.yellow("Existing users deleted..."));

        const userPromises = mockUsers.map(async (user) => {
            const passwordHash = await bcrypt.hash(user.password, 10);
            const newUser = new User({ ...user, password: passwordHash });
            await newUser.save();
            console.log(chalk.italic.green(`User ${user.firstName} ${user.lastName} added successfully...`));
        });

        await Promise.all(userPromises);

    } catch (error) {
        console.log(chalk.italic.red("Error seeding database: " + error));
    } finally {
        await mongoose.disconnect();
        console.log(chalk.italic.cyan("Disconnected from MongoDB after seeding..."));
        process.exit(0);
    }
};

seedDatabase();
