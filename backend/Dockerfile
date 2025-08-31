# Set the base image
FROM python:3.13-slim

# Set the working directory
WORKDIR /src

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy remaining files to the working directory
COPY . .

# Set the network port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
