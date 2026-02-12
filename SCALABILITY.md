# Scalability Implementation Note

This document outlines the strategies to scale the Crypto Price Alert System from a monolithic MVP to a high-traffic, distributed system capable of handling millions of users and alerts.

## 1. Microservices Architecture

Currently, the application runs as a Monolith. To scale, we would decompose it into:

-   **Auth Service**: Handles User registration, login, and JWT issuance.
-   **Alert Service**: CRUD operations for user alerts.
-   **Price Fetcher Service**: A dedicated background worker that only fetches crypto prices from external APIs (CoinGecko/Binance) and pushes updates to a message queue.
-   **Notification Service**: Consumes price updates and checks against active alerts to send emails/SMS/Push notifications.

## 2. Caching Strategy (Redis)

-   **Price Caching**: Real-time crypto prices should be cached in Redis with a short TTL (e.g., 5-10 seconds) to prevent hammering external APIs.
-   **User Sessions**: While JWT is stateless, we can use Redis to manage a "Blocklist" for instant token revocation (logout).
-   **Frequent Queries**: Cache the "Top 10 active alerts" or "Trending coins" to reduce DB load.

## 3. Database Scaling

-   **Indexing**: Ensure `userId` and `symbol` fields are indexed in MongoDB for O(1) lookup speeds.
-   **Sharding**: Shard the `Alerts` collection based on `userId` or `symbol`. This distributes the data across multiple servers.
-   **Read Replicas**: Use MongoDB Replica Sets to separate Read operations (Dashboard views) from Write operations (Creating alerts).

## 4. Load Balancing & Infrastructure

-   **Nginx / AWS ALB**: Place a Load Balancer in front of the backend instances to distribute incoming traffic evenly.
-   **Horizontal Scaling**: Run multiple instances of the Backend API using Docker & Kubernetes (K8s) to handle concurrent connections.
-   **Message Queues (RabbitMQ / Kafka)**: Use queues to decouple the "Price Fetcher" from the "Notification Sender". This ensures that a spike in prices doesn't crash the server, as notifications are processed asynchronously.

## 5. Rate Limiting
Implement `express-rate-limit` to prevent abuse of the API (e.g., creating 1000 alerts in a second).
