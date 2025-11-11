# 1. Base Image: Use a stable Python version (3.11 or 3.12 recommended)
FROM python:3.11-slim

# Set environment variables for non-buffered output
ENV PYTHONUNBUFFERED 1

# 2. Set the working directory
WORKDIR /app

# 3. Copy requirements.txt and install dependencies
# We install dependencies first to leverage Docker caching (faster rebuilds if code changes)
COPY requirements.txt ./
# We need gunicorn and uvicorn in the requirements for the production command
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy remaining application files
COPY . .

# 5. Set the network port (default for our command)
EXPOSE 8000

# 6. Run the application using Gunicorn with Uvicorn workers
# This is much more robust for production, handling multiple requests concurrently
# We assume the main application instance is named 'app' in 'src/main.py'
CMD ["gunicorn", "src.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]