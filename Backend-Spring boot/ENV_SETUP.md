# Environment Variables Setup

## Overview
All sensitive configuration data has been moved to environment variables for security.

## Setup Instructions

### 1. Create `.env` file
Copy the `.env.example` file and rename it to `.env`:
```bash
cp .env.example .env
```

### 2. Fill in your actual values
Edit the `.env` file and replace all placeholder values with your actual credentials:

```env
# Database
DB_PASSWORD=your_actual_database_password

# Email
MAIL_USERNAME=your_actual_email@gmail.com
MAIL_PASSWORD=your_actual_app_password

# Stripe
STRIPE_API_KEY=sk_test_your_actual_stripe_key

# CoinGecko
COINGECKO_API_KEY=your_actual_coingecko_key

# Gemini
GEMINI_API_KEY=your_actual_gemini_key

# etc...
```

### 3. Load Environment Variables

#### Option A: Using IDE (IntelliJ IDEA / Eclipse)
1. Install the "EnvFile" plugin (IntelliJ) or use Run Configurations
2. In Run Configuration, add the `.env` file path
3. The variables will be loaded automatically

#### Option B: Using Command Line
**Windows (PowerShell):**
```powershell
# Load .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

# Run the application
./mvnw spring-boot:run
```

**Linux/Mac:**
```bash
# Load .env and run
export $(cat .env | xargs) && ./mvnw spring-boot:run
```

#### Option C: Using Docker
```dockerfile
# In docker-compose.yml
services:
  backend:
    env_file:
      - .env
```

### 4. Add dependency (Optional - for automatic .env loading)

Add this to your `pom.xml`:
```xml
<dependency>
    <groupId>me.paulschwarz</groupId>
    <artifactId>spring-dotenv</artifactId>
    <version>4.0.0</version>
</dependency>
```

This will automatically load `.env` file on application startup.

## Security Notes

⚠️ **IMPORTANT:**
- **NEVER** commit the `.env` file to git
- The `.env` file is already in `.gitignore`
- Only commit `.env.example` with placeholder values
- Share actual credentials securely (not via git)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SERVER_PORT` | Server port (default: 5454) | No |
| `DB_URL` | Database connection URL | Yes |
| `DB_USERNAME` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `MAIL_USERNAME` | Email account for sending emails | Yes |
| `MAIL_PASSWORD` | Email app-specific password | Yes |
| `STRIPE_API_KEY` | Stripe payment gateway key | Yes |
| `RAZORPAY_API_KEY` | Razorpay API key | No |
| `RAZORPAY_API_SECRET` | Razorpay API secret | No |
| `COINGECKO_API_KEY` | CoinGecko API key | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |

## Troubleshooting

### Variables not loading
1. Ensure `.env` file is in the project root
2. Check file permissions
3. Verify no syntax errors in `.env` file
4. Restart your IDE/terminal

### Application fails to start
1. Check all required variables are set
2. Verify database credentials are correct
3. Check logs for specific error messages
