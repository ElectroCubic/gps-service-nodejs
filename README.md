# GPS Location Microservice (Node.js + Kubernetes)

This project implements a **GPS location microservice** using **Node.js and Express**, containerized with **Docker**, deployed on **Kubernetes (Minikube)**, monitored with **Prometheus**, and integrated with **GitHub Actions for CI/CD**.

The goal of this project is to demonstrate a simple **microservice architecture and DevOps workflow** including containerization, orchestration, monitoring, and automated pipelines.

---

## GPS Service Overview

The GPS service is a lightweight **Node.js microservice** that retrieves approximate geographic location information using an external **IP geolocation API**.

The service runs inside a **Docker container** and is deployed to a **Kubernetes cluster using Minikube**. The application is exposed through a Kubernetes **NodePort service**, allowing clients to access it from the browser.

### Key Features

* Fetches location data from an external geolocation API
* Containerized using Docker
* Deployed and managed using Kubernetes (Minikube)
* Monitored using Prometheus metrics
* Continuous Integration pipeline using GitHub Actions

---

## Project Structure

```
gps-service-nodejs
│
├── server.js
│   Main Node.js application that implements the GPS service
│
├── package.json
│   Defines project dependencies and Node.js configuration
│
├── Dockerfile
│   Docker configuration used to build the container image
│
├── deployment.yaml
│   Kubernetes deployment configuration for running the service pod
│
├── service.yaml
│   Kubernetes service configuration to expose the application
│
├── public/
│   Contains client-side files
│   ├── index.html
│   └── script.js
│
└── .github/
    └── workflows/
        └── ci.yml
        GitHub Actions workflow for the CI pipeline
```

---

## WebSocket Interface

Instead of exposing a traditional REST endpoint, the service uses **WebSockets (Socket.IO)** to push location updates to connected clients in real time.

When a client connects to the server, it automatically begins receiving periodic location updates without needing to make repeated HTTP requests.

### WebSocket Event

```
locationUpdate
```

This event is emitted by the server every **5 seconds** after fetching updated location information from the external geolocation API.

### Example Data Sent to Clients

```json
{
  "city": "Kozhikode",
  "region": "Kerala",
  "country": "India",
  "latitude": 11.2588,
  "longitude": 75.7804,
  "time": "14:22:05"
}
```

Clients subscribe to the `locationUpdate` event through a WebSocket connection and dynamically update the interface whenever new data is received.

---

## Project Architecture:

Client (Socket.IO) <br>
      ↓ <br>
Node.js WebSocket Server <br>
      ↓ <br>
IP Geolocation API <br>
      ↓ <br>
Real-time location updates <br>

---

## CI/CD Pipeline Setup

This project demonstrates a basic DevOps CI/CD pipeline using the following tools:

* **Docker** – Containerization of the Node.js microservice
* **Kubernetes (Minikube)** – Local container orchestration
* **Prometheus** – Monitoring container and pod performance metrics
* **GitHub Actions** – Continuous Integration pipeline

---

## Running the Project

### Start Minikube

```
minikube start
```

### Deploy the Application

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Access the Service

```
minikube service gps-service
```

---

## Monitoring

Prometheus is used to monitor container performance metrics such as **CPU usage**, **memory consumption**, and **pod status** within the Kubernetes cluster.

---

## CI/CD Pipeline

A GitHub Actions workflow (`ci.yml`) automatically runs whenever code is pushed to the repository. The pipeline performs the following steps:

1. Checks out the repository
2. Sets up the Node.js environment
3. Installs project dependencies
4. Runs a basic server test
5. Builds the Docker image

This ensures that every code change is automatically validated and ready for deployment.
