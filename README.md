# Express MongoDB Authentication API

A secure Node.js/Express backend with MongoDB integration, JWT authentication, Winston logging, and rate limiting.

## Project Structure

```
.
├── config/
│   ├── db.js              # MongoDB connection
│   └── logger.js          # Winston logger configuration
├── controllers/
│   └── auth.controller.js # Authentication logic
├── models/
│   └── user.model.js      # User schema
├── middleware/
│   ├── error.middleware.js    # Error handling
│   ├── logger.middleware.js   # Request logging
│   └── ratelimit.middleware.js # Rate limiting
├── routes/
│   └── auth.routes.js     # Auth routes
├── logs/                  # Log files (git ignored)
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── index.js              # Application entry point
├── package.json          # Project dependencies
└── README.md             # This file
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Edit `.env` file with your settings:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=3000
   LOG_LEVEL=info
   JWT_SECRET=your_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_EXPIRES_IN=5m
   ```

3. **Update MongoDB URI:**
   Replace `your_mongodb_uri` with your actual MongoDB connection string.
   
   Example for MongoDB Atlas:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

## Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
node index.js
```

## Available Endpoints

- **Health Check:** `GET /health`
- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`

## Features

✅ **Express.js** - Fast and minimal web framework
✅ **MongoDB** - NoSQL database with Mongoose ODM
✅ **JWT Authentication** - Secure token-based authentication
✅ **Argon2** - Password hashing
✅ **Winston Logger** - Comprehensive logging system
✅ **Rate Limiting** - DDoS protection
✅ **CORS** - Cross-origin request handling
✅ **Error Handling** - Centralized error middleware
✅ **Request Logging** - Automatic request/response logging

## Logging

The application uses Winston for logging:
- **Console Output:** All logs appear in the console
- **Error Log:** `logs/error.log` - Only errors and warnings
- **Combined Log:** `logs/combined.log` - All logs

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **argon2** - Password hashing
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **winston** - Logger
- **rate-limiter-flexible** - Rate limiting
- **http-errors** - HTTP error utilities
- **http-status-codes** - HTTP status codes
- **nodemon** - Dev auto-reload

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | Required |
| `PORT` | Server port | 3000 |
| `LOG_LEVEL` | Winston log level | info |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_REFRESH_SECRET` | JWT refresh secret | Required |
| `JWT_EXPIRES_IN` | JWT token expiration | 5m |

## Rate Limiting

The application implements rate limiting for all routes:
- **Limit:** 10 requests per 60 seconds
- **HTTP Status:** 429 (Too Many Requests)

## Error Handling

All errors are caught and logged through the centralized error middleware:
- Errors ≥ 500: Logged as errors
- Errors ≥ 400: Logged as warnings
- All errors sent as JSON response

## Getting Started

1. Clone/download this project
2. Run `npm install`
3. Configure `.env` with your MongoDB URI
4. Run `npm run dev`
5. Check `http://localhost:3000/health`

## Development

### Adding New Routes

1. Create a controller in `controllers/`
2. Create routes in `routes/`
3. Import and use in `index.js`:
   ```javascript
   import newRoutes from "./routes/new.routes.js";
   app.use("/api/new", newRoutes);
   ```

### Adding New Models

Create schema files in `models/` following the user.model.js pattern.

## Troubleshooting

**MongoDB connection fails:**
- Verify `MONGO_URI` in `.env`
- Check MongoDB service is running
- Verify IP whitelist if using MongoDB Atlas

**Logs not appearing:**
- Check `LOG_LEVEL` in `.env`
- Ensure `logs/` directory is writable
- Check file permissions

**Port already in use:**
- Change `PORT` in `.env`
- Or kill the process using the port

## License

ISC

## Author

Created with Node.js, Express, and MongoDB
