import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(mongoUrl);

let usersCollection;
let tasksCollection;

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token!" });
    req.user = user;
    next();
  });
}

async function startServer() {
  try {
    const connection = await client.connect();
    const db = connection.db(dbName);

    usersCollection = db.collection("users");
    tasksCollection = db.collection("tasks");

    console.log("Connected to MongoDB");

    // ---------- USER SIGNUP ----------
    app.post("/sign-up", async (req, resp) => {
      try {
        const { name, email, address, phoneNo, password } = req.body;

        if (!name || !email || !address || !phoneNo || !password) {
          return resp
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return resp.status(409).json({
            success: false,
            message: "Email already registered! Kindly Login.",
          });
        }

        const hashedPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SALT_ROUNDS),
        );

        const result = await usersCollection.insertOne({
          name,
          email,
          address,
          phoneNo,
          password: hashedPassword,
          createdAt: new Date(),
        });

        const token = jwt.sign(
          { userId: result.insertedId, email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        resp.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });

        resp.status(200).json({
          success: true,
          message: "User registered successfully!",
          user: {
            _id: result.insertedId,
            name,
            email,
            phoneNo,
            address,
          },
        });
      } catch (err) {
        console.error("Signup error:", err);
        resp.status(500).json({ success: false, message: "Server error" });
      }
    });

    // ---------- USER LOGIN ----------
    app.post("/log-in", async (req, resp) => {
      try {
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });
        if (!user) {
          return resp
            .status(401)
            .json({ success: false, message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return resp
            .status(401)
            .json({ success: false, message: "Invalid credentials!" });
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        resp.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });

        resp.status(200).json({
          success: true,
          message: "Login successful!",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } catch (err) {
        console.error("Login error:", err);
        resp.status(500).json({ success: false, message: "Server error" });
      }
    });

    // ---------- TASK ROUTES ----------

    app.get("/", authenticateToken, async (req, resp) => {
      const fetchTasks = await tasksCollection
        .find({ userId: req.user.userId })
        .toArray();

      resp.json(fetchTasks);
    });

    app.post("/add-task", authenticateToken, async (req, res) => {
      try {
        const { title, description } = req.body;

        const result = await tasksCollection.insertOne({
          title,
          description,
          userId: req.user.userId,
        });

        res.status(201).json({
          success: true,
          message: "Task added successfully",
          task: {
            _id: result.insertedId,
            title,
            description,
          },
        });
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
    });

    app.get("/update-task/:id", authenticateToken, async (req, res) => {
      try {
        const task = await tasksCollection.findOne({
          _id: new ObjectId(req.params.id),
          userId: req.user.userId,
        });
        res.json(task);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.put("/update-task/:id", authenticateToken, async (req, res) => {
      try {
        const { title, description } = req.body;

        await tasksCollection.updateOne(
          { _id: new ObjectId(req.params.id), userId: req.user.userId },
          { $set: { title, description } },
        );

        const updatedTask = await tasksCollection.findOne({
          _id: new ObjectId(req.params.id),
          userId: req.user.userId,
        });

        res.status(200).json(updatedTask);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete("/delete-task/:id", authenticateToken, async (req, resp) => {
      const { id } = req.params;
      const deletedTask = await tasksCollection.deleteOne({
        _id: new ObjectId(id),
        userId: req.user.userId,
      });

      if (deletedTask.deletedCount === 1) {
        resp.status(200).json({
          success: true,
          message: "Task deleted successfully!",
          id: id,
        });
      } else {
        resp
          .status(500)
          .json({ success: false, message: "Error deleting task!" });
      }
    });

    // ---------- START SERVER ----------
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}

startServer();
