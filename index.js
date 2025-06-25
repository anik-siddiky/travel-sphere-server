const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors({
    origin: ['http://localhost:5000'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
    next();
}

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded
        next();
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@codesbynik.lieljty.mongodb.net/?retryWrites=true&w=majority&appName=codesbynik`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const jobsCollection = client.db('careerCode').collection('jobs');
        const applicationsCollection = client.db('careerCode').collection('applications');

        // jwt token related api
        app.post('/jwt', async (req, res) => {
            const userInfo = req.body;

            const token = jwt.sign(userInfo, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: false
            })
            res.send({ success: true })

        })


        // Jobs API
        app.get('/jobs', async (req, res) => {
            const email = req.query.email;
            const query = {};
            if (email) {
                query.hr_email = email;
            }

            const cursor = jobsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });



        // app.get('/jobsByEmailAddress', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { hr_email: email };
        //     const result = await jobsCollection.find(query).toArray();
        //     res.send(result);
        // })

        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollection.findOne(query);
            res.send(result);
        });

        app.post('/jobs', async (req, res) => {
            const newJob = req.body;
            console.log(newJob);
            const result = await jobsCollection.insertOne(newJob);
            res.send(result);
        })


        // Job applications related APIs

        app.get('/applications', verifyToken, async (req, res) => {
            const email = req.query.email;


            const query = { applicant: email };
            const result = await applicationsCollection.find(query).toArray();

            // Bad way to aggregate data
            for (const application of result) {
                const jobId = application.jobId;
                const jobQuery = { _id: new ObjectId(jobId) }
                const job = await jobsCollection.findOne(jobQuery);
                application.company = job.company
                application.title = job.title
                application.company_logo = job.company_logo
            }

            res.send(result);
        });

        app.get('/applications/job/:job_id', async (req, res) => {
            const job_id = req.params.jobId;
            const query = { jobId: job_id };
            const result = await applicationsCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/applications', async (req, res) => {
            const application = req.body;
            const result = await applicationsCollection.insertOne(application);
            res.send(result);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Career Code Testing Bro');
});

app.listen(port, () => {
    console.log(`Career code server is running on port ${port}`);
});