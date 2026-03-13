import mongoose from "mongoose";
import bcrypt from "bcrypt";
import chalk from "chalk";
import User from "./src/models/user";
import connectDB from "./src/config/database";
import "dotenv/config";

const mockUsers = [
    {
        "firstName": "Sachin",
        "lastName": "Tendulkar",
        "emailId": "sachin@gmail.com",
        "password": "Sachin@123",
        "age": 28,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["JavaScript", "React", "Node.js"]
    },
    {
        "firstName": "Virat",
        "lastName": "Kohli",
        "emailId": "virat@gmail.com",
        "password": "Virat@123",
        "age": 34,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Passionate frontend developer and UI/UX enthusiast.",
        "skills": ["HTML", "CSS", "Figma", "Vue"]
    },
    {
        "firstName": "Mark",
        "lastName": "Zuckerberg",
        "emailId": "mark@gmail.com",
        "password": "Mark@123",
        "age": 24,
        "gender": "others",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Python", "Django", "PostgreSQL"]
    },
    {
        "firstName": "Balen",
        "lastName": "Shah",
        "emailId": "balen@gmail.com",
        "password": "Balen@123",
        "age": 42,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Senior backend engineer with a love for distributed systems.",
        "skills": ["Go", "Docker", "Kubernetes", "AWS"]
    },
    {
        "firstName": "Saroj",
        "lastName": "Sah",
        "emailId": "saroj@gmail.com",
        "password": "Saroj@123",
        "age": 19,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Java", "Algorithms", "Spring Boot", "Node.js", "AWS", "React", "MongoDB"]
    },
    {
        "firstName": "Omkant",
        "lastName": "Rajbanshi",
        "emailId": "omkant@gmail.com",
        "password": "Omkant@123",
        "age": 38,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Project Management", "Agile", "Scrum"]
    },
    {
        "firstName": "Roshan",
        "lastName": "Shah",
        "emailId": "roshan@gmail.com",
        "password": "Roshan@123",
        "age": 26,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["PHP", "Laravel", "MySQL"]
    },
    {
        "firstName": "Sandeep",
        "lastName": "Chaudhary",
        "emailId": "sandeep@gmail.com",
        "password": "Sandeep@123",
        "age": 22,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "Machine learning researcher focusing on NLP.",
        "skills": ["Python", "TensorFlow", "PyTorch", "NLP"]
    },
    {
        "firstName": "Anjali",
        "lastName": "Sharma",
        "emailId": "anjali@gmail.com",
        "password": "Anjali@123",
        "age": 30,
        "gender": "female",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "skills": ["Ruby", "Rails", "PostgreSQL"]
    },
    {
        "firstName": "Rohit",
        "lastName": "Sharma",
        "emailId": "rohit@gmail.com",
        "password": "Rohit@123",
        "age": 29,
        "gender": "male",
        "profileAvatarUrl": "https://www.geographyandyou.com/images/user-profile.png",
        "about": "DevOps engineer with a passion for automation.",
        "skills": ["Ansible", "Terraform", "AWS", "Jenkins"]
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
